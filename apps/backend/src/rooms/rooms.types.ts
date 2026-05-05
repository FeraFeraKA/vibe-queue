export type TCode = string;

export type TNickname = string;

export interface IRoom {
  code: TCode;
  users: string[];
  nowPlaying: string | null;
  queue: string[];
}

export interface IActionsRoom {
  code: TCode;
  nickname: TNickname;
}
