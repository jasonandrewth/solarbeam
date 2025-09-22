/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MediaQueries } from "@/styles/mixins/MediaQueries";

import { useLenis } from "lenis/react";
import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

let easing = [0.175, 0.85, 0.42, 0.96];

const TransitionSetting = {
  initial: {
    y: "10%",

    opacity: 0,
  },
  exit: {
    y: "10%",

    opacity: 0,
    transition: {
      duration: 0.4,
      ease: easing,
    },
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      staggeringChildren: 2,
      duration: 0.4,
      ease: easing,
    },
  },
};

const PageTransitions = ({ children }) => {
  const pathname = usePathname();

  const lenis = useLenis(({ scroll }) => {});

  // Always scroll to top on route change using Lenis
  useEffect(() => {
    if (!lenis) return;
    // Scroll instantly to the very top (no animation) so transitions feel crisp
    lenis.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        initial="initial"
        animate="enter"
        exit="exit"
        key={pathname}
        variants={TransitionSetting}
        data-gallery={pathname == "/gallery"}
        css={styles.main}
        // transition={{ duration: 0.5 }}
        // style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
};

const styles = {
  main: css`
    position: relative;
    z-index: 1;
    padding: var(--gap-l);
    font-size: var(--type--scale---0);
    min-height: 100vh;
    padding-top: 12rem;

    &[data-gallery="true"] {
      padding-top: 0;
    }

    @media ${MediaQueries.medium} {
      padding-top: calc(var(--gap-xl) + var(--gap-xl));
    }
  `,
};

export default PageTransitions;
