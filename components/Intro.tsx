"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "introSeen";
const TOTAL_DURATION_MS = 3050;
const CURTAIN_START_MS = 2700;

type Phase = "checking" | "playing" | "leaving" | "done";

export default function Intro() {
  const [phase, setPhase] = useState<Phase>("checking");

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (sessionStorage.getItem(STORAGE_KEY) === "true") {
      setPhase("done");
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setPhase("done");
      return;
    }

    setPhase("playing");
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const skip = () => {
      setPhase((current) => (current === "playing" ? "leaving" : current));
    };

    const handleKey = () => skip();
    const handlePointer = () => skip();

    window.addEventListener("keydown", handleKey);
    window.addEventListener("pointerdown", handlePointer);

    const curtainTimer = window.setTimeout(() => {
      setPhase((current) => (current === "playing" ? "leaving" : current));
    }, CURTAIN_START_MS);

    const finishTimer = window.setTimeout(() => {
      setPhase("done");
    }, TOTAL_DURATION_MS);

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("pointerdown", handlePointer);
      window.clearTimeout(curtainTimer);
      window.clearTimeout(finishTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "leaving") return;
    const timer = window.setTimeout(() => setPhase("done"), 350);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase === "done") {
      sessionStorage.setItem(STORAGE_KEY, "true");
    }
  }, [phase]);

  if (phase === "checking" || phase === "done") return null;

  const isLeaving = phase === "leaving";

  return (
    <div
      role="dialog"
      aria-label="Intro"
      aria-modal="true"
      className="fixed inset-0 z-50 pointer-events-none"
    >
      <div
        className={`absolute inset-x-0 top-0 h-1/2 bg-white dark:bg-zinc-950 ${
          isLeaving ? "intro-curtain-leaving-top" : ""
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-white dark:bg-zinc-950 ${
          isLeaving ? "intro-curtain-leaving-bottom" : ""
        }`}
      />

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center ${
          isLeaving ? "intro-content-leaving" : ""
        }`}
      >
        <p className="intro-stage-1 text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          Hi, I&apos;m
        </p>

        <div className="flex items-center justify-center">
          <h1 className="intro-stage-handwrite-text font-handwritten text-7xl font-bold tracking-tight text-zinc-900 pr-3 dark:text-zinc-50 sm:pr-5 sm:text-9xl">
            Krish Patel
          </h1>
          <span
            aria-hidden="true"
            className="intro-stage-handwrite-caret ml-2 inline-block h-12 w-[3px] bg-zinc-900 dark:bg-zinc-50 sm:h-20"
          />
        </div>

        <p className="intro-stage-tagline mt-2 text-xl font-medium text-zinc-700 dark:text-zinc-300 sm:text-2xl">
          software engineer &amp; builder
        </p>
      </div>
    </div>
  );
}
