/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MediaQueries } from "@/styles/mixins/MediaQueries";

const mockData = [
  {
    title: "Item 1",
    year: "1998",
  },
  {
    title: "Item 2",
    year: "1998",
  },
];
const ArchivePage = () => {
  return (
    <div css={styles.grid}>
      {mockData.map((article, idx) => {
        return (
          <article key={idx} css={styles.card}>
            <div css={styles.aspectRatio}></div>
            <div css={styles.content}>
              <h2>{article.title}</h2>
              <span css={styles.year}>{article.year}</span>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default ArchivePage;

const styles = {
  grid: css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    width: 100%;
    padding-top: var(--gap-xl);

    @media ${MediaQueries.mobile} {
      grid-template-columns: 1fr;
    }
  `,
  card: css`
    background: #cccccc;
    display: flex;
    flex-direction: column;
    max-height: 50vh;
  `,
  aspectRatio: css`
    position: relative;
    width: 100%;
    padding-top: calc(16 / 9 * 100%); /* 9:16 aspect ratio */
  `,
  content: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  year: css`
    font-style: italic;
  `,
};
