"use client";

import type { ISearchTrack } from "@vibe-queue/shared";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Skeleton } from "../ui/skeleton";
import TrackCover from "../ui/TrackCover";

interface ISearchModalProps {
  isOpen: boolean;
  tracks: ISearchTrack[] | null;
  handleOpen: (flag: boolean) => void;
  handleAddTrack: (track: ISearchTrack) => void;
  isSearching: boolean;
  handleSearchTracks: (query: string) => Promise<void>;
}

const SearchModal = ({
  isOpen,
  handleOpen,
  tracks,
  handleAddTrack,
  isSearching,
  handleSearchTracks,
}: ISearchModalProps) => {
  return (
    <>
      <CommandDialog
        open={isOpen}
        onOpenChange={handleOpen}
        className="max-w-248! 2xl:max-w-312! w-[calc(100vw-32px)] top-35"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Type to search tracks..."
            onValueChange={handleSearchTracks}
          />
          <CommandList className="max-h-[calc(100vh-320px)]">
            <CommandEmpty>No results found.</CommandEmpty>
            {isSearching ? (
              <>
                {Array.from({ length: 10 }).map((_, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <CommandGroup className="">
                      <Skeleton className="w-30 h-4 my-2 mx-3" />
                      <CommandItem className="p-0 m-0">
                        <Skeleton className="w-full h-14 rounded-3xl" />
                      </CommandItem>
                    </CommandGroup>
                  </div>
                ))}
              </>
            ) : tracks ? (
              tracks.map((track) => (
                <CommandGroup key={track.providerTrackId} heading={track.title}>
                  <CommandItem className="flex justify-between">
                    <div className="flex items-center gap-4">
                      <TrackCover
                        key={track.coverUrl}
                        src={track.coverUrl}
                        alt={track.title}
                        size={40}
                        className="rounded-xl"
                      />
                      {track.title + " - " + track.artistText}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => handleAddTrack(track)}
                    >
                      <Plus /> Add
                    </Button>
                  </CommandItem>
                </CommandGroup>
              ))
            ) : null}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
};

export default SearchModal;
