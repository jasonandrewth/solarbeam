/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MediaQueries } from "@/styles/mixins/MediaQueries";

import { useState } from "react";

const AboutPage = () => {
  const [visible, setVisible] = useState(true);

  const clickHandler = () => {
    setVisible((prev) => !prev);
  };

  return (
    <>
      {/* <div css={styles.backdrop} /> */}
      <div css={styles.body} data-visible={visible}>
        <p>
          An archive fashion vault, immersive art experience and character
          selection screen for London’s most discerning players.
        </p>
        <br></br>
        <p>
          Solarbeam Kingdom is a multi-functional space showcasing rare fashion
          archives alongside immersive art experiences, acting as a gateway for
          collaborative world building between artists, designers, collectors
          and other cultural practitioners.
        </p>
        <br></br>
        <p>
          Within the Kingdom of Solarbeam, every piece of clothing exists in
          part as costume, and in part as simulation - always having life beyond
          the material.
        </p>
        <br></br>
        <p>
          Solarbeam Kingdom is a dominion of creative cultural exchanges,
          featuring rarely seen pieces sourced from private collections in the
          far East, a by-appointment only showroom, art gallery, listening room,
          screening space and death chamber (patent pending).
        </p>
        <br></br>
        <span css={styles.contact}>
          <a href="mailto:info@solarbeamkingdom.com">
            Contact: info@solarbeamkingdom.com
          </a>
        </span>
      </div>
    </>
  );
};

const styles = {
  header: css`
    z-index: 1;
    max-width: 50vw;
    font-size: var(--type--scale---1);

    * {
      text-transform: uppercase;
      font-size: var(--type--scale---1);
      line-height: var(--type--lineheight--1);
    }
  `,

  logo: css`
    line-break: none;
    font-family: var(--font-slyther);
    font-size: 1.1rem;
    line-height: var(--type--lineheight--0);
    white-space: nowrap;
  `,

  body: css`
    width: 50%;
    opacity: 1;
    transform: translateX(50%);

    /* user-select: none; */
    position: relative;
    z-index: 1;
    color: rgba(255, 255, 255, 0.6);
    @media ${MediaQueries.mobile} {
      padding-top: 0;
      width: 100%;
    }
  `,
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
  `,
  contact: css`
    font-weight: 700;
    color: rgba(255, 255, 255, 0.8);
  `,
};

export default AboutPage;
