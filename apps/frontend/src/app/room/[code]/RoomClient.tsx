"use client";

import Room from "@/components/layout/Room";
import SearchModal from "@/components/layout/SearchModal";
import { mockQueueTracks, mockSearchTracks, mockUsers } from "@/mock";
import { fetcher } from "@/shared/api/fetcher";
import type { IRoom, ISearchTrack, ITrack, IUser } from "@vibe-queue/shared";
import { usePathname } from "next/navigation";
import { useMemo, useRef, useState } from "react";

interface IRoomClientProps {
  code: string;
}

const RoomClient = ({ code }: IRoomClientProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isCopied, setIsCopied] = useState(false);
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [tracks, setTracks] = useState<ITrack[]>(mockQueueTracks);
  const [searchTracks] = useState<ISearchTrack[]>(mockSearchTracks);
  const [users] = useState<IUser[]>(mockUsers);

  const sortedTracks = useMemo(() => {
    return [...tracks].sort((a, b) => b.votes - a.votes);
  }, [tracks]);

  const handleCopyLink = async () => {
    const url = `${window.location.origin}${pathname}`;

    await navigator.clipboard.writeText(url);

    setIsCopied(true);

    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
    }

    copyTimeoutRef.current = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleModal = (flag: boolean) => {
    setIsOpen(flag);
  };

  const handleLikeTrack = (queueId: string) => {
    setTracks((prevTracks) =>
      prevTracks.map((track) =>
        track.queueId === queueId
          ? {
              ...track,
              votes:
                track.likedBy.length > 0 ? track.votes - 1 : track.votes + 1,
              likedBy:
                track.likedBy.length > 0
                  ? []
                  : [{ id: "user-fera", nickname: "Fera" }],
            }
          : track,
      ),
    );
  };

  const handleAddTrack = async (track: ISearchTrack) => {
    try {
      const room = await fetcher<IRoom>({
        url: `/room/${code}/tracks`,
        method: "PATCH",
        body: { track },
      });

      setTracks(room.queue);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Room
        code={code}
        tracks={sortedTracks}
        users={users}
        isCopied={isCopied}
        handleOpen={handleModal}
        handleCopyLink={handleCopyLink}
        handleLikeTrack={handleLikeTrack}
      />
      <SearchModal
        isOpen={isOpen}
        handleOpen={handleModal}
        tracks={searchTracks}
        handleAddTrack={handleAddTrack}
      />
    </>
  );
};

export default RoomClient;
