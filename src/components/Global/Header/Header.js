/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MediaQueries } from "@/styles/mixins/MediaQueries";
import Link from "next/link";

import Logo from "@/Icons/Logo";

const Header = () => {
  return (
    <header css={styles.header}>
      <nav aria-label="Main" css={styles.nav}>
        <div css={styles.menu}>
          <div css={styles.leftMenu}>
            <li css={styles.hasSubnav}>
              <Link href={"/archive"}>Archive</Link>
              <ul css={styles.subnav}>
                <li>
                  <Link href="/archive/new">New Arrivals</Link>
                </li>
                <li>
                  <Link href="/archive">All</Link>
                </li>
              </ul>
            </li>
          </div>

          <Link href={"/"} css={styles.logo}>
            {/* <div style={{ fontWeight: "900" }}>solarbeam kingdom</div> */}
            <Logo />
          </Link>
          <div css={styles.rightMenu}>
            <li>
              <Link href={"/about"}>About</Link>
            </li>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

const styles = {
  header: css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    /* background-color: red; */
    padding: var(--gap-s) var(--gap-m);
    z-index: 999;

    * {
      text-transform: uppercase;
      font-size: var(--type--scale--0);
    }

    @media ${MediaQueries.medium} {
      /* min-height: 65vh; */
    }
  `,
  nav: css`
    position: relative;
  `,
  logo: css`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    opacity: 1 !important;

    svg {
      width: 30vw;
      height: auto;
    }

    @media ${MediaQueries.mobile} {
      svg {
        width: calc(60vw - var(--gap-m));
        height: auto;
      }
    }
  `,
  menu: css`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;

    a {
      transition: opacity linear 0.25s;
      opacity: 0.6;

      &:hover {
        opacity: 1;
      }
    }

    @media ${MediaQueries.mobile} {
      padding-top: 64px;
    }
  `,
  hasSubnav: css`
    position: relative;
    &:hover ul {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
      pointer-events: auto;
    }
  `,
  subnav: css`
    list-style: none;
    margin: 0;
    padding: 0.25rem 0 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    opacity: 0;
    visibility: hidden;
    transform: translateY(4px);
    transition: opacity 120ms ease, transform 120ms ease, visibility 120ms ease;
    pointer-events: none;
    @media ${MediaQueries.medium} {
      opacity: 1;
      visibility: visible;
      transform: none;
      pointer-events: auto;
    }
  `,
  leftMenu: css`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  `,
  rightMenu: css`
    display: flex;
    align-items: center;
  `,
};
