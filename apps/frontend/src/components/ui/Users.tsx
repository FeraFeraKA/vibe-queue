"use client";

import { ScrollArea } from "./scroll-area";

interface IUsersProps {
  users: string[];
}

const Users = ({ users }: IUsersProps) => {
  return (
    <ScrollArea className="w-full mt-4">
      <div className="flex flex-col items-center max-h-226 gap-4">
        {users.map((user, index) => (
          <div
            key={index}
            className="relative flex p-3 rounded-xl bg-[#e2e2e2] dark:bg-[#111111] w-full"
          >
            <p>{user}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default Users;
