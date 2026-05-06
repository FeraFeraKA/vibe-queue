import type { ISearchTrack } from '@vibe-queue/shared';

export const mockSearchTracks = [
  {
    provider: 'spotify',
    providerTrackId: 'track-abracadabra',
    title: 'Abracadabra',
    artistText: 'Lady Gaga',
    albumName: 'Mayhem',
    coverUrl:
      'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
    durationMs: 223000,
    providerUrl: 'https://open.spotify.com/track/track-abracadabra',
    explicit: false,
  },
] satisfies ISearchTrack[];

export const mockUsers = [
  'Fera',
  'Tenderly__',
  'Setr1ox',
  'Mydei',
  'Boothill',
  'Itto',
];
