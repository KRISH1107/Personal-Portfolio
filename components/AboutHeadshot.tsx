"use client";

import Image from "next/image";
import { useState } from "react";

type AboutHeadshotProps = {
  remoteSrc: string;
  fallbackSrc: string;
  alt: string;
};

export default function AboutHeadshot({
  remoteSrc,
  fallbackSrc,
  alt,
}: AboutHeadshotProps) {
  const [activeSrc, setActiveSrc] = useState(remoteSrc);
  const [didFallback, setDidFallback] = useState(false);

  return (
    <div className="relative h-40 w-40 overflow-hidden rounded-full border border-zinc-200 dark:border-zinc-800 sm:h-44 sm:w-44">
      <Image
        src={activeSrc}
        alt={alt}
        fill
        sizes="(max-width: 640px) 160px, 176px"
        priority
        unoptimized
        className="object-cover [object-position:center_18%]"
        onError={() => {
          if (!didFallback) {
            setDidFallback(true);
            setActiveSrc(fallbackSrc);
          }
        }}
      />
    </div>
  );
}
