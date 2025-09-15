/** @jsxImportSource @emotion/react */
import { Global } from "@emotion/react";
import { Global as GlobalStyles } from "@/styles/Global";
import { css } from "@emotion/react";
import { MediaQueries } from "@/styles/mixins/MediaQueries";
// import localFont from "next/font/local";
import { Roboto } from "next/font/google";
import PageTransitions from "./PageTransitions";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { ReactLenis, useLenis } from "lenis/react";
import { Meta } from "@/components/Global/Head/Meta";
import { Favicons } from "@/components/Global/Head/Favicons";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import Scene from "@/components/Experience/Scene";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";

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

  const isMobile = useMediaQuery(MediaQueries.mobile);

  const lenis = useLenis(({ scroll }) => {});

  return (
    <>
      <Meta />
      <Favicons />
      <Global styles={GlobalStyles} />
      {/* <MatomoAnalytics /> */}
      <ReactLenis
        root
        options={{
          syncTouch: true, // let touch input stay native on mobile
          duration: isMobile ? 0 : 1.2, // adjust smoothing duration
          smoothTouch: false, // explicitly disable smooth-touch inertia
        }}
      >
        <main
          ref={ref}
          className={roboto.className}
          style={{
            position: "relative",
            minHeight: "100vh",

            touchAction: "auto",
          }}
        >
          <Header />
          {/* <div
            css={styles.backdrop}
            data-visible={
              pathname === "/about" ||
              pathname === "/archive" ||
              pathname === "/gallery"
            }
          /> */}
          <PageTransitions>{children}</PageTransitions>
          {/* <Scene eventSource={ref} eventPrefix="client" /> */}
          <Footer />
        </main>
      </ReactLenis>
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
