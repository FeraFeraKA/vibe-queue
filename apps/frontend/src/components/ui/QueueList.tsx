"use client";

import type { ITrack, IUser } from "@vibe-queue/shared";
import { Heart, Play, Trash } from "lucide-react";
import { LayoutGroup, motion } from "motion/react";
import { Button } from "./button";
import { ScrollArea } from "./scroll-area";
import { Skeleton } from "./skeleton";
import TrackCover from "./TrackCover";

interface IQueueListProps {
  tracks: ITrack[];
  currentUser: IUser | null;
  isRoomLoading: boolean;
  handleDeleteTrack: (queueId: string) => void;
  handleLikeTrack: (queueId: string) => void;
  handleSetPlaying: (queueId: string) => void;
}

const QueueList = ({
  tracks,
  currentUser,
  isRoomLoading,
  handleDeleteTrack,
  handleLikeTrack,
  handleSetPlaying,
}: IQueueListProps) => {
  return (
    <ScrollArea className="w-full mt-4">
      <LayoutGroup>
        <div className="flex flex-col items-start max-h-150 gap-4">
          {isRoomLoading
            ? Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center rounded-3xl p-3 w-full bg-[#e2e2e2] dark:bg-[#111111] gap-4"
                >
                  <Skeleton className="h-20 w-20 rounded-xl shrink-0" />
                  <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
                    <div className="flex flex-col w-full gap-0.5">
                      <Skeleton className="h-4.5 w-full max-w-30 rounded-lg" />
                      <Skeleton className="h-3.5 w-full max-w-75 rounded-lg mt-2" />
                      <Skeleton className="h-3.5 w-full max-w-60 rounded-lg mt-2" />
                    </div>
                    <div className="flex flex-col min-[400px]:flex-row items-center gap-4">
                      <Skeleton className="h-9 w-14.25 rounded-full" />
                      <Skeleton className="h-9 w-22.5 rounded-full" />
                      <Skeleton className="h-9 w-30.5 rounded-full" />
                    </div>
                  </div>
                </div>
              ))
            : tracks.map((item) => (
                <motion.div
                  key={item.queueId}
                  layout
                  transition={{
                    layout: {
                      type: "spring",
                      stiffness: 420,
                      damping: 32,
                    },
                  }}
                  className="relative flex flex-col md:flex-row items-center p-3 rounded-xl bg-[#e2e2e2] dark:bg-[#111111] w-full gap-4"
                >
                  <TrackCover
                    src={item.coverUrl}
                    alt={item.title}
                    size={80}
                    className="rounded-xl"
                  />
                  <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left w-full gap-4">
                    <div className="flex flex-col">
                      <p className="text-xl">{item.title}</p>
                      <p className="text-muted-foreground">
                        {item.artistText +
                          " · " +
                          item.albumName +
                          " · " +
                          new Date(item.durationMs).toISOString().slice(14, 19)}
                      </p>
                      <p className="text-muted-foreground">Added by Fera</p>
                    </div>
                    <div className="flex flex-col min-[400px]:flex-row items-center gap-4">
                      <Button
                        variant="outline"
                        className="rounded-full"
                        onClick={() => handleLikeTrack(item.queueId)}
                      >
                        <Heart
                          className={
                            item.likedBy.find(
                              (user) => user.id === currentUser?.id,
                            )
                              ? "fill-red-500 text-red-500"
                              : ""
                          }
                        />
                        {item.votes}
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-full"
                        onClick={() => handleDeleteTrack(item.queueId)}
                      >
                        <Trash /> Delete
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-full"
                        onClick={() => handleSetPlaying(item.queueId)}
                      >
                        <Play /> Set Playing
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>
      </LayoutGroup>
    </ScrollArea>
  );
};

export default QueueList;
