export type TCode = string;

export type TNickname = string;

export type TId = string;

export interface IRoom {
  code: TCode;
  users: IUser[];
  nowPlaying: ITrack | null;
  queue: ITrack[];
}

export interface IWatchRoomPayload {
  code: TCode;
  userId: TId;
}

export interface ICreateRoomPayload {
  code: TCode;
  nickname: TNickname;
}

export interface IJoinRoomPayload {
  code: TCode;
  nickname: TNickname;
}

export interface ILeaveRoomPayload {
  code: TCode;
  userId: TId;
}

export interface IAddTrackPayload {
  code: TCode;
  track: ISearchTrack;
}

export interface IDeleteTrackPayload {
  code: TCode;
  queueId: TId;
}

export interface IVoteTrackPayload {
  code: TCode;
  queueId: TId;
  nickname: TNickname;
}

export interface ISetPlayingPayload {
  code: TCode;
  queueId: TId;
}

export type TProvider = "spotify" | "mock";

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

export interface ISearchTracksPayload {
  query: string;
  provider: TProvider;
}

export interface IParamsProps {
  params: Promise<{
    code: string;
  }>;
}

export interface ICodeProps {
  code: TCode;
}
