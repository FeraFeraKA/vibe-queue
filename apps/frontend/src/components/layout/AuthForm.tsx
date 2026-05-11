"use client";

import { fetcher } from "@/shared/api/fetcher";
import { saveCurrentRoomUser } from "@/shared/helpers/saveSession";
import { IRoom, IUser, TCode } from "@vibe-queue/shared";
import { useRouter } from "next/dist/client/components/navigation";
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
import { Spinner } from "../ui/spinner";

interface IFormProps {
  code?: TCode;
  joining?: boolean;
  redirectedToJoin?: boolean;
  cardTitle: string;
  cardDescription: string;
  cardAction: string;
  cardButton: string;
}

const AuthForm = ({
  code,
  joining,
  redirectedToJoin,
  cardTitle,
  cardDescription,
  cardAction,
  cardButton,
}: IFormProps) => {
  const [enteredCode, setEnteredCode] = useState("");
  const [enteredNickname, setEnteredNickname] = useState("");
  const [isOperating, setIsOperating] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsOperating(true);

    try {
      let room: IRoom, user: IUser;

      if (joining || redirectedToJoin) {
        ({ room, user } = await fetcher<{ room: IRoom; user: IUser }>({
          url: `/room/${redirectedToJoin ? code : enteredCode}/join`,
          method: "PATCH",
          body: {
            code: redirectedToJoin ? code : enteredCode,
            nickname: enteredNickname,
          },
        }));
      } else {
        ({ room, user } = await fetcher<{ room: IRoom; user: IUser }>({
          url: `/room`,
          method: "POST",
          body: {
            code: enteredCode,
            nickname: enteredNickname,
          },
        }));
      }

      saveCurrentRoomUser(room.code, user);

      router.push(`/room/${room.code}`);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
      setIsOperating(false);
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-10 px-4 relative z-10">
      <Card>
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-6"
            id="create-room-form"
            onSubmit={handleSubmit}
          >
            {redirectedToJoin ? null : (
              <div className="flex flex-col gap-3">
                <Label htmlFor="room-code">Room Code</Label>
                <Input
                  id="room-code"
                  type="text"
                  placeholder="#47D9"
                  value={enteredCode}
                  onChange={(e) => setEnteredCode(e.target.value)}
                />
              </div>
            )}
            <div className="flex flex-col gap-3">
              <Label htmlFor="nickname">Nickname</Label>
              <Input
                id="nickname"
                type="text"
                placeholder="Enter your nickname"
                value={enteredNickname}
                onChange={(e) => setEnteredNickname(e.target.value)}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button
            type="submit"
            form="create-room-form"
            className="w-full text-white dark:bg-blue-700"
            disabled={isOperating || !(enteredCode || code) || !enteredNickname}
          >
            {isOperating ? (
              <>
                <Spinner /> {cardAction}
              </>
            ) : (
              cardButton
            )}
          </Button>
          {error && <p className="text-red-500 mt-6 text-center">{error}</p>}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthForm;
