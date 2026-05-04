"use client";

import { IMockTracks } from "@/mock";
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
  tracks: IMockTracks[];
  handleOpen: (flag: boolean) => void;
  handleAddTrack: (track: IMockTracks) => void;
}

const SearchModal = ({
  isOpen,
  handleOpen,
  tracks,
  handleAddTrack,
}: ISearchModalProps) => {
  return (
    <>
      <CommandDialog
        open={isOpen}
        onOpenChange={handleOpen}
        className="max-w-248! w-[calc(100vw-32px)] top-35"
      >
        <Command>
          <CommandInput placeholder="Type to search tracks..." />
          <CommandList className="max-h-[calc(100vh-320px)]">
            <CommandEmpty>No results found.</CommandEmpty>
            {tracks.map((track) => (
              <CommandGroup key={track.spotifyId} heading={track.title}>
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
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
};

export default SearchModal;
