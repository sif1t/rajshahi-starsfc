"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Stats.module.css";

const stats = [
  { value: 87, suffix: "%", label: "Win Rate", icon: "🏆" },
  { value: 156, suffix: "+", label: "Goals Scored", icon: "⚽" },
  { value: 12, suffix: "", label: "Trophies Won", icon: "🥇" },
  { value: 25, suffix: "+", label: "Players in Squad", icon: "👟" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 2000;
          const steps = 60;
          const step = value / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += step;
            if (current >= value) {
              setCount(value);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className={styles.statsSection} aria-label="Club Statistics" id="club">
      <div className={styles.statsBg} aria-hidden="true">
        <div className={styles.statsLine} />
        <div className={styles.statsLine} />
        <div className={styles.statsLine} />
      </div>

      <div className={styles.container}>
        <div className={styles.statsHeader}>
          <p className="section-tag">By the numbers</p>
          <h2 className="section-title">
            Club <span>Legacy</span>
          </h2>
        </div>

        <div className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <div key={i} className={styles.statCard} id={`stat-card-${i}`}>
              <div className={styles.statIcon}>{stat.icon}</div>
              <div className={styles.statValue}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statBarWrap}>
                <div className={styles.statBar} style={{ "--width": `${Math.min(stat.value, 100)}%` } as React.CSSProperties} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
