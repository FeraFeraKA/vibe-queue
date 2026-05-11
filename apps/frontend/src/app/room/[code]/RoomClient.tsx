"use client";

import Room from "@/components/layout/Room";
import SearchModal from "@/components/layout/SearchModal";
import { fetcher } from "@/shared/api/fetcher";
import { getCurrentRoomUser } from "@/shared/helpers/saveSession";
import { socket } from "@/shared/socket/socket";
import type {
  ICodeProps,
  IRoom,
  ISearchTrack,
  IUser,
} from "@vibe-queue/shared";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const RoomClient = ({ code }: ICodeProps) => {
  const [room, setRoom] = useState<IRoom | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isCopied, setIsCopied] = useState(false);
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [searchTracks, setSearchTracks] = useState<ISearchTrack[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [isRoomLoading, setIsRoomLoading] = useState(true);
  const router = useRouter();

  const sortedTracks = useMemo(() => {
    return [...(room?.queue ?? [])].sort((a, b) => b.votes - a.votes);
  }, [room?.queue]);

  const nowPlaying = useMemo(() => {
    return room?.nowPlaying;
  }, [room?.nowPlaying]);

  useEffect(() => {
    const currentUser = getCurrentRoomUser(code);

    if (!currentUser) {
      router.replace(`/room/${code}/join`);
      return;
    }

    //eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentUser(currentUser);

    socket.connect();

    socket.on("room:updated", (updatedRoom) => {
      setRoom(updatedRoom);
      setIsRoomLoading(false);
    });

    socket.emit("room:watch", { code, userId: currentUser.id });

    return () => {
      socket.off("room:updated");
      socket.off("room:join");
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        setIsSearching(false);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        console.error(error);
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

  const handleAddTrack = async (track: ISearchTrack) => {
    socket.emit("track:add", {
      code,
      track,
    });
  };

  const handleDeleteTrack = async (queueId: string) => {
    socket.emit("track:delete", {
      code,
      queueId,
    });
  };

  const handleLikeTrack = async (queueId: string) => {
    if (!currentUser) return;

    socket.emit("track:vote", {
      code,
      queueId,
      nickname: currentUser.nickname,
    });
  };

  const handleSetPlaying = async (queueId: string) => {
    socket.emit("track:set-playing", {
      code,
      queueId,
    });
  };

  const handleSearchTracks = async (query: string) => {
    setIsSearching(true);
    setSearchQuery(query);
  };

  return currentUser ? (
    <>
      <Room
        code={code}
        tracks={sortedTracks}
        nowPlaying={nowPlaying}
        users={room?.users ?? []}
        currentUser={currentUser}
        isCopied={isCopied}
        isRoomLoading={isRoomLoading}
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
        isSearching={isSearching}
        handleSearchTracks={handleSearchTracks}
      />
    </>
  ) : null;
};

export default RoomClient;
