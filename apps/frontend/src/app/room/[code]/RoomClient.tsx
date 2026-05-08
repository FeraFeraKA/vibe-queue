"use client";

import Room from "@/components/layout/Room";
import SearchModal from "@/components/layout/SearchModal";
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
  const [searchTracks, setSearchTracks] = useState<ISearchTrack[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  const sortedTracks = useMemo(() => {
    return [...(room?.queue ?? [])].sort((a, b) => b.votes - a.votes);
  }, [room?.queue]);

  const nowPlaying = useMemo(() => {
    return room?.nowPlaying;
  }, [room?.nowPlaying]);

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

  useEffect(() => {
    const query = searchQuery.trim();

    if (query === "") {
      //eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchTracks([]);
      setIsSearching(false);
      return;
    }

    const abortController = new AbortController();

    const timeoutId = setTimeout(async () => {
      try {
        const tracks = await fetcher<ISearchTrack[]>({
          url: `/music/spotify/search/${query}`,
          method: "GET",
          signal: abortController.signal,
        });

        setSearchTracks(tracks);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        console.error(error);
      } finally {
        setIsSearching(false);
      }
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      abortController.abort();
    };
  }, [searchQuery]);

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
    setSearchQuery("");
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

  const handleDeleteTrack = async (queueId: string) => {
    try {
      const room = await fetcher<IRoom>({
        url: `/room/${code}/tracks/${queueId}/delete`,
        method: "DELETE",
      });

      setRoom(room);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetPlaying = async (queueId: string) => {
    try {
      const room = await fetcher<IRoom>({
        url: `/room/${code}/tracks/${queueId}/set-playing`,
        method: "PATCH",
      });

      setRoom(room);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchTracks = async (query: string) => {
    setIsSearching(true);
    setSearchQuery(query);
  };

  return (
    <>
      <Room
        code={code}
        tracks={sortedTracks}
        nowPlaying={nowPlaying}
        users={room?.users ?? []}
        isCopied={isCopied}
        handleOpen={handleModal}
        handleCopyLink={handleCopyLink}
        handleDeleteTrack={handleDeleteTrack}
        handleLikeTrack={handleLikeTrack}
        handleSetPlaying={handleSetPlaying}
      />
      <SearchModal
        isOpen={isOpen}
        handleOpen={handleModal}
        tracks={searchTracks}
        handleAddTrack={handleAddTrack}
        handleSearchTracks={handleSearchTracks}
      />
    </>
  );
};

export default RoomClient;
