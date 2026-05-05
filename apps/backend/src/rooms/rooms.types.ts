export type TCode = string;

export type TNickname = string;

export type TId = string;

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

export interface IVoteTrack {
  code: TCode;
  queueId: TId;
  nickname: TNickname;
}

export type TProvider = 'spotify' | 'mock';

export interface ISearchTrack {
  provider: TProvider;
  providerTrackId: TId;
  title: string;
  artistText: string;
  albumName: string;
  coverUrl: string;
  durationMs: number;
  providerUrl: string;
  explicit: boolean;
}

export interface ITrack extends ISearchTrack {
  queueId: TId;
  votes: number;
  likedBy: IUser[];
}

export interface IUser {
  id: TId;
  nickname: TNickname;
}
