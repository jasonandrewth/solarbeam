/** @jsxImportSource @emotion/react */
import Instagram from "@/Icons/Instagram";
import LilGuy from "@/Icons/LilGuy";
import { css } from "@emotion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  return (
    <footer css={styles.footer} data-about={pathname === "/about"}>
      <LilGuy css={styles.mascot} />
      <Link
        target="_blank"
        href={"https://www.instagram.com/solarbeam.kingdom/"}
      >
        <Instagram css={styles.ig} />
      </Link>
    </footer>
  );
};

export default Footer;

const styles = {
  footer: css`
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0.5rem 1rem;
    padding: var(--gap-m) var(--gap-l);
    z-index: 999;

    * {
      color var(--color--black);
      transiton: color 0.25s linear;
    }

    &[data-about="true"] {
      * {
        color: var(--color--white);
      }
    }
  `,
  left: css`
    /* background-color: red; */
    padding-bottom: var(--gap-m);
  `,
  icon: css`
    display: block;
  `,
  email: css`
    text-decoration: none;
    line-height: 1;
  `,
  ig: css`
    width: 18px;
    height: 18px;
    /* background-color: red; */
  `,
  mascot: css`
    width: auto;
    height: 48px;
    /* background-color: red; */
  `,
};
