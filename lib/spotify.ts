import { unstable_cache } from "next/cache";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const TOP_ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists";
const TOP_ARTISTS_REVALIDATE_SECONDS = 60 * 60;

export type SpotifyTimeRange = "short_term" | "medium_term" | "long_term";

export type SpotifyTopArtist = {
  name: string;
  url: string;
  imageUrl: string | null;
  genres: string[];
  popularity: number;
};

type SpotifyTokenResponse = {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
};

type SpotifyArtistResponse = {
  items?: Array<{
    name: string;
    external_urls?: {
      spotify?: string;
    };
    images?: Array<{
      url: string;
      height: number | null;
      width: number | null;
    }>;
    genres?: string[];
    popularity?: number;
  }>;
  error?: {
    status: number;
    message: string;
  };
};

type SpotifyResult =
  | { ok: true; artists: SpotifyTopArtist[] }
  | { ok: false; reason: "missing_env"; missing: string[] }
  | { ok: false; reason: "token_error"; status?: number; message?: string }
  | { ok: false; reason: "http_error"; status: number; message?: string }
  | { ok: false; reason: "api_error"; message: string };

function getSpotifyEnv() {
  const env = {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
  };

  const required: Array<[string, string | undefined]> = [
    ["SPOTIFY_CLIENT_ID", env.clientId],
    ["SPOTIFY_CLIENT_SECRET", env.clientSecret],
    ["SPOTIFY_REFRESH_TOKEN", env.refreshToken],
  ];

  const missing = required.filter(([, value]) => !value).map(([key]) => key);

  return { ...env, missing };
}

async function getAccessToken(options: {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}) {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: options.refreshToken,
  });

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${options.clientId}:${options.clientSecret}`,
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });

  const json = (await response.json()) as SpotifyTokenResponse;

  if (!response.ok || !json.access_token) {
    return {
      ok: false as const,
      status: response.status,
      message: json.error_description ?? json.error,
    };
  }

  return { ok: true as const, accessToken: json.access_token };
}

function pickArtistImage(artist: NonNullable<SpotifyArtistResponse["items"]>[number]) {
  return artist.images?.[0]?.url ?? null;
}

function normalizeArtists(payload: SpotifyArtistResponse, limit: number) {
  const artists = payload.items ?? [];

  return artists.slice(0, limit).map((artist) => ({
    name: artist.name,
    url: artist.external_urls?.spotify ?? "https://open.spotify.com",
    imageUrl: pickArtistImage(artist),
    genres: artist.genres ?? [],
    popularity: artist.popularity ?? 0,
  }));
}

async function getTopArtistsFromSpotify(
  timeRange: SpotifyTimeRange,
  limit: number,
): Promise<SpotifyResult> {
  const env = getSpotifyEnv();

  if (env.missing.length > 0) {
    return { ok: false, reason: "missing_env", missing: env.missing };
  }

  const { clientId, clientSecret, refreshToken } = env;
  if (!clientId || !clientSecret || !refreshToken) {
    return { ok: false, reason: "missing_env", missing: env.missing };
  }

  const token = await getAccessToken({
    clientId,
    clientSecret,
    refreshToken,
  });

  if (!token.ok) {
    return {
      ok: false,
      reason: "token_error",
      status: token.status,
      message: token.message,
    };
  }

  const url = new URL(TOP_ARTISTS_ENDPOINT);
  url.searchParams.set("time_range", timeRange);
  url.searchParams.set("limit", String(limit));

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
    cache: "no-store",
  });

  const json = (await response.json()) as SpotifyArtistResponse;

  if (!response.ok) {
    return {
      ok: false,
      reason: "http_error",
      status: response.status,
      message: json.error?.message,
    };
  }

  if (json.error) {
    return { ok: false, reason: "api_error", message: json.error.message };
  }

  return { ok: true, artists: normalizeArtists(json, limit) };
}

const getCachedTopArtists = unstable_cache(
  getTopArtistsFromSpotify,
  ["spotify-top-artists"],
  { revalidate: TOP_ARTISTS_REVALIDATE_SECONDS },
);

export async function getTopArtists(options: {
  timeRange: SpotifyTimeRange;
  limit: number;
}) {
  return getCachedTopArtists(options.timeRange, options.limit);
}
