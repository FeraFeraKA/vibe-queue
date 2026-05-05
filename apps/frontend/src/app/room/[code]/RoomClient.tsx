"use client";

import Room from "@/components/layout/Room";
import SearchModal from "@/components/layout/SearchModal";
import { IMockTracks, mockSearchTracks, mockUsers } from "@/mock";
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
  const [tracks, setTracks] = useState<IMockTracks[]>(mockSearchTracks);
  const [users, setUsers] = useState<string[]>(mockUsers);

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

  const handleLikeTrack = (spotifyId: string) => {
    setTracks((prevTracks) =>
      prevTracks.map((track) =>
        track.spotifyId === spotifyId
          ? {
              ...track,
              liked: !track.liked,
              votes: track.liked ? track.votes - 1 : track.votes + 1,
            }
          : track,
      ),
    );
  };

  const handleAddTrack = (track: IMockTracks) => {
    setTracks((prevTracks) => [...prevTracks, track]);
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
        tracks={tracks}
        handleAddTrack={handleAddTrack}
      />
    </>
  );
};

export default RoomClient;
