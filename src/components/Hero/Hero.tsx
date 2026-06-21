"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

// Seeded pseudo-random for stable SSR — avoids hydration mismatch
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function fixed(value: number, digits: number) {
  return Number(value.toFixed(digits));
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0 });
  const textRef = useRef<HTMLDivElement>(null);

  // Stable particle positions — same on server and client
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        left: `${fixed(seededRandom(i * 3) * 100, 4)}%`,
        top: `${fixed(seededRandom(i * 3 + 1) * 80, 4)}%`,
        delay: `${fixed(seededRandom(i * 3 + 2) * 4, 3)}s`,
        duration: `${fixed(3 + seededRandom(i * 3 + 3) * 4, 3)}s`,
        size: `${fixed(2 + seededRandom(i * 3 + 4) * 4, 3)}px`,
      })),
    []
  );

  // Next match date
  useEffect(() => {
    const matchDate = new Date("2026-06-25T18:00:00");
    const tick = () => {
      const now = new Date();
      const diff = matchDate.getTime() - now.getTime();
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          mins: Math.floor((diff / (1000 * 60)) % 60),
        });
      }
    };
    tick();
    const interval = setInterval(tick, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.hero} id="home" aria-label="Hero Banner">
      {/* Background Image */}
      <div className={styles.heroBg}>
        <Image
          src="/images/hero-bg.jpg"
          alt="Rajshahi Stars FC — Fight Till Glory"
          fill
          priority
          quality={75}
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center top" }}
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Gradient Overlays */}
      <div className={styles.gradientLeft} />
      <div className={styles.gradientBottom} />
      <div className={styles.gradientTop} />

      {/* Animated star particles */}
      <div className={styles.particles} aria-hidden="true">
        {particles.map((p, i) => (
          <span
            key={i}
            className={styles.particle}
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className={styles.heroContent} ref={textRef}>
        <div className={styles.heroBadge}>
          <span className={styles.liveTag}>⚡ Women&apos;s Football League (WFL)</span>
        </div>

        <h1 className={`${styles.heroTitle} ${loaded ? styles.titleLoaded : ""}`}>
          <span className={styles.titleLine1}>WE ARE</span>
          <span className={styles.titleLine2}>
            RAJSHAHI <span className={styles.titleAccent}>STARS</span>
          </span>
          <span className={styles.titleLine3}>FC</span>
        </h1>

        <p className={`${styles.heroSub} ${loaded ? styles.subLoaded : ""}`}>
          Bangladesh&apos;s most passionate women&apos;s football club. Built on grit, powered by glory.
        </p>

        <div className={`${styles.heroCtas} ${loaded ? styles.ctasLoaded : ""}`}>
          <a href="#matches" className={styles.ctaPrimary} id="hero-buy-tickets">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 10V6a2 2 0 00-2-2H4a2 2 0 00-2 2v4c1.1 0 2 .9 2 2s-.9 2-2 2v4a2 2 0 002 2h16a2 2 0 002-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2z"/>
            </svg>
            Buy Tickets
          </a>
          <a href="#news" className={styles.ctaOutline} id="hero-read-more">
           Latest News
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Countdown */}
        <div className={`${styles.heroCountdown} ${loaded ? styles.countdownLoaded : ""}`}>
          <p className={styles.countdownLabel}>NEXT MATCH IN</p>
          <div className={styles.countdownUnits}>
            <div className={styles.countUnit}>
              <span className={styles.countNum}>{String(countdown.days).padStart(2, "0")}</span>
              <span className={styles.countText}>Days</span>
            </div>
            <span className={styles.countSep}>:</span>
            <div className={styles.countUnit}>
              <span className={styles.countNum}>{String(countdown.hours).padStart(2, "0")}</span>
              <span className={styles.countText}>Hours</span>
            </div>
            <span className={styles.countSep}>:</span>
            <div className={styles.countUnit}>
              <span className={styles.countNum}>{String(countdown.mins).padStart(2, "0")}</span>
              <span className={styles.countText}>Mins</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <div className={styles.scrollLine} />
        <span>Scroll</span>
      </div>
    </section>
  );
}
