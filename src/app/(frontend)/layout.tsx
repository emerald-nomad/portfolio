import { Providers } from "@/components/Providers";
import { PropsWithChildren } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/scss/style.scss";
import "aos/dist/aos.css";
import { SanityLive } from "@/sanity/lib/live";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import Sidebar from "@/components/Sidebar";

export default async function FrontendLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="tokyo_tm_all_wrap">
        <Providers>
          <Sidebar />
          <div className="rightpart" style={{ minHeight: "100vh" }}>
            <div className="rightpart_in">
              <div className="tokyo_tm_section">
                <div data-aos="fade-right" data-aos-duration="1200">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </Providers>
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
