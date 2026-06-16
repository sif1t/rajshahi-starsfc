"use client";

import Image from "next/image";
import { useRef } from "react";
import styles from "./Squad.module.css";

const players = [
  { id: 1, name: "Afeida Khandaker", position: "Defender", number: 4, image: "/images/players/Afeida Khandaker.png", caps: 1, goals: 1 },
  { id: 2, name: "Alpi Akter", position: "Midfielder", number: 15, image: "/images/players/Alpi Akter.png", caps: 0, goals: 0 },
  { id: 3, name: "Ritu Porna Chakma", position: "Midfielder", number: 10, image: "/images/players/Ritu Porna Chakma.png", caps: 5, goals: 5 },
  { id: 4, name: "Rupna Chakma", position: "Goalkeeper", number: 1, image: "/images/players/Rupna Chakma.png", caps: 0, goals: 0 },
  { id: 5, name: "Sapna Rani", position: "Midfielder", number: 14, image: "/images/players/Sapna Rani.png", caps: 1, goals: 1 },
  { id: 6, name: "Sauravi Akanda Prity", position: "Forward", number: 20, image: "/images/players/Sauravi Akanda Prity.png", caps: 2, goals: 2 },
  { id: 7, name: "Sheuli Azim", position: "Defender", number: 2, image: "/images/players/Sheuli Azim.png", caps: 0, goals: 0 },
  { id: 8, name: "Trishna Rani", position: "Forward", number: 19, image: "/images/players/Trishna Rani.png", caps: 0, goals: 0 }
];

const positionColors: Record<string, string> = {
  Forward: "#FF6B00",
  Midfielder: "#3B82F6",
  Defender: "#10B981",
  Goalkeeper: "#8B5CF6",
};

export default function Squad() {
  const carouselRef = useRef<HTMLDivElement>(null);
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  const onMouseDown = (e: React.MouseEvent) => {
    isDown = true;
    startX = e.pageX - (carouselRef.current?.offsetLeft ?? 0);
    scrollLeft = carouselRef.current?.scrollLeft ?? 0;
    if (carouselRef.current) carouselRef.current.style.cursor = "grabbing";
  };

  const onMouseLeave = () => {
    isDown = false;
    if (carouselRef.current) carouselRef.current.style.cursor = "grab";
  };

  const onMouseUp = () => {
    isDown = false;
    if (carouselRef.current) carouselRef.current.style.cursor = "grab";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const scroll = (dir: "left" | "right") => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: dir === "right" ? 340 : -340,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.squadSection} id="squad" aria-label="First Team Squad">
      <div className={styles.squadBg} aria-hidden="true" />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.squadHeader}>
          <div>
            <p className="section-tag">2025–26 Season</p>
            <h2 className="section-title">
              The <span>Squad</span>
            </h2>
          </div>
          <div className={styles.carouselControls}>
            <button
              className={styles.controlBtn}
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              id="squad-scroll-left"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <button
              className={styles.controlBtn}
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              id="squad-scroll-right"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          className={styles.carousel}
          ref={carouselRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          role="list"
          aria-label="Player cards"
        >
          {players.map((player) => (
            <div
              key={player.id}
              className={styles.playerCard}
              role="listitem"
              id={`player-card-${player.id}`}
            >
              {/* Jersey Number */}
              <div className={styles.jerseyNum}>{player.number}</div>

              {/* Player Image */}
              <div className={styles.playerImageWrap}>
                <Image
                  src={player.image}
                  alt={player.name}
                  fill
                  sizes="280px"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                  className={styles.playerImg}
                />
                <div className={styles.playerImgOverlay} />
              </div>

              {/* Card Body */}
              <div className={styles.playerInfo}>
                <span
                  className={styles.position}
                  style={{ color: positionColors[player.position] ?? "var(--accent)" }}
                >
                  {player.position}
                </span>
                <h3 className={styles.playerName}>{player.name}</h3>
                <div className={styles.playerStats}>
                  <div className={styles.stat}>
                    <span className={styles.statNum}>{player.caps}</span>
                    <span className={styles.statLabel}>Apps</span>
                  </div>
                  {player.position !== "Goalkeeper" && (
                    <div className={styles.stat}>
                      <span className={styles.statNum}>{player.goals}</span>
                      <span className={styles.statLabel}>Goals</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Hover Glow */}
              <div className={styles.cardGlow} aria-hidden="true" />
            </div>
          ))}
        </div>

        {/* View Full Squad CTA */}
        <div className={styles.squadCta}>
          <a href="#" className="btn-primary" id="squad-view-all">
            View Full Squad
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
