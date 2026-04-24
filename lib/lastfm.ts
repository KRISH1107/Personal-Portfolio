export type LastfmImage = {
  size: string;
  "#text": string;
};

export type LastfmArtist = {
  name: string;
  playcount: string;
  url: string;
  mbid?: string;
  image?: LastfmImage[];
};

type LastfmTopArtistsResponse = {
  topartists?: {
    artist: LastfmArtist[] | LastfmArtist;
  };
  error?: number;
  message?: string;
};

function getApiKey() {
  return process.env.LASTFM_API_KEY;
}

function getUsername() {
  return process.env.LASTFM_USERNAME;
}

function pickImageUrl(artist: LastfmArtist) {
  const images = artist.image ?? [];
  const bySize = new Map(images.map((img) => [img.size, img["#text"]]));

  const preferredOrder = ["extralarge", "large", "medium", "small"];
  for (const size of preferredOrder) {
    const url = bySize.get(size);
    if (url) return url;
  }

  // Sometimes Last.fm returns a single untyped image
  for (const img of images) {
    if (img["#text"]) return img["#text"];
  }

  return null;
}

function normalizeArtists(payload: LastfmTopArtistsResponse, limit: number) {
  const raw = payload.topartists?.artist;
  const list = Array.isArray(raw) ? raw : raw ? [raw] : [];
  return list.slice(0, limit).map((a) => ({
    name: a.name,
    playcount: a.playcount,
    url: a.url,
    imageUrl: pickImageUrl(a),
  }));
}

export async function getTopArtists(options: { period: "12month" | "overall"; limit: number }) {
  const key = getApiKey();
  const user = getUsername();

  if (!key || !user) {
    return { ok: false as const, reason: "missing_env" as const };
  }

  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.searchParams.set("method", "user.getTopArtists");
  url.searchParams.set("user", user);
  url.searchParams.set("api_key", key);
  url.searchParams.set("format", "json");
  url.searchParams.set("period", options.period);
  url.searchParams.set("limit", String(options.limit));

  const res = await fetch(url.toString(), {
    next: { revalidate: 60 * 60 },
  });

  if (!res.ok) {
    return { ok: false as const, reason: "http_error" as const, status: res.status };
  }

  const json = (await res.json()) as LastfmTopArtistsResponse;
  if (json.error) {
    return { ok: false as const, reason: "api_error" as const, message: json.message };
  }

  return { ok: true as const, artists: normalizeArtists(json, options.limit) };
}
