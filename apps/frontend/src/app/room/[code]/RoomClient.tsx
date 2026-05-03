"use client";

import Background from "@/components/layout/Background";
import Header from "@/components/layout/Header";
import Room from "@/components/layout/Room";
import SearchModal from "@/components/layout/SearchModal";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

interface IRoomClientProps {
  code: string;
}

const RoomClient = ({ code }: IRoomClientProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isCopied, setIsCopied] = useState(false);
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  return (
    <>
      <Background />
      <Header />
      <Room
        code={code}
        isOpen={isOpen}
        isCopied={isCopied}
        handleOpen={handleModal}
        handleCopyLink={handleCopyLink}
      />
      <SearchModal isOpen={isOpen} handleOpen={handleModal} />
    </>
  );
};

export default RoomClient;
