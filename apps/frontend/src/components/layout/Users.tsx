"use client";

import type { IUser } from "@vibe-queue/shared";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

interface IUsersProps {
  users: IUser[];
  isRoomLoading: boolean;
}

const Users = ({ users, isRoomLoading }: IUsersProps) => {
  return (
    <ScrollArea className="w-full mt-4">
      <div className="flex flex-col items-center max-h-226 gap-4">
        {isRoomLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center p-3 rounded-xl bg-[#e2e2e2] dark:bg-[#111111] w-full h-12"
              >
                <Skeleton className="h-3.5 w-full max-w-30 rounded-lg" />
              </div>
            ))
          : users.map((user) => (
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
