/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MediaQueries } from "@/styles/mixins/MediaQueries";
import Image from "next/image";

const mockData = [
  {
    title: "Vetements by Demna Gvasalia AW 2016",
    size: "Size M",
  },
  {
    title: "Vetements by Demna Gvasalia AW 2016",
    size: "Size M",
  },
  {
    title: "Vetements by Demna Gvasalia AW 2016",
    size: "Size M",
  },
  {
    title: "Vetements by Demna Gvasalia AW 2016",
    size: "Size M",
  },
  {
    title: "Vetements by Demna Gvasalia AW 2016",
    size: "Size M",
  },
];
const ArchivePage = () => {
  return (
    <>
      <div css={styles.grid}>
        {mockData.map((article, idx) => {
          return (
            <article key={idx} css={styles.card}>
              <div css={styles.aspectRatio}>
                <Image
                  src={"/assets/imgs/vetements.jpg"}
                  alt={"vet"}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div css={styles.content}>
                <h2>{article.title}</h2>
                <span css={styles.size}>{article.size}</span>
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
    grid-template-columns: repeat(4, 1fr);
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
      grid-template-columns: 1fr;
      padding-top: 6rem;
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
