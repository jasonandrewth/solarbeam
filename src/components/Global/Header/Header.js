/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MediaQueries } from "@/styles/mixins/MediaQueries";
import Link from "next/link";

import Logo from "@/Icons/Logo";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  return (
    <header data-about={pathname === "/about"} css={styles.header}>
      <Link href={"/"} data-about={pathname === "/about"} css={styles.logo}>
        {/* <div style={{ fontWeight: "900" }}>solarbeam kingdom</div> */}
        <Logo />
      </Link>

      <Link
        href={pathname === "/about" ? "/" : "/about"}
        data-about={pathname === "/about"}
        css={styles.menuIcon}
      >
        +
      </Link>
      {/* <nav aria-label="Main" css={styles.nav}>
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

          <Link href={"/"} data-about={pathname === "/about"} css={styles.logo}>
         
            <Logo />
          </Link>
          <div css={styles.rightMenu}>
            <li>
              <Link href={"/about"}>+</Link>
            </li>
          </div>
        </div>
      </nav> */}
    </header>
  );
};

export default Header;

const styles = {
  header: css`
    position: relative;
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

    * {
      text-transform: uppercase;
      font-size: 64px;
      line-height: 1rem;
      color: var(--color--black);
      transition: color 0.25s linear;
    }

    &[data-about="true"] {
      * {
        color: var(--color--white);
      }
    }

    @media ${MediaQueries.medium} {
      /* min-height: 65vh; */
      * {
        display: block;
        line-height: 0;
        font-size: 32px;
      }
    }
  `,
  nav: css`
    position: relative;
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
      width: 64px;
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
