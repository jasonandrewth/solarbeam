/** @jsxImportSource @emotion/react */
import { Global } from "@emotion/react";
import { Global as GlobalStyles } from "@/styles/Global";
import { css } from "@emotion/react";

// import localFont from "next/font/local";
import { Roboto } from "next/font/google";
import PageTransitions from "./PageTransitions";

import { useRef } from "react";
import dynamic from "next/dynamic";

import { Meta } from "@/components/Global/Head/Meta";
import { Favicons } from "@/components/Global/Head/Favicons";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import Scene from "@/components/Experience/Scene";
import { usePathname } from "next/navigation";

// const Scene = dynamic(() => import("@/components/Experience/Scene"), {
//   ssr: false,
// });

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const Layout = ({ children }) => {
  const ref = useRef(null);

  const pathname = usePathname();

  return (
    <>
      <Meta />
      <Favicons />
      <Global styles={GlobalStyles} />
      {/* <MatomoAnalytics /> */}
      <main
        ref={ref}
        className={roboto.className}
        style={{
          position: "relative",
          overflow: "auto",
          touchAction: "auto",
        }}
      >
        <Header />
        <div
          css={styles.backdrop}
          data-visible={pathname === "/about" || pathname === "/archive"}
        />
        <PageTransitions>{children}</PageTransitions>
        <Scene eventSource={ref} eventPrefix="client" />
        <Footer />
      </main>
    </>
  );
};

const styles = {
  backdrop: css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: 0;
    opacity: 0;
    transition: opacity 0.25s linear;

    &[data-visible="true"] {
      opacity: 1;
    }
  `,
};

export default Layout;
