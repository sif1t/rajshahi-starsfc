"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";

type GalleryItem = {
  id: number;
  title: string;
  category: string;
  date: string;
  fallback: string;
};

type Props = {
  items: GalleryItem[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
};

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 16,
    transition: { duration: 0.3 },
  },
};

const thumbnailVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.045, duration: 0.4, ease: EASE_OUT },
  }),
};

export default function NewsGalleryModal({
  items,
  isOpen,
  onClose,
  initialIndex = 0,
}: Props) {
  const [active, setActive] = useState(initialIndex);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (isOpen) setActive(initialIndex);
  }, [isOpen, initialIndex]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setActive((p) => (p + 1) % items.length);
      if (e.key === "ArrowLeft") setActive((p) => (p - 1 + items.length) % items.length);
    },
    [isOpen, onClose, items.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const go = (dir: "prev" | "next") =>
    setActive((p) =>
      dir === "next" ? (p + 1) % items.length : (p - 1 + items.length) % items.length
    );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="gallery-backdrop"
          className="fixed inset-0 z-[9000] flex flex-col"
          variants={prefersReduced ? undefined : backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ background: "rgba(5, 10, 28, 0.97)" }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="News gallery"
        >
          <motion.div
            className="flex flex-col w-full h-full"
            variants={prefersReduced ? undefined : modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ---- HEADER ---- */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-4">
                <span className="text-[#FF6B00] text-xs font-bold tracking-[0.2em] uppercase">
                  Gallery
                </span>
                <span className="text-white/30 text-sm">
                  {active + 1} / {items.length}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => go("prev")}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:border-[#FF6B00] hover:text-[#FF6B00] transition-all duration-200"
                  aria-label="Previous image"
                  id="gallery-prev"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => go("next")}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:border-[#FF6B00] hover:text-[#FF6B00] transition-all duration-200"
                  aria-label="Next image"
                  id="gallery-next"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:border-red-400 hover:text-red-400 transition-all duration-200 ml-2"
                  aria-label="Close gallery"
                  id="gallery-close"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ---- MAIN IMAGE ---- */}
            <div className="flex-1 flex items-center justify-center p-4 md:p-8 min-h-0 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className="relative w-full h-full max-w-5xl"
                  initial={prefersReduced ? {} : { opacity: 0, scale: 0.96, x: 30 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={prefersReduced ? {} : { opacity: 0, scale: 0.96, x: -30 }}
                  transition={{ duration: 0.38, ease: EASE_OUT }}
                >
                  <div
                    className="relative w-full h-full rounded-lg overflow-hidden"
                    style={{ aspectRatio: "16/9" }}
                  >
                    <Image
                      src={items[active].fallback}
                      alt={items[active].title}
                      fill
                      sizes="(max-width: 768px) 100vw, 90vw"
                      style={{ objectFit: "cover" }}
                      priority
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <span className="inline-block bg-[#FF6B00] text-white text-xs font-bold tracking-widest uppercase px-3 py-1 rounded mb-2">
                        {items[active].category}
                      </span>
                      <h3 className="text-white font-bold text-lg md:text-xl leading-tight">
                        {items[active].title}
                      </h3>
                      <p className="text-white/50 text-sm mt-1">{items[active].date}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Side arrow buttons */}
              <button
                onClick={(e) => { e.stopPropagation(); go("prev"); }}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white hover:bg-[#FF6B00]/80 hover:border-[#FF6B00] transition-all duration-200 backdrop-blur-sm"
                aria-label="Previous"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); go("next"); }}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white hover:bg-[#FF6B00]/80 hover:border-[#FF6B00] transition-all duration-200 backdrop-blur-sm"
                aria-label="Next"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* ---- THUMBNAILS ---- */}
            <div className="flex-shrink-0 px-6 pb-5 pt-3 border-t border-white/10">
              <div className="flex gap-3 overflow-x-auto pb-1 justify-center flex-wrap md:flex-nowrap">
                {items.map((item, i) => (
                  <motion.button
                    key={item.id}
                    custom={i}
                    variants={prefersReduced ? undefined : thumbnailVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={(e) => { e.stopPropagation(); setActive(i); }}
                    className={`relative flex-shrink-0 rounded overflow-hidden transition-all duration-300 ${
                      i === active
                        ? "ring-2 ring-[#FF6B00] ring-offset-2 ring-offset-[#050a1c] opacity-100 scale-105"
                        : "opacity-50 hover:opacity-80 hover:scale-105"
                    }`}
                    style={{ width: 90, height: 58 }}
                    aria-label={`View ${item.title}`}
                    id={`gallery-thumb-${item.id}`}
                  >
                    <Image
                      src={item.fallback}
                      alt={item.title}
                      fill
                      sizes="90px"
                      style={{ objectFit: "cover" }}
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
