"use client";

import { fetcher } from "@/shared/api/fetcher";
import { saveCurrentRoomUser } from "@/shared/helpers/saveSession";
import { IRoom, IUser } from "@vibe-queue/shared";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const CreateCard = () => {
  const [code, setCode] = useState("");
  const [nickname, setNickname] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      const { room, user } = await fetcher<{ room: IRoom; user: IUser }>({
        url: `/room`,
        method: "POST",
        body: {
          code,
          nickname,
        },
      });

      saveCurrentRoomUser(room.code, user);

      router.push(`/room/${room.code}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-10 px-4 relative z-10">
      <Card>
        <CardHeader>
          <CardTitle>Create a room</CardTitle>
          <CardDescription>
            Invite your friends to join your queue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-6"
            id="create-room-form"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-3">
              <Label htmlFor="room-code">Room Code</Label>
              <Input
                id="room-code"
                type="text"
                placeholder="#47D9"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="nickname">Nickname</Label>
              <Input
                id="nickname"
                type="text"
                placeholder="Enter your nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            form="create-room-form"
            className="w-full text-white dark:bg-blue-700"
          >
            Create Room
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateCard;
