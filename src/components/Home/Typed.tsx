"use client";

import { ReactTyped } from "react-typed";

export default function Typed({ typedOptions }: { typedOptions: string[] }) {
  return <ReactTyped strings={typedOptions} loop typeSpeed={80} />;
}
