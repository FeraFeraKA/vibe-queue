export type TCode = string;

export type TNickname = string;

export interface IRoom {
  code: TCode;
  users: IUser[];
  nowPlaying: ITrack | null;
  queue: ITrack[];
}

export interface IActionsRoom {
  code: TCode;
  nickname: TNickname;
}

export interface IAddTrack {
  code: TCode;
  track: ISearchTrack;
}

export type TProvider = 'spotify' | 'mock';

export interface ISearchTrack {
  provider: TProvider;
  providerTrackId: string;
  title: string;
  artistText: string;
  albumName: string;
  coverUrl: string;
  durationMs: number;
  providerUrl: string;
  explicit: boolean;
}

export interface ITrack extends ISearchTrack {
  queueId: string;
  votes: number;
  likedBy: IUser[];
}

export interface IUser {
  id: string;
  nickname: TNickname;
}
