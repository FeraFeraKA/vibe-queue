import type { IUser, TCode } from "@vibe-queue/shared";

const getRoomUserKey = (code: TCode) => `vibe-queue:room:${code}:user`;

export function saveCurrentRoomUser(code: TCode, user: IUser) {
  sessionStorage.setItem(getRoomUserKey(code), JSON.stringify(user));
}

export function getCurrentRoomUser(code: TCode): IUser | null {
  const value = sessionStorage.getItem(getRoomUserKey(code));

  if (!value) {
    return null;
  }

  return JSON.parse(value) as IUser;
}
