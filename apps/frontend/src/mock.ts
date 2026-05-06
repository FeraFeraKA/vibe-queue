import type { ISearchTrack, ITrack, IUser } from "@vibe-queue/shared";

export const mockSearchTracks = [
  {
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
  },
] satisfies ISearchTrack[];

export const mockQueueTracks = [
  {
    ...mockSearchTracks[0],
    queueId: "queue-abracadabra",
    votes: 0,
    likedBy: [],
  },
] satisfies ITrack[];

export const mockUsers = [
  { id: "user-fera", nickname: "Fera" },
  { id: "user-tenderly", nickname: "Tenderly__" },
  { id: "user-setr1ox", nickname: "Setr1ox" },
  { id: "user-mydei", nickname: "Mydei" },
  { id: "user-boothill", nickname: "Boothill" },
  { id: "user-itto", nickname: "Itto" },
] satisfies IUser[];
