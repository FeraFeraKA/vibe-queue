"use client";

import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "./skeleton";

interface ITrackCoverProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

const TrackCover = ({
  src,
  alt,
  size = 200,
  className = "",
}: ITrackCoverProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={`relative overflow-hidden shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {isLoading && (
        <Skeleton className={`absolute inset-0 h-full w-full ${className}`} />
      )}

      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default TrackCover;
