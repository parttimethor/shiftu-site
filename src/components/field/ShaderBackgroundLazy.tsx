"use client";

import dynamic from "next/dynamic";

// Defer three.js to a lazy chunk (loads after paint, not in the initial bundle).
export const ShaderBackground = dynamic(
  () => import("./ShaderBackground").then((m) => m.ShaderBackground),
  { ssr: false },
);
