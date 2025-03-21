import { Providers } from "@/components/Providers";
import { PropsWithChildren } from "react";

export default function FrontendLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Providers>{children}</Providers>
    </>
  );
}
