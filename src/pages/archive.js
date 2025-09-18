/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MediaQueries } from "@/styles/mixins/MediaQueries";
import Image from "next/image";
import { useEffect } from "react";
import { useGlobalData } from "@/context/globalContext";

const mockData = [
  {
    title: "Vetements by Demna Gvasalia AW 2016",
    size: "Size M",
    url: "/assets/imgs/archive/vetements.jpg",
  },
  {
    title: "20471120",
    url: "/assets/imgs/archive/ar12.png",
  },
  {
    title: "BLESS N.18 Allroundwear Blouson, 2002",
    size: "Size OS",
    url: "/assets/imgs/archive/ar15.png",
  },
  {
    title: "BLESS N. 28 Climate Confusion Assistance Lingerie Jacket, 2005",
    size: "Size L",
    url: "/assets/imgs/archive/ar3.jpg",
  },
  {
    title: "Vetements Checkered Wide Trouser, AW 2017",
    size: "Size S",
    url: "/assets/imgs/archive/ar4.jpg",
  },
  {
    title: "Raf Simons Kinetic Youth Pleated Red Trouser, SS 1999",
    size: "Size 48",
    url: "/assets/imgs/archive/ar5.jpg",
  },
  {
    title: "A.F. Vandevorst for Ruffo Research Suede Trucker Jacket, AW 2000",
    size: "Size M",
    url: "/assets/imgs/archive/ar6.jpg",
  },
  {
    title: "Helmut Lang",
    url: "/assets/imgs/archive/ar7.png",
  },
  {
    title: "Raf Simons Radioactivity Striped Suit, AW 1998",
    url: "/assets/imgs/archive/ar10.jpg",
  },
  {
    title: "Vetements by Demna Gvasalia AW 2016",
    size: "Size M",
    url: "/assets/imgs/archive/ar13.jpg",
  },
];
const ArchivePage = () => {
  const { setSelectedNavItem } = useGlobalData();

  useEffect(() => {
    setSelectedNavItem("/archive");
  }, []);

  return (
    <>
      <div css={styles.grid}>
        {mockData.map((article, idx) => {
          return (
            <article key={idx} css={styles.card}>
              <div css={styles.aspectRatio}>
                <Image
                  src={article.url}
                  alt={article.title}
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
      /* padding-top: 6rem; */
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

    img {
      transition: transform 0.4s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }
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
