/** @jsxImportSource @emotion/react */
import { Global } from "@emotion/react";
import { Global as GlobalStyles } from "@/styles/Global";
import { css } from "@emotion/react";
import { MediaQueries } from "@/styles/mixins/MediaQueries";
// import localFont from "next/font/local";
import { Roboto } from "next/font/google";
import PageTransitions from "./PageTransitions";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ReactLenis } from "lenis/react";
import { cancelFrame, frame } from "motion/react";
import { Meta } from "@/components/Global/Head/Meta";
import { Favicons } from "@/components/Global/Head/Favicons";
import { motion } from "motion/react";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import Scene from "@/components/Experience/Scene";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { GlobalContextProvider } from "@/context/globalContext";

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
  const lenisRef = useRef(null);

  const pathname = usePathname();

  const isMobile = useMediaQuery(MediaQueries.mobile);

  const isInfnite = pathname === "/gallery";

  useEffect(() => {
    function update(data) {
      const time = data.timestamp;
      lenisRef.current?.lenis?.raf(time);
    }

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);

  return (
    <>
      <Meta />
      <Favicons />
      <Global styles={GlobalStyles} />
      {/* <MatomoAnalytics /> */}
      <ReactLenis
        ref={lenisRef}
        root
        options={{
          syncTouch: true, // let touch input stay native on mobile
          // duration: isMobile ? 0.1 : 0.4, // adjust smoothing duration

          autoRaf: false,
        }}
      >
        <GlobalContextProvider>
          <main ref={ref} className={roboto.className} css={styles.main}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1, ease: "easeInOut" }}
            >
              <Header />
            </motion.div>
            <div css={styles.backdrop} data-visible={pathname !== "/"} />
            <PageTransitions>{children}</PageTransitions>
            <Scene eventSource={ref} eventPrefix="client" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1, ease: "easeInOut" }}
            >
              <Footer />
            </motion.div>
          </main>
        </GlobalContextProvider>
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

  main: css`
    position: relative;
    min-height: 100vh;
    touch-action: auto;
  `,
};

export default Layout;
