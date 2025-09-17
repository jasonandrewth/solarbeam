/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MediaQueries } from "@/styles/mixins/MediaQueries";
import Image from "next/image";
import { useGlobalData } from "@/context/globalContext";
import { useEffect } from "react";

const mockData = [
  "/assets/imgs/1.jpg",
  "/assets/imgs/2.jpg",
  "/assets/imgs/3.jpg",
  "/assets/imgs/4.jpg",
  "/assets/imgs/5.jpg",
  "/assets/imgs/6.jpg",
  "/assets/imgs/7.jpg",
  "/assets/imgs/8.jpg",
  "/assets/imgs/9.jpg",
  "/assets/imgs/10.jpg",
  "/assets/imgs/11.jpg",
  "/assets/imgs/12.jpg",
  "/assets/imgs/13.jpg",
  "/assets/imgs/14.jpg",
  "/assets/imgs/15.jpg",
  "/assets/imgs/16.jpg",
  "/assets/imgs/17.jpg",
  "/assets/imgs/18.jpg",
  "/assets/imgs/19.jpg",
  "/assets/imgs/20.jpg",
];

const ArchivePage = () => {
  const { setSelectedNavItem } = useGlobalData();

  useEffect(() => {
    setSelectedNavItem("/gallery");
  }, []);

  return (
    <>
      <div css={styles.grid}>
        {mockData.map((url, idx) => {
          return (
            <article key={idx} css={styles.card}>
              <div css={styles.aspectRatio}>
                <Image
                  src={url}
                  alt={`image-${idx}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
};

export default ArchivePage;

const styles = {
  grid: css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    width: 100%;
    max-width: 100%;
    padding-top: 0rem;
    position: relative;
    z-index: 1;

    * {
      text-transform: uppercase;
      font-size: var(--type--scale---0);
      line-height: var(--type--lineheight--1);
      color: rgba(255, 255, 255, 0.8);
    }

    @media ${MediaQueries.mobile} {
      gap: 0.5rem;
      /* grid-template-columns: 1fr; */
      /* padding-top: 6rem; */
      margin-left: calc(var(--gap-l) * -1);
      margin-right: calc(var(--gap-l) * -1);
      max-width: 100vw;
      width: 100vw !important;
    }
  `,
  card: css`
    position: relative;
    background: transparent;
    display: flex;
    flex-direction: column;
    gap: var(--gap-s);
    min-width: 0; /* allow grid item to shrink to column width */
  `,
  aspectRatio: css`
    position: relative;
    width: 100%;
    height: auto;
    aspect-ratio: 3 / 4; /* height derives from width */
    overflow: hidden; /* ensure the fill image never bleeds */
  `,
  content: css`
    position: relative;

    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    h2 {
      max-width: 24rem; /* cap but allow smaller columns */
      width: 100%;
      overflow-wrap: anywhere; /* safe wrap if needed */
    }
  `,
  size: css`
    font-style: italic;
  `,
};
