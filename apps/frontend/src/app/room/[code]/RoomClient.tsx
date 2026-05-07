"use client";

import Room from "@/components/layout/Room";
import SearchModal from "@/components/layout/SearchModal";
import { mockSearchTracks } from "@/mock";
import { fetcher } from "@/shared/api/fetcher";
import { getCurrentRoomUser } from "@/shared/helpers/saveSession";
import type { IRoom, ISearchTrack, IUser } from "@vibe-queue/shared";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

interface IRoomClientProps {
  code: string;
}

const RoomClient = ({ code }: IRoomClientProps) => {
  const [room, setRoom] = useState<IRoom | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isCopied, setIsCopied] = useState(false);
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [searchTracks, setSearchTracks] =
    useState<ISearchTrack[]>(mockSearchTracks);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const room = await fetcher<IRoom>({
          url: `/room/${code}`,
          method: "GET",
        });

        setRoom(room);
        setCurrentUser(getCurrentRoomUser(room.code));
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoom();
  }, [code]);

  const sortedTracks = useMemo(() => {
    return [...(room?.queue ?? [])].sort((a, b) => b.votes - a.votes);
  }, [room?.queue]);

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

  const handleLikeTrack = async (queueId: string) => {
    if (!currentUser) return;

    try {
      const room = await fetcher<IRoom>({
        url: `/room/${code}/tracks/${queueId}/vote`,
        method: "PATCH",
        body: { nickname: currentUser.nickname },
      });

      setRoom(room);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTrack = async (track: ISearchTrack) => {
    try {
      const room = await fetcher<IRoom>({
        url: `/room/${code}/tracks`,
        method: "PATCH",
        body: { track },
      });

      setRoom(room);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Room
        code={code}
        tracks={sortedTracks}
        users={room?.users ?? []}
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
