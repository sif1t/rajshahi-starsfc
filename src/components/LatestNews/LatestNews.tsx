import Image from "next/image";
import styles from "./LatestNews.module.css";

const newsItems = [
  {
    id: 1,
    category: "Championship",
    title: "Rajshahi Stars FC crowned SAFF Women's Futsal Champions 2026",
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

function NewsCard({
  item,
  variant = "regular",
}: {
  item: (typeof newsItems)[0];
  variant?: "featured" | "side" | "regular";
}) {
  return (
    <article
      className={`${styles.newsCard} ${styles[`card${variant.charAt(0).toUpperCase() + variant.slice(1)}`]}`}
      id={`news-card-${item.id}`}
    >
      <div className={styles.cardImage}>
        <Image
          src={item.fallback}
          alt={item.title}
          fill
          sizes={
            variant === "featured"
              ? "(max-width: 768px) 100vw, 60vw"
              : "(max-width: 768px) 100vw, 40vw"
          }
          style={{ objectFit: "cover" }}
          className={styles.imgEl}
        />
        <div className={styles.cardOverlay} />
        <div className={styles.cardContent}>
          <span className={styles.category}>{item.category}</span>
          <h3 className={styles.cardTitle}>{item.title}</h3>
          <div className={styles.cardMeta}>
            <span className={styles.cardDate}>{item.date}</span>
            <span className={styles.cardAuthor}>By {item.author}</span>
          </div>
        </div>
        <div className={styles.hoverArrow} aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </article>
  );
}

export default function LatestNews() {
  const featured = newsItems[0];
  const side = newsItems.slice(1, 3);
  const small = newsItems.slice(3);

  return (
    <section className={styles.newsSection} id="news" aria-label="Latest News">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.sectionHeader}>
          <div>
            <p className="section-tag">Latest from the club</p>
            <h2 className="section-title">
              Latest <span>News</span>
            </h2>
          </div>
          <a href="#" className={styles.viewAllBtn} id="news-view-all">
            View All News
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Mosaic Grid */}
        <div className={styles.mosaicGrid}>
          {/* Featured large card */}
          <div className={styles.featuredArea}>
            <NewsCard item={featured} variant="featured" />
          </div>

          {/* Two side cards stacked */}
          <div className={styles.sideArea}>
            {side.map((item) => (
              <NewsCard key={item.id} item={item} variant="side" />
            ))}
          </div>
        </div>

        {/* Small 3-column row */}
        <div className={styles.smallGrid}>
          {small.map((item) => (
            <NewsCard key={item.id} item={item} variant="regular" />
          ))}
        </div>
      </div>
    </section>
  );
}
