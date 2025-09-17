/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MediaQueries } from "@/styles/mixins/MediaQueries";

import Image from "next/image";
import localFont from "next/font/local";
import { useGlobalData } from "@/context/globalContext";
import { useEffect } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const { setSelectedNavItem } = useGlobalData();

  useEffect(() => {
    setSelectedNavItem("");
  }, []);

  return (
    <main
      css={css`
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        max-height: 100vh;
        padding-left: 100px;
        overflow: hidden;

        /* Coming Soon label */
        > span.comingSoon {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          letter-spacing: 0.08rem;
          font-weight: 700;
          opacity: 0.5;
          top: 60vh; /* mobile */
          font-size: 1.3rem; /* mobile */
        }

        /* Desktop adjustments */
        @media (min-width: 768px) {
          > span.comingSoon {
            top: 64vh;
            font-size: 2rem;
            letter-spacing: 0.02rem;
          }
        }
      `}
    >
      {/* <Image
        src="/assets/2stones.png"
        alt="Two stones"
        width={666 * 2}
        height={375 * 2}
      /> */}
      {/* <span className="comingSoon">COMING SOON</span> */}
    </main>
  );
}
