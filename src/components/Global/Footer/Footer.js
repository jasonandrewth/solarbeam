/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer css={styles.footer}>
      <div css={styles.left}>
        <Image
          src="/assets/signs.svg"
          width={48}
          height={48}
          alt="Solabeam logo"
          css={styles.icon}
        />
      </div>
      <a css={styles.email} href="mailto:info@solarbeamkingdom.com">
        info@solarbeamkingdom.com
      </a>
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
    align-items: center;
    padding: 0.5rem 1rem;
    padding: var(--gap-s) var(--gap-m);
    z-index: 999;
  `,
  left: css`
    background-color: red;
  `,
  icon: css`
    display: block;
  `,
  email: css`
    text-decoration: none;
    line-height: 1;
  `,
};
