/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MediaQueries } from "@/styles/mixins/MediaQueries";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { motion, useMotionValue, useAnimationFrame } from "motion/react";

const mockData = [
  {
    urls: ["/assets/imgs/11.jpg", "/assets/imgs/12.jpg"],
  },
  {
    urls: ["/assets/imgs/11.jpg", "/assets/imgs/12.jpg"],
  },
  {
    urls: ["/assets/imgs/11.jpg", "/assets/imgs/12.jpg"],
  },
  {
    urls: ["/assets/imgs/12.jpg", "/assets/imgs/11.jpg"],
  },
  {
    urls: ["/assets/imgs/11.jpg", "/assets/imgs/12.jpg"],
  },
  {
    urls: ["/assets/imgs/11.jpg", "/assets/imgs/12.jpg"],
  },
  {
    urls: ["/assets/imgs/11.jpg", "/assets/imgs/12.jpg"],
  },
  {
    urls: ["/assets/imgs/12.jpg", "/assets/imgs/11.jpg"],
  },
  {
    urls: ["/assets/imgs/11.jpg", "/assets/imgs/12.jpg"],
  },
  {
    urls: ["/assets/imgs/11.jpg", "/assets/imgs/12.jpg"],
  },
  {
    urls: ["/assets/imgs/12.jpg", "/assets/imgs/11.jpg"],
  },
  {
    urls: ["/assets/imgs/11.jpg", "/assets/imgs/12.jpg"],
  },
];
const ArchivePage = () => {
  const [active, setActive] = useState(0);

  const lenis = useLenis(({ scroll }) => {});

  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const prevLeftsRef = useRef([]);
  const trackWidthRef = useRef(0);
  const x = useMotionValue(0);
  const SPEED = 60; // px per second - adjust to taste

  // measure total width of one cycle (original list only) and watch for resizes
  useEffect(() => {
    if (!containerRef.current) return;

    const measure = () => {
      const items = itemRefs.current.slice(0, mockData.length);
      const total = items.reduce((acc, el) => acc + (el?.offsetWidth || 0), 0);
      if (total > 0) {
        trackWidthRef.current = total;
      }
    };

    measure();

    const ro = new ResizeObserver(() => measure());
    itemRefs.current
      .slice(0, mockData.length)
      .forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // animation loop: move left, wrap, and detect crossings
  useAnimationFrame((t, delta) => {
    const dx = (SPEED * delta) / 1000;
    let nx = x.get() - dx;

    const trackW = trackWidthRef.current;
    if (trackW > 0 && nx <= -trackW) {
      nx += trackW; // wrap seamlessly
    }
    x.set(nx);

    // detect when an item starts overlapping the viewport's left edge (x=0)
    for (let i = 0; i < mockData.length; i++) {
      const el = itemRefs.current[i];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const left = rect.left; // relative to viewport
      const prevLeft = prevLeftsRef.current[i] ?? left;

      if (prevLeft >= 0 && left < 0) {
        setActive(i);
      }
      prevLeftsRef.current[i] = left;
    }
  });

  return (
    <>
      <div css={styles.main}>
        <Image
          src={mockData[active].urls[0]}
          alt={"alt"}
          fill
          sizes={"100vw"}
          style={{ objectFit: "cover" }}
        />
        <Image
          src={mockData[active].urls[1]}
          alt={"alt"}
          fill
          sizes={"100vw"}
          style={{ objectFit: "cover" }}
        />
      </div>

      <motion.div css={styles.slider} ref={containerRef} style={{ x }}>
        {[...mockData, ...mockData].map((article, idx) => {
          const baseIndex = idx % mockData.length;
          return (
            <article
              key={idx}
              css={styles.card}
              ref={(el) => {
                if (idx < mockData.length) itemRefs.current[baseIndex] = el; // measure only first cycle
              }}
            >
              <div css={styles.aspectRatio}>
                <Image
                  src={article.urls[0]}
                  alt={"alt"}
                  fill
                  sizes={"100vw"}
                  priority={idx < 6}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </article>
          );
        })}
      </motion.div>
    </>
  );
};

export default ArchivePage;

const styles = {
  body: css`
    width: 50%;
    opacity: 1;
    /* transform: translateX(var(--gap-l)); */
    /* padding-top: var(--gap-s); */

    /* user-select: none; */
    position: relative;
    z-index: 1;
    color: rgba(255, 255, 255, 0.6);
    @media ${MediaQueries.mobile} {
      transform: none;
      padding-top: 0;
      width: 100%;
    }
  `,

  main: css`
    display: flex;
    width: 100%;
  `,
  slider: css`
    display: flex;
    flex-wrap: nowrap;
    align-items: stretch;
    gap: 0;

    height: 20vh;
    padding-top: var(--gap-xl);
    position: fixed;
    left: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: hidden;
    z-index: 100; /* above content; adjust if needed */
    will-change: transform;
  `,
  card: css`
    background: #cccccc;
    height: 100%;
    display: block;
    flex: 0 0 auto;
  `,
  aspectRatio: css`
    position: relative;
    height: 100%;
    width: auto;
    aspect-ratio: 4 / 5;
  `,
  content: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  year: css`
    font-style: italic;
  `,
};
