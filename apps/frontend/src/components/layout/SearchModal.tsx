"use client";

import type { ISearchTrack } from "@vibe-queue/shared";
import { Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";

interface ISearchModalProps {
  isOpen: boolean;
  tracks: ISearchTrack[] | null;
  handleOpen: (flag: boolean) => void;
  handleAddTrack: (track: ISearchTrack) => void;
  handleSearchTracks: (query: string) => Promise<void>;
}

const SearchModal = ({
  isOpen,
  handleOpen,
  tracks,
  handleAddTrack,
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
            {tracks
              ? tracks.map((track) => (
                  <CommandGroup
                    key={track.providerTrackId}
                    heading={track.title}
                  >
                    <CommandItem className="flex justify-between">
                      <div className="flex items-center gap-4">
                        <Image
                          src={track.coverUrl}
                          alt={track.title}
                          width={40}
                          height={40}
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
                    <CommandSeparator />
                  </CommandGroup>
                ))
              : null}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
};

export default SearchModal;
