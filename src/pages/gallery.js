/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MediaQueries } from "@/styles/mixins/MediaQueries";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { motion, useMotionValue, useAnimationFrame } from "motion/react";

const mockData = [
  {
    urls: ["/assets/imgs/1.jpg", "/assets/imgs/2.jpg"],
  },
  {
    urls: ["/assets/imgs/3.jpg", "/assets/imgs/4.jpg"],
  },
  {
    urls: ["/assets/imgs/5.jpg", "/assets/imgs/6.jpg"],
  },
  {
    urls: ["/assets/imgs/7.jpg", "/assets/imgs/8.jpg"],
  },
  {
    urls: ["/assets/imgs/9.jpg", "/assets/imgs/10.jpg"],
  },
  {
    urls: ["/assets/imgs/11.jpg", "/assets/imgs/12.jpg"],
  },
  {
    urls: ["/assets/imgs/13.jpg", "/assets/imgs/14.jpg"],
  },
  {
    urls: ["/assets/imgs/15.jpg", "/assets/imgs/16.jpg"],
  },
  {
    urls: ["/assets/imgs/17.jpg", "/assets/imgs/18.jpg"],
  },
  {
    urls: ["/assets/imgs/19.jpg", "/assets/imgs/20.jpg"],
  },
  {
    urls: ["/assets/imgs/21.jpg", "/assets/imgs/22.jpg"],
  },
];
const ArchivePage = () => {
  const [active, setActive] = useState(0);

  const lenis = useLenis(({ scroll }) => {});

  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const prevLeftsRef = useRef([]);
  const trackWidthRef = useRef(0);
  const cumWidthsRef = useRef([]); // cumulative widths for one logical cycle
  const sliderWidthRef = useRef(0);
  const x = useMotionValue(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const SPEED = 40; // px per second - adjust to taste
  const speedRef = useRef(SPEED);

  const prevScrollRef = useRef(0);
  const lastInteractionRef = useRef(0);
  const autoActiveRef = useRef(true);

  // Mark actual user interaction (not programmatic Lenis updates)
  useEffect(() => {
    const markUser = () => {
      lastInteractionRef.current = performance.now();
      autoActiveRef.current = false;
    };
    const opts = { passive: true };
    window.addEventListener("wheel", markUser, opts);

    return () => {
      window.removeEventListener("wheel", markUser);
    };
  }, []);

  // measure total width of one cycle (original list only) and watch for resizes
  useEffect(() => {
    if (!containerRef.current) return;

    const measure = () => {
      const items = itemRefs.current.slice(0, mockData.length);
      const widths = items.map((el) => el?.offsetWidth || 0);
      const total = widths.reduce((acc, w) => acc + w, 0);
      if (total > 0) {
        trackWidthRef.current = total;
        // build cumulative boundaries: [w0, w0+w1, ...]
        const cum = new Array(widths.length);
        let run = 0;
        for (let i = 0; i < widths.length; i++) {
          run += widths[i];
          cum[i] = run;
        }
        cumWidthsRef.current = cum;
      }

      if (containerRef.current) {
        sliderWidthRef.current = containerRef.current.offsetWidth;
        setSliderWidth(sliderWidthRef.current);
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

  useAnimationFrame((t, delta) => {
    const trackW = trackWidthRef.current;
    if (!trackW) return;

    const now = t || performance.now();
    const prevS = prevScrollRef.current;
    const s = lenis && typeof lenis.scroll === "number" ? lenis.scroll : prevS;

    // If idle for > 1s since *actual user input*, enable auto-scroll
    if (now - lastInteractionRef.current > 500) {
      autoActiveRef.current = true;
    }

    // When auto is active, gently advance Lenis so the marquee moves by itself
    if (autoActiveRef.current && lenis) {
      const dx = (speedRef.current * (delta || 0)) / 1000; // px this frame
      // Drive Lenis forward; `immediate: true` keeps motion continuous and light
      lenis.scrollTo(s + dx, { immediate: true });
    }

    // Map lenis.scroll to marquee offset
    const curr = lenis && typeof lenis.scroll === "number" ? lenis.scroll : s;
    const offset = curr % trackW;
    x.set(-offset);

    // Active item via modulo position (no DOM reads)
    const cum = cumWidthsRef.current;
    if (cum && cum.length) {
      let idx = 0;
      while (idx < cum.length && offset >= cum[idx]) idx++;
      if (idx !== active) setActive(idx);
    }

    prevScrollRef.current = curr;
  });

  return (
    <>
      <div css={styles.main} style={{ "--slider-width": `${sliderWidth}px` }}>
        <div css={styles.galleryResult}>
          <div css={styles.pairsLayer}>
            {mockData.map((item, i) => (
              <div
                key={i}
                css={styles.pair}
                style={{ opacity: active === i ? 1 : 0 }}
              >
                <div css={styles.aspectRatio2}>
                  <Image
                    src={item.urls[0]}
                    alt={"alt"}
                    fill
                    priority={active === i}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div css={styles.aspectRatio2}>
                  <Image
                    src={item.urls[1]}
                    alt={"alt"}
                    fill
                    priority={active === i}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.div css={styles.slider} ref={containerRef} style={{ x }}>
        {[...mockData, ...mockData, ...mockData].map((article, idx) => {
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
                  alt={"thumbnail"}
                  fill
                  /* These thumbs render ~160px wide at ~200px tall (4:5). Give the browser the real width. */
                  sizes="(min-width: 1024px) 160px, (min-width: 640px) 140px, 120px"
                  /* Only keep a couple eagerly-loaded above-the-fold items; the rest lazy */
                  priority
                  // loading={"eager"}
                  // fetchPriority={idx < 8 ? "high" : "low"}
                  /* Lower quality is fine for tiny thumbs; Next will serve AVIF/WebP when possible */
                  // quality={50}
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
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
    width: 100%;
    height: var(--slider-width, 100vh);
    /* background-color: red; */
  `,
  galleryResult: css`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100%);
    height: calc(100vh - 12vh);
    display: block; /* stacking handled by inner layer */
  `,
  pairsLayer: css`
    position: relative;
    width: 100%;
    height: 100%;
  `,
  pair: css`
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    /* transition: opacity 300ms ease; */
    will-change: opacity;
    pointer-events: none; /* only the active visuals are shown */

    @media ${MediaQueries.mobile} {
      flex-direction: column;
    }
  `,
  slider: css`
    display: flex;
    flex-wrap: nowrap;
    align-items: stretch;
    gap: 0;

    height: 16vh;
    padding-top: var(--gap-xl);
    position: fixed;
    left: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 100; /* above content; adjust if needed */
    will-change: transform;

    @media ${MediaQueries.mobile} {
      height: 12vh;
    }
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
    aspect-ratio: 10 / 16;
    flex: 1 1 0;
  `,
  aspectRatio2: css`
    position: relative;
    height: 100%;
    width: auto;
    aspect-ratio: 10 / 16;
    flex: 1 1 0;
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
