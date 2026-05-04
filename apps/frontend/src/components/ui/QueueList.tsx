"use client";

import { IMockTracks } from "@/mock";
import { Heart } from "lucide-react";
import { LayoutGroup, motion } from "motion/react";
import Image from "next/image";
import { Button } from "./button";
import { ScrollArea } from "./scroll-area";

interface IQueueListProps {
  tracks: IMockTracks[];
  handleLikeTrack: (spotifyId: string) => void;
}

const QueueList = ({ tracks, handleLikeTrack }: IQueueListProps) => {
  return (
    <ScrollArea className="w-full mt-4">
      <LayoutGroup>
        <div className="flex flex-col items-start max-h-150 gap-4">
          {tracks.map((item) => (
            <motion.div
              key={item.spotifyId}
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
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => handleLikeTrack(item.spotifyId)}
                >
                  <Heart
                    className={item.liked ? "fill-red-500 text-red-500" : ""}
                  />
                  {item.votes}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </LayoutGroup>
    </ScrollArea>
  );
};

export default QueueList;
