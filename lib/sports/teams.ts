import type { LeagueId, SportsTeam } from "@/lib/sports/types";

export const NFL_TEAMS: SportsTeam[] = [
  { id: "ari", name: "Arizona Cardinals", abbr: "ARI", conference: "NFC", division: "West" },
  { id: "atl", name: "Atlanta Falcons", abbr: "ATL", conference: "NFC", division: "South" },
  { id: "bal", name: "Baltimore Ravens", abbr: "BAL", conference: "AFC", division: "North" },
  { id: "buf", name: "Buffalo Bills", abbr: "BUF", conference: "AFC", division: "East" },
  { id: "car", name: "Carolina Panthers", abbr: "CAR", conference: "NFC", division: "South" },
  { id: "chi", name: "Chicago Bears", abbr: "CHI", conference: "NFC", division: "North" },
  { id: "cin", name: "Cincinnati Bengals", abbr: "CIN", conference: "AFC", division: "North" },
  { id: "cle", name: "Cleveland Browns", abbr: "CLE", conference: "AFC", division: "North" },
  { id: "dal", name: "Dallas Cowboys", abbr: "DAL", conference: "NFC", division: "East" },
  { id: "den", name: "Denver Broncos", abbr: "DEN", conference: "AFC", division: "West" },
  { id: "det", name: "Detroit Lions", abbr: "DET", conference: "NFC", division: "North" },
  { id: "gb", name: "Green Bay Packers", abbr: "GB", conference: "NFC", division: "North" },
  { id: "hou", name: "Houston Texans", abbr: "HOU", conference: "AFC", division: "South" },
  { id: "ind", name: "Indianapolis Colts", abbr: "IND", conference: "AFC", division: "South" },
  { id: "jax", name: "Jacksonville Jaguars", abbr: "JAX", conference: "AFC", division: "South" },
  { id: "kc", name: "Kansas City Chiefs", abbr: "KC", conference: "AFC", division: "West" },
  { id: "lac", name: "Los Angeles Chargers", abbr: "LAC", conference: "AFC", division: "West" },
  { id: "lar", name: "Los Angeles Rams", abbr: "LAR", conference: "NFC", division: "West" },
  { id: "lv", name: "Las Vegas Raiders", abbr: "LV", conference: "AFC", division: "West" },
  { id: "mia", name: "Miami Dolphins", abbr: "MIA", conference: "AFC", division: "East" },
  { id: "min", name: "Minnesota Vikings", abbr: "MIN", conference: "NFC", division: "North" },
  { id: "ne", name: "New England Patriots", abbr: "NE", conference: "AFC", division: "East" },
  { id: "no", name: "New Orleans Saints", abbr: "NO", conference: "NFC", division: "South" },
  { id: "nyg", name: "New York Giants", abbr: "NYG", conference: "NFC", division: "East" },
  { id: "nyj", name: "New York Jets", abbr: "NYJ", conference: "AFC", division: "East" },
  { id: "phi", name: "Philadelphia Eagles", abbr: "PHI", conference: "NFC", division: "East" },
  { id: "pit", name: "Pittsburgh Steelers", abbr: "PIT", conference: "AFC", division: "North" },
  { id: "sea", name: "Seattle Seahawks", abbr: "SEA", conference: "NFC", division: "West" },
  { id: "sf", name: "San Francisco 49ers", abbr: "SF", conference: "NFC", division: "West" },
  { id: "tb", name: "Tampa Bay Buccaneers", abbr: "TB", conference: "NFC", division: "South" },
  { id: "ten", name: "Tennessee Titans", abbr: "TEN", conference: "AFC", division: "South" },
  { id: "wsh", name: "Washington Commanders", abbr: "WSH", conference: "NFC", division: "East" },
];

export const NBA_TEAMS: SportsTeam[] = [
  { id: "atl", name: "Atlanta Hawks", abbr: "ATL", conference: "East" },
  { id: "bos", name: "Boston Celtics", abbr: "BOS", conference: "East" },
  { id: "bkn", name: "Brooklyn Nets", abbr: "BKN", conference: "East" },
  { id: "cha", name: "Charlotte Hornets", abbr: "CHA", conference: "East" },
  { id: "chi", name: "Chicago Bulls", abbr: "CHI", conference: "East" },
  { id: "cle", name: "Cleveland Cavaliers", abbr: "CLE", conference: "East" },
  { id: "dal", name: "Dallas Mavericks", abbr: "DAL", conference: "West" },
  { id: "den", name: "Denver Nuggets", abbr: "DEN", conference: "West" },
  { id: "det", name: "Detroit Pistons", abbr: "DET", conference: "East" },
  { id: "gs", name: "Golden State Warriors", abbr: "GS", conference: "West" },
  { id: "hou", name: "Houston Rockets", abbr: "HOU", conference: "West" },
  { id: "ind", name: "Indiana Pacers", abbr: "IND", conference: "East" },
  { id: "lac", name: "LA Clippers", abbr: "LAC", conference: "West" },
  { id: "lal", name: "Los Angeles Lakers", abbr: "LAL", conference: "West" },
  { id: "mem", name: "Memphis Grizzlies", abbr: "MEM", conference: "West" },
  { id: "mia", name: "Miami Heat", abbr: "MIA", conference: "East" },
  { id: "mil", name: "Milwaukee Bucks", abbr: "MIL", conference: "East" },
  { id: "min", name: "Minnesota Timberwolves", abbr: "MIN", conference: "West" },
  { id: "no", name: "New Orleans Pelicans", abbr: "NO", conference: "West" },
  { id: "ny", name: "New York Knicks", abbr: "NY", conference: "East" },
  { id: "okc", name: "Oklahoma City Thunder", abbr: "OKC", conference: "West" },
  { id: "orl", name: "Orlando Magic", abbr: "ORL", conference: "East" },
  { id: "phi", name: "Philadelphia 76ers", abbr: "PHI", conference: "East" },
  { id: "phx", name: "Phoenix Suns", abbr: "PHX", conference: "West" },
  { id: "por", name: "Portland Trail Blazers", abbr: "POR", conference: "West" },
  { id: "sac", name: "Sacramento Kings", abbr: "SAC", conference: "West" },
  { id: "sa", name: "San Antonio Spurs", abbr: "SA", conference: "West" },
  { id: "tor", name: "Toronto Raptors", abbr: "TOR", conference: "East" },
  { id: "utah", name: "Utah Jazz", abbr: "UTAH", conference: "West" },
  { id: "wsh", name: "Washington Wizards", abbr: "WSH", conference: "East" },
];

export function getLeagueTeams(league: LeagueId): SportsTeam[] {
  return league === "nfl" ? NFL_TEAMS : NBA_TEAMS;
}

export function getTeamMap(league: LeagueId): Map<string, SportsTeam> {
  return new Map(getLeagueTeams(league).map((team) => [team.id, team]));
}

export function getTeamLogoUrl(league: LeagueId, abbr: string): string {
  const path = league === "nfl" ? "nfl" : "nba";
  return `https://a.espncdn.com/i/teamlogos/${path}/500/${abbr.toLowerCase()}.png`;
}
