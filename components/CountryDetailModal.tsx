"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import type { TravelPhoto, VisitedCountry } from "@/lib/travel";

type CountryDetailModalProps = {
  country: VisitedCountry;
  onClose: () => void;
};

function PhotoPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="flex aspect-[16/10] w-full items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-100 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
      role="img"
      aria-label={`No photo yet for ${label}`}
    >
      Photos coming soon
    </div>
  );
}

function GalleryImage({
  photo,
  priority = false,
}: {
  photo: TravelPhoto;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <PhotoPlaceholder label={photo.alt} />;
  }

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 640px) 100vw, 560px"
        className="object-cover"
        priority={priority}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

export default function CountryDetailModal({
  country,
  onClose,
}: CountryDetailModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const photos = country.photos ?? [];
  const [hero, ...rest] = photos;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const onBackdropClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-[2px] sm:items-center sm:p-6"
      role="presentation"
      onClick={onBackdropClick}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950 sm:max-h-[85vh] sm:rounded-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 px-5 py-4 dark:border-zinc-800 sm:px-6">
          <div className="min-w-0">
            <h2
              id={titleId}
              className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              {country.name}
            </h2>
            {country.dates ? (
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {country.dates}
              </p>
            ) : null}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-zinc-200 text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-500"
            aria-label="Close country details"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              ×
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-5 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          {hero ? (
            <GalleryImage photo={hero} priority />
          ) : (
            <PhotoPlaceholder label={country.name} />
          )}

          {country.description ? (
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {country.description}
            </p>
          ) : null}

          {country.notes ? (
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-500">
              {country.notes}
            </p>
          ) : null}

          {rest.length > 0 ? (
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                More photos
              </h3>
              <ul className="grid gap-3">
                {rest.map((photo) => (
                  <li key={photo.src}>
                    <GalleryImage photo={photo} />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
