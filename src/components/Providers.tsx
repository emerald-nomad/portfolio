"use client";

import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import { PropsWithChildren, useEffect } from "react";
import Aos from "aos";

export function Providers({ children }: PropsWithChildren) {
  useEffect(() => {
    Aos.init({
      duration: 1200,
    });
  }, []);

  return (
    <>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
      <ToastContainer />
    </>
  );
}
