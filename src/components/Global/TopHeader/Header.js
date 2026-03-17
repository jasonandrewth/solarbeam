/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MediaQueries } from "@/styles/mixins/MediaQueries";
import Link from "next/link";
import { useState, useEffect } from "react";

import Logo from "@/Icons/Logo";
import ChevronDown from "@/Icons/Chevron";
import { usePathname } from "next/navigation";

import { motion } from "motion/react";

import { useGlobalData } from "@/context/globalContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const NavItem = ({
  href,
  label,
  active,
  defaultActive,
  external,
  isDark,
  isShop = false,
}) => {
  const isMobile = useMediaQuery(MediaQueries.mobile);

  console.log(isDark);

  if (isMobile) {
    defaultActive = false;
  }
  return (
    <Link
      href={href}
      target={external && "_blank"}
      css={styles.navLink}
      data-active={active}
      data-shop={isShop}
    >
      <li css={styles.navItem} data-dark={isDark} data-shop={isShop}>
        <span>{label}</span>

        {isShop && <ChevronDown height="18" />}
      </li>
    </Link>
  );
};

const Header = () => {
  const pathname = usePathname();
  const { selectedNavItem } = useGlobalData();

  const isMobile = useMediaQuery(MediaQueries.mobile);
  const [indexOpen, setIndexOpen] = useState(false);

  useEffect(() => {
    setIndexOpen(false);
  }, [pathname]);

  const isDark = pathname !== "/";

  return (
    <header css={styles.header}>
      <Link href={"/"} data-dark={isDark} css={styles.logo}>
        {/* <div style={{ fontWeight: "900" }}>solarbeam kingdom</div> */}
        <Logo />
      </Link>

      {isMobile ? (
        <nav css={styles.navMobile}>
          {/* Main nav row — first in DOM so column-reverse keeps it at bottom */}
          <div css={styles.mobileMainNav}>
            <NavItem
              href={"/"}
              label="home"
              active={pathname === "/"}
              isDark={isDark}
              defaultActive={
                !(
                  pathname === "/gallery" ||
                  pathname === "/about" ||
                  pathname === "/archive" ||
                  selectedNavItem
                )
              }
            />

            <li
              css={styles.mobileIndexToggle}
              onClick={() => setIndexOpen((o) => !o)}
            >
              <span>{indexOpen ? "minimize" : "Index"}</span>
            </li>

            <NavItem
              href={"https://solarbeamkingdom.shop/"}
              external
              label="shop"
              isShop={true}
              isDark={isDark}
            />
          </div>

          {/* Expandable sub-nav — second in DOM, visually above with column-reverse */}
          <motion.div
            style={{
              overflow: "hidden",
              backgroundColor: "var(--color--white)",
            }}
            initial={{ height: 0 }}
            animate={{ height: indexOpen ? "auto" : 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              css={styles.mobileSubNav}
              initial={{ y: 10, opacity: 0 }}
              animate={{
                y: indexOpen ? 0 : 10,
                opacity: indexOpen ? 1 : 0,
              }}
              transition={{
                duration: 0.18,
                ease: "easeOut",
                delay: indexOpen ? 0.04 : 0,
              }}
            >
              <NavItem
                href="/archive"
                label="archive"
                active={pathname === "/archive"}
                isDark={false}
              />
              <NavItem
                href="/gallery"
                label="gallery"
                active={pathname === "/gallery"}
                isDark={false}
              />
              <NavItem
                href="/about"
                label="about"
                active={pathname === "/about"}
                isDark={false}
              />
            </motion.div>
          </motion.div>
        </nav>
      ) : (
        <nav css={styles.nav}>
          <ul>
            <NavItem
              href={"/"}
              label="home"
              active={pathname === "/"}
              isDark={isDark}
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
              href={"archive"}
              label="archive"
              isDark={isDark}
              active={
                pathname === "/archive" ||
                (!isMobile && selectedNavItem === "/archive")
              }
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
              isDark={isDark}
              active={
                pathname === "/gallery" ||
                (!isMobile && selectedNavItem === "/gallery")
              }
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
              isDark={isDark}
              active={
                pathname === "/about" ||
                (!isMobile && selectedNavItem === "/about")
              }
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
              isShop={true}
              isDark={isDark}
            />
          </ul>
        </nav>
      )}
    </header>
  );
};

const styles = {
  header: css`
    --gap: 2px;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999999999;
    height: 48px;
    max-heigth: 48px;

    display: grid;
    grid-template-columns: auto repeat(5, 1fr);
    grid-template-rows: 1fr 1fr;
    gap: var(--gap);

    padding: 0;
    margin: 0;

    @media ${MediaQueries.mobile} {
      /* background-color: none; */
      display: flex;
      flex-direction: row;
      align-items: stretch;
      top: auto;
      bottom: 0;
      height: auto;
    }
  `,

  logo: css`
    --color--background: var(--color--grey);
    --color--text: var(--color--grey300);
    --color--hover--background: var(--color--grey300);
    --color--hover--text: var(--color--grey900);
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    min-width: 0;
    margin: 0;
    padding: 0;
    font-family: var(--type--family--default);
    font-weight: var(--type--weight--medium);
    font-size: var(--type--scale---2);
    line-height: 1em;
    color: var(--color--text);
    background-color: var(--color--background);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: relative;
    grid-row: 1 / span 2;
    grid-column: 1;
    align-self: stretch;
    height: 100%;
    color: transparent !important;

    padding: 4px;

    svg {
      width: 6vw;
      /* padding-top: var(--gap-s); */
      height: auto;
      color: var(--color--black);
      transition: color 0.25s linear;
    }

    &[data-dark="true"] {
      svg {
        color: var(--color--white);
      }
    }

    @media ${MediaQueries.mobile} {
      width: 20vw;
      flex-shrink: 0;
      grid-row: unset;
      grid-column: unset;
      height: auto;
      align-self: stretch;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200%;
      position: relative;

      svg {
        width: 100%;
        color: var(--color--black);
      }
    }
  `,

  nav: css`
    grid-column: 2 / -1;
    grid-row: 1;

    display: grid;
    align-items: stretch;

    background-color: #ffffff;

    ul {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: var(--gap);
      margin: 0;
      padding: 0;
      list-style: none;
      height: 100%;
    }

    li {
      list-style: none;
    }

    @media ${MediaQueries.mobile} {
    }
  `,

  navMobile: css`
    flex: 1;
    min-width: 0;

    display: flex;
    flex-direction: column-reverse;

    background-color: none;
  `,

  mobileMainNav: css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--gap);
    align-items: stretch;

    > a {
      width: 100%;
      height: 100%;
      min-width: 0;
      display: flex;
      align-items: stretch;
    }

    > li {
      width: 100%;
      height: 100%;
      min-width: 0;
    }
  `,

  mobileSubNav: css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--gap);
    align-items: stretch;

    > a,
    > li {
      width: 100%;
      height: 100%;
      min-width: 0;
      display: flex;
      align-items: stretch;
      padding: 50px var(--Label--padding--h);
    }
  `,

  navLink: css`
    position: relative;
    --color--background: var(--color--grey);
    --color--hover--background: var(--color--grey300);
    --color--hover--text: var(--color--grey900);
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    align-items: center;
    min-width: 0px;
    margin: 0px;
    padding: 0px;
    padding-left: 2px;
    font-family: var(--type--family--default);
    font-weight: var(--type--weight--medium);
    font-size: var(--type--scale---2);
    line-height: 1em;
    color: var(--color--text);

    user-select: none;
    position: relative;
    z-index: 1;
    width: 100%;

    &[data-active="true"] {
      background-color: var(--color--background);
    }

    &[data-shop="true"] {
      background-color: var(--color--grey-900);
    }
  `,

  navItem: css`
    width: 100%;
    text-transform: capitalize;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    display: flex;
    justify-content: space-between;
    align-items: center;

    color: var(--color--black);

    /* &[data-shop="true"] {
      color: var(--color--white) !important;
    } */

    span,
    li {
      position: relative;
      display: block;
      width: 100%;
      padding: 5px var(--Label--padding--h) 5px;
    }

    svg {
      transform: rotate(-90deg);
    }

    @media ${MediaQueries.mobile} {
      /* span,
      li {
        padding: 5px 0px 5px;
      } */
    }
  `,

  mobileIndexToggle: css`
    width: 100%;
    height: 100%;
    min-width: 0;
    list-style: none;
    cursor: pointer;
    text-transform: capitalize;
    white-space: nowrap;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: var(--color--grey);
    color: var(--color--black);
    font-family: var(--type--family--default);
    font-weight: var(--type--weight--medium);
    font-size: var(--type--scale---2);
    line-height: 1em;

    span {
      display: block;
      width: 100%;
      padding: 5px 2px 5px;
    }
  `,
};

export default Header;
