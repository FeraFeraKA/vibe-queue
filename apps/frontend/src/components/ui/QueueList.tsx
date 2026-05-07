"use client";

import type { ITrack } from "@vibe-queue/shared";
import { Heart, Trash } from "lucide-react";
import { LayoutGroup, motion } from "motion/react";
import Image from "next/image";
import { Button } from "./button";
import { ScrollArea } from "./scroll-area";

interface IQueueListProps {
  tracks: ITrack[];
  handleDeleteTrack: (queueId: string) => void;
  handleLikeTrack: (queueId: string) => void;
}

const QueueList = ({
  tracks,
  handleDeleteTrack,
  handleLikeTrack,
}: IQueueListProps) => {
  return (
    <ScrollArea className="w-full mt-4">
      <LayoutGroup>
        <div className="flex flex-col items-start max-h-150 gap-4">
          {tracks.map((item) => (
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
              <Image src={item.coverUrl} alt="Cover" width={80} height={80} />
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
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={() => handleLikeTrack(item.queueId)}
                  >
                    <Heart
                      className={
                        item.likedBy.length > 0
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
