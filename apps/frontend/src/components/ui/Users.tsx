"use client";

import type { IUser } from "@vibe-queue/shared";
import { ScrollArea } from "./scroll-area";

interface IUsersProps {
  users: IUser[];
}

const Users = ({ users }: IUsersProps) => {
  return (
    <ScrollArea className="w-full mt-4">
      <div className="flex flex-col items-center max-h-226 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="relative flex p-3 rounded-xl bg-[#e2e2e2] dark:bg-[#111111] w-full"
          >
            <p>{user.nickname}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default Users;
