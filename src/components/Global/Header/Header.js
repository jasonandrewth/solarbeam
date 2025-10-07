/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MediaQueries } from "@/styles/mixins/MediaQueries";
import Link from "next/link";

import Logo from "@/Icons/Logo";
import { usePathname } from "next/navigation";

import { motion } from "motion/react";

import { useGlobalData } from "@/context/globalContext";

const Header = () => {
  const pathname = usePathname();
  const isDark = pathname !== "/";

  const { selectedNavItem } = useGlobalData();

  const NavItem = ({ href, label, active, defaultActive, external }) => (
    <Link
      href={href}
      target={external && "_blank"}
      data-about={isDark}
      css={styles.navLink}
    >
      <li css={styles.navItem} data-active={active}>
        {(active || defaultActive) && (
          <motion.div
            layoutId="navHighlight"
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 40,
              mass: 0.3,
            }}
            animate={{ opacity: defaultActive ? 0 : 1 }}
            style={{ position: "absolute", inset: 0, borderRadius: 9999 }}
            css={styles.navHighlight}
          />
        )}
        <span css={styles.navLabel}>{label}</span>
      </li>
    </Link>
  );

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
        <motion.ul layout css={styles.navPill} initial={false}>
          <NavItem
            href={"archive"}
            label="archive"
            active={pathname === "/archive" || selectedNavItem === "/archive"}
            defaultActive={
              !(
                pathname === "/gallery" ||
                pathname === "/about" ||
                pathname === "/archive" ||
                selectedNavItem
              )
            }
          />
          <NavItem
            href={"gallery"}
            label="gallery"
            active={pathname === "/gallery" || selectedNavItem === "/gallery"}
            defaultActive={
              !(
                pathname === "/gallery" ||
                pathname === "/about" ||
                pathname === "/archive" ||
                selectedNavItem
              )
            }
          />
          <NavItem
            href={"about"}
            label="about"
            active={pathname === "/about" || selectedNavItem === "/about"}
            defaultActive={
              !(
                pathname === "/gallery" ||
                pathname === "/about" ||
                pathname === "/archive" ||
                selectedNavItem
              )
            }
          />
          <NavItem
            href={"https://solarbeamkingdom.shop/"}
            external
            label="shop"
            active={false}
            defaultActive={
              !(
                pathname === "/gallery" ||
                pathname === "/about" ||
                pathname === "/archive" ||
                selectedNavItem
              )
            }
          />
        </motion.ul>
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
    align-items: center;

    /* border: 1px solid green; */

    /* * {
      text-transform: uppercase;
      font-size: 64px;
      line-height: 1rem;
      color: var(--color--black);
      transition: color 0.25s linear;
    } */
    * {
      color: var(--color--black);
    }

    &[data-about="true"] {
      * {
        color: var(--color--white);
      }
    }

    @media ${MediaQueries.medium} {
      padding: var(--gap-s) var(--gap-l);
    }
  `,
  nav: css`
    position: relative;
    display: flex;
    align-items: center;

    @media ${MediaQueries.mobile} {
      font-size: var(--type--scale--1);

      svg {
        width: 64px;
        height: auto;
        padding: 0;
      }
    }
  `,
  navPill: css`
    position: relative;
    display: flex;
    gap: var(--gap-s);
    list-style: none;
    margin: 0;
    padding: 6px;
    border-radius: 9999px;
    background: var(--color--black);
    border: 1px solid rgb(82 82 82 / 1);
  `,
  navLink: css`
    text-decoration: none;
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
        width: 64px;
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

    /* * {
      font-size: 64px;
      line-height: 0;
    } */
  `,
  navItem: css`
    position: relative;
    border-radius: 9999px;
    padding: 0.4rem 0.9rem;
    cursor: pointer;
    /* overflow: hidden; */
  `,
  navHighlight: css`
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(4px);
  `,
  navLabel: css`
    position: relative;
    z-index: 1;
    color: var(--color--white);
    font-weight: 500;
    text-transform: capitalize;
  `,
};
