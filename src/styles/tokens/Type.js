import { MediaQueries } from "../mixins/MediaQueries";

//  for syntax highlghting
const css = String.raw;

const Type = css`
  :root {
    /** 
     * Scale
     */
    --type--scale---3: 0.53rem;
    --type--scale---2: 0.66rem;
    //p1
    --type--scale---1: 0.75rem; // 0.7777
    //p2
    --type--scale---0: 1rem; // 12px
    //h5
    --type--scale--1: 1.16rem; // 14px
    //h4
    --type--scale--2: 1.33rem; // 16px
    //h3
    --type--scale--3: 2rem; // 3
    //h2
    --type--scale--4: 3.33rem; // 40px
    //h1
    --type--scale--5: 4.16rem; // 50px

    /*
     * Fluid Size
     */
    --fluid--min-vw: 1380;
    --type--base-size: 12;
    --type--size: 1;
    --type--max--size: 14;

    /**
     * Line Height
     */
    --type--lineheight---1: 0.75;
    --type--lineheight--0: 1;
    --type--lineheight--1: 1.15;
    --type--lineheight--2: 1.35;
    --type--lineheight--3: 1.5;

    /**
     * Weight
     */
    --type--weight--light: 300;
    --type--weight--regular: 400;
    --type--weight--bold: 700;

    /**
     * Letter Spacing
     */
    --type--spacing---3: -0.04em;
    --type--spacing---2: -0.02em;
    --type--spacing---1: -0.01em;

    --type--spacing--1: 0.015em;
    --type--spacing--2: 0.03em;
    --type--spacing--3: 0.06em;

    @media ${MediaQueries.mobile} {
      --type--base-size: 11;

      --type--scale---2: 0.5rem;
      //p1
      --type--scale---1: 0.7rem; // 0.7777
      //p2
      --type--scale---0: 1rem; // 1
      //h5
      --type--scale--1: 1.27rem; // 14px
      //h4
      --type--scale--2: 1.45rem; // 16px
      //h3
      --type--scale--3: 2rem; // 3
      //h2
      --type--scale--4: 2.85rem; // 3.75
      //h1
      --type--scale--5: 4.5rem; // 4.72
    }
  }

  *,
  *::before,
  *::after {
    font-family: var(--font-sans), Helvetica, Arial, sans-serif;
  }

  html {
    font-size: min(
      calc(var(--type--max--size) * 1px),
      max(
        calc(var(--type--base-size) * 1px),
        calc(var(--type--base-size) / var(--fluid--min-vw) * 100vw)
      )
    );

    line-height: var(--type--lineheight--0);

    line-height: var(--type--lineheight--1);
    font-weight: var(--type--weight--regular);
    letter-spacing: var(--type--spacing--1);
    font-kerning: normal;
    text-size-adjust: 100%;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export { Type };
