import { Providers } from "@/components/Providers";
import { PropsWithChildren } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/scss/style.scss";
import "aos/dist/aos.css";
import { SanityLive } from "@/sanity/lib/live";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";

export default async function FrontendLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="tokyo_tm_all_wrap">
        <Providers>{children}</Providers>
        <SanityLive />
        {(await draftMode()).isEnabled && (
          <>
            {/* <DisableDraftMode /> */}
            <VisualEditing />
          </>
        )}
      </div>
    </>
  );
}
