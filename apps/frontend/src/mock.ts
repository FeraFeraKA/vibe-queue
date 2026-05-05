export interface IMockTracks {
  spotifyId: string;
  provider: "spotify" | "mock";
  providerTrackId: string;
  title: string;
  artistText: string;
  albumName: string;
  coverUrl: string;
  durationMs: number;
  providerUrl: string;
  explicit: boolean;
  votes: number;
  liked: boolean;
}

export const mockSearchTracks = [
  {
    spotifyId: "track-abracadabra",
    provider: "spotify",
    providerTrackId: "track-abracadabra",
    title: "Abracadabra",
    artistText: "Lady Gaga",
    albumName: "Mayhem",
    coverUrl:
      "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
    durationMs: 223000,
    providerUrl: "https://open.spotify.com/track/track-abracadabra",
    explicit: false,
    votes: 0,
    liked: false,
  },
] satisfies IMockTracks[];

export const mockUsers = [
  "Fera",
  "Tenderly__",
  "Setr1ox",
  "Mydei",
  "Boothill",
  "Itto",
];
