/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MediaQueries } from "@/styles/mixins/MediaQueries";
import Image from "next/image";
import { useGlobalData } from "@/context/globalContext";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { AnimatePresence, motion } from "motion/react";

import { client } from "@/sanity/client";
import { galleryQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";

const ArchivePage = ({ gallery }) => {
  const { setSelectedNavItem } = useGlobalData();

  const isMobile = useMediaQuery(MediaQueries.mobile);
  const [lightboxSrc, setLightboxSrc] = useState(null);

  useEffect(() => {
    setSelectedNavItem("/gallery");
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    if (lightboxSrc) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [lightboxSrc, isMobile]);

  // Use Sanity data: gallery.imagePairs is already an ordered list of pairs
  const pairs = (gallery?.imagePairs || []).map((pair) => [
    pair.image1,
    pair.image2,
  ]);

  return (
    <>
      <div css={styles.stack}>
        {pairs.map((pair, pIdx) => (
          <section key={pIdx} css={styles.screen}>
            <div css={styles.pair}>
              {pair.map((img, idx) => {
                if (!img?.asset?._id) return null;
                const url = urlFor(img).width(1200).format("webp").url();
                const lightboxUrl = urlFor(img).format("webp").url();
                const alt = img?.alt || `image-${pIdx * 2 + idx}`;
                const lqip = img?.asset?.metadata?.lqip || undefined;
                return (
                  <article key={`${pIdx}-${idx}`} css={styles.card}>
                    <div
                      css={[styles.aspectRatio, isMobile && styles.clickable]}
                      onClick={isMobile ? () => setLightboxSrc(lightboxUrl) : undefined}
                      role={isMobile ? "button" : undefined}
                      aria-label={isMobile ? "Open image" : undefined}
                    >
                      <Image
                        src={url}
                        alt={alt}
                        fill
                        style={{ objectFit: "cover" }}
                        placeholder={lqip ? "blur" : undefined}
                        blurDataURL={lqip}
                        sizes="(max-width: 768px) 70vw, 50vw"
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
      {/* Mobile Lightbox */}
      <AnimatePresence>
        {isMobile && lightboxSrc && (
          <motion.div
            key="lb-overlay"
            css={styles.lbOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.17, 0.67, 0.83, 0.67] }}
            onClick={() => setLightboxSrc(null)}
          >
            <motion.div
              key="lb-content"
              css={styles.lbContent}
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div css={styles.lbImageWrap}>
                <Image
                  src={lightboxSrc}
                  alt="Expanded image"
                  fill
                  style={{ objectFit: "contain", objectPosition: "center" }}
                  priority
                  onClick={() => setLightboxSrc(null)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export async function getStaticProps() {
  try {
    const data = await client.fetch(galleryQuery);
    return {
      props: {
        gallery: data ?? null,
      },
      revalidate: 60, // ISR: rebuild at most once per minute
    };
  } catch (e) {
    return {
      props: { gallery: null },
      revalidate: 60,
    };
  }
}

export default ArchivePage;

const styles = {
  stack: css`
    margin-top: 80px;
    position: relative;
    height: auto; /* fill the screen */
    width: 100%;
    overflow-y: auto; /* internal scroll */
    background: transparent;

    @media ${MediaQueries.mobile} {
      margin-top: 0;
    }
  `,
  screen: css`
    height: 100vh;
    min-height: 100%; /* each section fills the viewport height */
    display: flex;
    align-items: center; /* vertical center */
    justify-content: center; /* horizontal center */
    scroll-snap-align: start;
    padding: var(--gap-m) 0 0 0;
    /* background-color: red; */
  `,
  pair: css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--gap-m);
    height: 100%;
    width: 100%;

    @media ${MediaQueries.mobile} {
      gap: var(--gap-s);
      height: auto;
    }
  `,
  grid: css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    width: 100%;
    max-width: 100%;
    padding-top: 0rem;
    position: relative;
    z-index: 1;

    * {
      text-transform: uppercase;
      font-size: var(--type--scale---2);
      line-height: var(--type--lineheight--1);
      color: rgba(255, 255, 255, 0.8);
    }

    @media ${MediaQueries.mobile} {
      gap: 0.5rem;
      /* grid-template-columns: 1fr; */
      /* padding-top: 6rem; */
      margin-left: calc(var(--gap-l) * -1);
      margin-right: calc(var(--gap-l) * -1);
      max-width: 100vw;
      width: 100vw !important;
    }
  `,
  card: css`
    position: relative;
    background: transparent;
    display: flex;
    flex-direction: column;
    gap: var(--gap-s);
    min-width: 0;
    /* Size each card so two fit within viewport width on desktop */
    width: 50%;
    height: 100%;

    @media ${MediaQueries.mobile} {
      width: 70vw;
    }
  `,
  aspectRatio: css`
    position: relative;
    width: 100%;
    height: auto;
    aspect-ratio: 3 / 4;
    overflow: hidden;
  `,
  content: css`
    position: relative;

    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    h2 {
      max-width: 24rem; /* cap but allow smaller columns */
      width: 100%;
      overflow-wrap: anywhere; /* safe wrap if needed */
    }
  `,
  size: css`
    font-style: italic;
  `,
  clickable: css`
    cursor: zoom-in;
  `,
  lbOverlay: css`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  lbContent: css`
    position: relative;
    width: 90vw;
    max-width: 100vw;
    height: 80vh;
    max-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  `,
  lbImageWrap: css`
    position: relative;
    width: 100%;
    height: 100%;
  `,
};
