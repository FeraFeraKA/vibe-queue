export interface IMockTracks {
  spotifyId: string;
  title: string;
  artistText: string;
  albumName: string;
  coverUrl: string;
  durationMs: number;
  spotifyUrl: string;
  explicit: boolean;
  votes: number;
  liked: boolean;
}

export const mockSearchTracks = [
  {
    spotifyId: "track-abracadabra",
    title: "Abracadabra",
    artistText: "Lady Gaga",
    albumName: "Mayhem",
    coverUrl:
      "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
    durationMs: 223000,
    spotifyUrl: "https://open.spotify.com/track/track-abracadabra",
    explicit: false,
    votes: 86,
    liked: false,
  },
  {
    spotifyId: "track-blinding-lights",
    title: "Blinding Lights",
    artistText: "The Weeknd",
    albumName: "After Hours",
    coverUrl:
      "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
    durationMs: 200040,
    spotifyUrl: "https://open.spotify.com/track/track-blinding-lights",
    explicit: false,
    votes: 86,
    liked: false,
  },
  {
    spotifyId: "track-houdini",
    title: "Houdini",
    artistText: "Dua Lipa",
    albumName: "Radical Optimism",
    coverUrl:
      "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
    durationMs: 185000,
    spotifyUrl: "https://open.spotify.com/track/track-houdini",
    explicit: false,
    votes: 84,
    liked: false,
  },
];

export const mockUsers = [
  "Fera",
  "Tenderly__",
  "Setr1ox",
  "Mydei",
  "Boothill",
  "Itto",
];
