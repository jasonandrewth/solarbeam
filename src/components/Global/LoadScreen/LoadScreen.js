/** @jsxImportSource @emotion/react */
import LilGuy from "@/Icons/LilGuy";
import { css } from "@emotion/react";
import { MediaQueries } from "@/styles/mixins/MediaQueries";
import { motion, AnimatePresence } from "motion/react";

const blinkVariants = {
  animate: {
    opacity: [1, 0, 1, 0, 1],
    transition: {
      duration: 0.7,
      times: [0, 0.3, 0.45, 0.7, 0.85],
      ease: "linear",
      delay: 0.1,
    },
  },
};

const LoadScreen = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          css={styles.screen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <motion.div variants={blinkVariants} animate="animate">
            <LilGuy css={styles.mascot} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadScreen;

const styles = {
  screen: css`
    position: fixed;
    inset: 0;
    z-index: 9999;
    background-color: var(--color--white);
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  mascot: css`
    width: auto;
    height: 128px;

    @media ${MediaQueries.mobile} {
      height: 64px;
    }
  `,
};
