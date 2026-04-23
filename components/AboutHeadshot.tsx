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
    <div className="relative h-40 w-40 overflow-hidden rounded-full border border-zinc-200 bg-[rgb(88_104_120)] dark:border-zinc-800 dark:bg-[rgb(70_84_98)] sm:h-44 sm:w-44">
      <Image
        src={activeSrc}
        alt={alt}
        fill
        sizes="(max-width: 640px) 160px, 176px"
        priority
        unoptimized
        className="object-contain p-2"
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
