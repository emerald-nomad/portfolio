import { Mulish, Montserrat, Poppins } from "next/font/google";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/scss/style.scss";
import "aos/dist/aos.css";

const MulishFonts = Mulish({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-mulish",
});
const MontserratFonts = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-montserrat",
});
const PoppinsFonts = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${MulishFonts.variable} ${MontserratFonts.variable}  ${PoppinsFonts.variable}  `}
      >
        <div className="tokyo_tm_all_wrap">{children}</div>
      </body>
    </html>
  );
}
