"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type NewsItem = {
  id: number;
  category: string;
  title: string;
  date: string;
  author: string;
  fallback: string;
};

type Props = {
  item: NewsItem;
  variant: "featured" | "side" | "regular";
  isSomethingFocused: boolean;
  isFocused: boolean;
  onFocus: (id: number) => void;
  onBlur: () => void;
  onOpenGallery: (id: number) => void;
};

const cardClass = {
  featured: "cardFeatured",
  side: "cardSide",
  regular: "cardRegular",
};

export default function FocusedCard({
  item,
  variant,
  isSomethingFocused,
  isFocused,
  onFocus,
  onBlur,
  onOpenGallery,
}: Props) {
  const prefersReduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isFocused) {
        onBlur();
      } else {
        onFocus(item.id);
      }
    },
    [isFocused, item.id, onFocus, onBlur]
  );

  return (
    <div
      ref={cardRef}
      className="relative h-full"
      style={{ isolation: "isolate" }}
    >
      {/* Backdrop blur overlay — shown on all non-focused cards */}
      <AnimatePresence>
        {isSomethingFocused && !isFocused && (
          <motion.div
            key="blur-overlay"
            className="absolute inset-0 z-[100] backdrop-blur-md rounded-sm cursor-pointer"
            style={{ background: "rgba(5,10,28,0.55)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(e) => { e.stopPropagation(); onBlur(); }}
          />
        )}
      </AnimatePresence>

      {/* The card itself */}
      <motion.article
        id={`news-card-${item.id}`}
        className="relative h-full overflow-hidden rounded-sm cursor-pointer select-none"
        onClick={handleClick}
        animate={
          prefersReduced
            ? {}
            : isFocused
            ? { scale: 1.045, y: -12, zIndex: 200, boxShadow: "0 32px 80px rgba(0,0,0,0.7)" }
            : isSomethingFocused
            ? { scale: 1, y: 0, zIndex: 1 }
            : { scale: 1, y: 0, zIndex: 1, boxShadow: "none" }
        }
        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        style={{ zIndex: isFocused ? 200 : 1 }}
        whileHover={
          !prefersReduced && !isSomethingFocused
            ? { scale: 1.012, transition: { duration: 0.25 } }
            : {}
        }
        aria-label={`${item.title} — click to focus`}
      >
        {/* Image */}
        <div className="absolute inset-0">
          <Image
            src={item.fallback}
            alt={item.title}
            fill
            sizes={
              variant === "featured"
                ? "(max-width: 768px) 100vw, 60vw"
                : "(max-width: 768px) 100vw, 40vw"
            }
            style={{
              objectFit: "cover",
              transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
              transform: isFocused ? "scale(1.04)" : "scale(1)",
            }}
          />
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: isFocused
              ? "linear-gradient(to top, rgba(10,27,61,0.98) 0%, rgba(10,27,61,0.55) 50%, rgba(10,27,61,0.15) 100%)"
              : "linear-gradient(to top, rgba(10,27,61,0.92) 0%, rgba(10,27,61,0.4) 50%, transparent 100%)",
          }}
        />

        {/* Content */}
        <div
          className="absolute bottom-0 left-0 right-0 p-5 z-10"
          style={{
            transform: isFocused ? "translateY(0)" : "translateY(4px)",
            transition: "transform 0.4s ease",
          }}
        >
          <span className="inline-block bg-[#FF6B00] text-white text-[0.62rem] font-bold tracking-[0.15em] uppercase px-3 py-[3px] rounded-sm mb-2">
            {item.category}
          </span>
          <h3
            className="font-bold text-white leading-tight mb-2"
            style={{
              fontFamily: "var(--font-display)",
              fontSize:
                variant === "featured"
                  ? "clamp(1.1rem, 2vw, 1.6rem)"
                  : "1rem",
            }}
          >
            {item.title}
          </h3>
          <div className="flex items-center gap-3 text-white/60 text-xs">
            <span>{item.date}</span>
            <span>· By {item.author}</span>
          </div>
        </div>

        {/* Focused state: action buttons */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              className="absolute top-4 right-4 z-20 flex gap-2"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="flex items-center gap-2 bg-[#FF6B00] hover:bg-[#FF8C3A] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded transition-all duration-200 shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenGallery(item.id);
                }}
                id={`news-card-${item.id}-view`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                View
              </button>
              <button
                className="w-8 h-8 rounded flex items-center justify-center bg-white/10 hover:bg-white/20 text-white/80 transition-all duration-200 backdrop-blur-sm"
                onClick={(e) => { e.stopPropagation(); onBlur(); }}
                aria-label="Close focus"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover arrow (only when nothing focused) */}
        <AnimatePresence>
          {!isSomethingFocused && (
            <motion.div
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#FF6B00] flex items-center justify-center text-white shadow-lg pointer-events-none"
              initial={{ opacity: 0, scale: 0.7, y: -4 }}
              whileHover={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </motion.article>
    </div>
  );
}
