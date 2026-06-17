"use client";

import { useState, useCallback, useEffect } from "react";
import styles from "./LatestNews.module.css";
import FocusedCard from "./FocusedCard";
import NewsGalleryModal from "./NewsGalleryModal";

export const newsItems = [
  {
    id: 1,
    category: "Championship",
    title: "Rajshahi Stars FC crowned Women's Football League (WFL) Champions 2026",
    date: "15 Jun 2026",
    author: "Club Media",
    image: "/images/news/news-1.jpg",
    featured: true,
    fallback: "/images/news/news-1.jpg",
  },
  {
    id: 2,
    category: "Squad",
    title: "Rise Strong: The team that refused to give up",
    date: "12 Jun 2026",
    author: "Club Media",
    image: "/images/news/news-2.jpg",
    fallback: "/images/news/news-2.jpg",
  },
  {
    id: 3,
    category: "Match Report",
    title: "Fight Till Glory: Stars win 3–1 in the final",
    date: "10 Jun 2026",
    author: "Press Team",
    image: "/images/news/news-5.jpg",
    fallback: "/images/news/news-5.jpg",
  },
  {
    id: 4,
    category: "Squad Update",
    title: "Full squad photo session for 2025–26 season revealed",
    date: "8 Jun 2026",
    author: "Club Media",
    image: "/images/news/news-3.png",
    fallback: "/images/news/news-3.png",
  },
  {
    id: 5,
    category: "Club News",
    title: "Stars FC announce new kit deal with leading sportswear brand",
    date: "5 Jun 2026",
    author: "Press Team",
    image: "/images/news/news-4.jpg",
    fallback: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&q=80",
  },
  {
    id: 6,
    category: "Community",
    title: "Stars FC grassroots program reaches 500 young girls in Rajshahi",
    date: "2 Jun 2026",
    author: "Community Team",
    image: "/images/news/news-6.jpg",
    fallback: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=600&q=80",
  },
];

export default function LatestNews() {
  const [focusedId, setFocusedId] = useState<number | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryStartIndex, setGalleryStartIndex] = useState(0);

  const featured = newsItems[0];
  const side = newsItems.slice(1, 3);
  const small = newsItems.slice(3);

  const handleFocus = useCallback((id: number) => setFocusedId(id), []);
  const handleBlur = useCallback(() => setFocusedId(null), []);

  const openGallery = useCallback((id: number) => {
    const idx = newsItems.findIndex((n) => n.id === id);
    setGalleryStartIndex(idx >= 0 ? idx : 0);
    setFocusedId(null);
    setGalleryOpen(true);
  }, []);

  const openGalleryFromButton = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setGalleryStartIndex(0);
      setFocusedId(null);
      setGalleryOpen(true);
    },
    []
  );

  // Dismiss focus on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && focusedId !== null) setFocusedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focusedId]);

  const isSomethingFocused = focusedId !== null;

  return (
    <>
      <section
        className={styles.newsSection}
        id="news"
        aria-label="Latest News"
        /* Clicking the section backdrop dismisses focus */
        onClick={isSomethingFocused ? handleBlur : undefined}
      >
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.sectionHeader}>
            <div>
              <p className="section-tag">Latest from the club</p>
              <h2 className="section-title">
                Latest <span>News</span>
              </h2>
            </div>
            <button
              onClick={openGalleryFromButton}
              className={`${styles.viewAllBtn} cursor-pointer bg-transparent border-0 p-0`}
              id="news-view-all"
              aria-label="Open full gallery"
            >
              View All News
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Mosaic Grid */}
          <div className={styles.mosaicGrid}>
            {/* Featured large card */}
            <div className={styles.featuredArea}>
              <FocusedCard
                item={featured}
                variant="featured"
                isSomethingFocused={isSomethingFocused}
                isFocused={focusedId === featured.id}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onOpenGallery={openGallery}
              />
            </div>

            {/* Two side cards stacked */}
            <div className={styles.sideArea}>
              {side.map((item) => (
                <FocusedCard
                  key={item.id}
                  item={item}
                  variant="side"
                  isSomethingFocused={isSomethingFocused}
                  isFocused={focusedId === item.id}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onOpenGallery={openGallery}
                />
              ))}
            </div>
          </div>

          {/* Small 3-column row */}
          <div className={styles.smallGrid}>
            {small.map((item) => (
              <FocusedCard
                key={item.id}
                item={item}
                variant="regular"
                isSomethingFocused={isSomethingFocused}
                isFocused={focusedId === item.id}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onOpenGallery={openGallery}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Full-screen Gallery Modal */}
      <NewsGalleryModal
        items={newsItems}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        initialIndex={galleryStartIndex}
      />
    </>
  );
}
