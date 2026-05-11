"use client";

import type { ITrack, IUser } from "@vibe-queue/shared";
import { Check, Copy, Search } from "lucide-react";
import { Button } from "../ui/button";
import QueueList from "../ui/QueueList";
import { Skeleton } from "../ui/skeleton";
import TrackCover from "../ui/TrackCover";
import Users from "../ui/Users";

interface IRoomProps {
  code: string;
  tracks: ITrack[];
  nowPlaying?: ITrack | null;
  users: IUser[];
  currentUser: IUser | null;
  isCopied: boolean;
  isRoomLoading: boolean;
  handleOpen: (flag: boolean) => void;
  handleCopyLink: () => Promise<void>;
  handleDeleteTrack: (queueId: string) => void;
  handleLikeTrack: (queueId: string) => void;
  handleSetPlaying: (queueId: string) => void;
}

const Room = ({
  code,
  tracks,
  nowPlaying,
  users,
  currentUser,
  isCopied,
  isRoomLoading,
  handleOpen,
  handleCopyLink,
  handleDeleteTrack,
  handleLikeTrack,
  handleSetPlaying,
}: IRoomProps) => {
  return (
    <>
      <div className="flex flex-col w-full max-w-5xl 3xl:max-w-7xl min-h-[calc(100vh-80px)] mx-auto z-10 relative px-4">
        <main className="mt-4 flex flex-1 flex-col">
          <section className="flex justify-between items-center">
            <div className="flex flex-col gap-4">
              <h3 className="uppercase tracking-[0.3em] text-muted-foreground">
                Room
              </h3>
              <p className="text-3xl font-bold">Vibe Queue #{code}</p>
            </div>
            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                onClick={handleCopyLink}
                className="shadow-2xl"
              >
                {isCopied ? (
                  <>
                    <Check />
                    Link Copied!
                  </>
                ) : (
                  <>
                    <Copy />
                    Copy Link
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={() => handleOpen(true)}
                className="shadow-2xl"
              >
                <Search />
                Search Tracks
              </Button>
            </div>
          </section>
          <section className="grid grid-cols-1 gap-6 lg:flex-1 lg:grid-cols-10 my-4">
            <div className="min-h-80 lg:col-span-7 lg:h-full border rounded-3xl bg-[#d5d5d5] dark:bg-[#171717] p-6 shadow-xl">
              <p className="text-muted-foreground">Now Playing</p>
              <div className="flex flex-col md:flex-row items-center justify-center mt-4 p-4 border min-h-60 rounded-3xl border-dashed">
                {isRoomLoading ? (
                  <>
                    <Skeleton className="h-50 w-50 rounded-3xl" />
                    <div className="flex flex-col items-center mx-auto w-full max-w-75">
                      <Skeleton className="h-6 rounded-lg mt-4 md:mt-0 w-full max-w-50" />
                      <Skeleton className="h-4 rounded-lg mt-4 w-full" />
                    </div>
                  </>
                ) : nowPlaying ? (
                  <>
                    <TrackCover
                      key={nowPlaying.coverUrl}
                      src={nowPlaying.coverUrl}
                      alt={nowPlaying.title}
                      size={200}
                      className="rounded-3xl"
                    />
                    <div className="mx-auto text-center max-w-75 ">
                      <p className="text-3xl font-bold mt-4 md:mt-0">
                        {nowPlaying.title}
                      </p>
                      <p className="text-lg text-muted-foreground mt-1">
                        {nowPlaying.artistText}
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="text-3xl font-bold text-center mt-4 md:mt-0">
                    No track is playing
                  </p>
                )}
              </div>
              <p className="text-muted-foreground mt-6">Queue</p>
              <QueueList
                tracks={tracks}
                currentUser={currentUser}
                isRoomLoading={isRoomLoading}
                handleDeleteTrack={handleDeleteTrack}
                handleLikeTrack={handleLikeTrack}
                handleSetPlaying={handleSetPlaying}
              />
            </div>
            <div className="min-h-80 lg:col-span-3 lg:h-full border rounded-3xl bg-[#d5d5d5] dark:bg-[#171717] p-6 shadow-xl">
              <p className="text-muted-foreground">Online Users</p>
              <Users users={users} isRoomLoading={isRoomLoading} />
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Room;
