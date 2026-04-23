"use client";

import { usePathname } from "next/navigation";
import Intro from "@/components/Intro";

export default function IntroMount() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return <Intro />;
}
