/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MediaQueries } from "@/styles/mixins/MediaQueries";
import Link from "next/link";

import Logo from "@/Icons/Logo";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const isDark = pathname !== "/" || pathname !== "/gallery";
  return (
    <header data-about={isDark} css={styles.header}>
      <Link href={"/"} data-about={isDark} css={styles.logo}>
        {/* <div style={{ fontWeight: "900" }}>solarbeam kingdom</div> */}
        <Logo />
      </Link>

      {/* <Link
        href={pathname === "/about" ? "/" : "/about"}
        data-about={isDark}
        css={styles.menuIcon}
      >
        +
      </Link> */}

      <nav css={styles.nav}>
        <ul>
          <Link href={"archive"} data-about={isDark}>
            <li>archive</li>
          </Link>

          <Link href={"gallery"} data-about={isDark}>
            <li>gallery</li>
          </Link>
          <Link href={"about"} data-about={isDark}>
            <li>about</li>
          </Link>
        </ul>
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
    padding: var(--gap-l);
    z-index: 999;

    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    /* border: 1px solid green; */

    /* * {
      text-transform: uppercase;
      font-size: 64px;
      line-height: 1rem;
      color: var(--color--black);
      transition: color 0.25s linear;
    } */

    &[data-about="true"] {
      * {
        color: var(--color--white);
      }
    }

    @media ${MediaQueries.medium} {
      /* min-height: 65vh; */
      align-items: center;
      * {
        display: block;
        line-height: 0;
        font-size: 32px;
      }
    }
  `,
  nav: css`
    position: relative;
    font-size: var(--type--scale---0);
    line-height: var(--type--lineheight--1);

    ul {
      display: flex;
      gap: var(--gap-m);
    }
  `,
  menuIcon: css`
    transform: rotate(0);
    transition: all 0.25s linear;
    &[data-about="true"] {
      transform: rotate(45deg);
    }
  `,
  logo: css`
    /* position: absolute;
    top: 0;
    left: 0; */
    /* transform: translateX(-50%); */

    opacity: 1 !important;
    /* border: 1px solid red; */

    margin: 0;

    svg {
      width: 8vw;
      /* padding-top: var(--gap-s); */
      height: auto;
      color: var(--color--black);
      transition: color 0.25s linear;
    }

    &[data-about="true"] {
      svg {
        color: var(--color--white);
      }
    }

    @media ${MediaQueries.mobile} {
      svg {
        width: 128px;
        height: auto;
        padding: 0;
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
    padding: var(--gap-m);

    a {
      transition: opacity linear 0.25s;
      opacity: 0.6;

      &:hover {
        opacity: 1;
      }
    }

    @media ${MediaQueries.mobile} {
      padding-top: calc(27px + var(--gap-s));
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

    position: absolute;
    top: 0;
    right: 0;

    * {
      font-size: 64px;
      line-height: 0;
    }
  `,
};
