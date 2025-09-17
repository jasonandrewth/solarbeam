/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MediaQueries } from "@/styles/mixins/MediaQueries";

import { useState } from "react";
import ChevronDown from "@/Icons/Chevron";

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

        <a
          href="https://app.acuityscheduling.com/schedule.php?owner=36275697&ref=booking_button"
          target="_blank"
        >
          <button css={styles.button}>
            Schedule Appointment <ChevronDown />
          </button>
        </a>
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
    width: 66rem;
    opacity: 1;
    /* transform: translateX(var(--gap-l)); */
    /* padding-top: var(--gap-s); */

    /* user-select: none; */
    position: relative;
    z-index: 1;
    color: rgba(255, 255, 255, 0.75);
    @media ${MediaQueries.mobile} {
      transform: none;
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
  button: css`
    opacity: 1;

    margin-top: var(--gap-m);
    font-weight: 700;
    color: rgba(255, 255, 255, 0.8);
    background-color: transparent;
    /* color: var(--color--white); */
    border: 0.75px solid #9b9b9b;
    border-radius: 9999px;
    padding: 0.6rem 1rem;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: opacity 0.25s linear;

    &:hover {
      opacity: 0.8;
    }

    svg {
      transform: rotate(-90deg);
    }

    @media ${MediaQueries.mobile} {
      margin-top: var(--gap-l);
      padding: 0.4rem 1rem;
    }
  `,
};

export default AboutPage;
