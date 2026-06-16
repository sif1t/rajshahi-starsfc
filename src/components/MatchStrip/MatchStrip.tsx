"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./MatchStrip.module.css";

const fixtures = [
  { home: "Rajshahi Stars FC", away: "Dhaka FC", date: "25 Jun 2026", time: "18:00", competition: "BFF Women's League", venue: "Birshreshtha Shaheed Mostafa Kamal Stadium" },
  { home: "Chittagong Women FC", away: "Rajshahi Stars FC", date: "2 Jul 2026", time: "16:00", competition: "BFF Women's League", venue: "Chittagong Stadium" },
  { home: "Rajshahi Stars FC", away: "Sylhet Queens", date: "9 Jul 2026", time: "18:00", competition: "BFF Women's League", venue: "Rajshahi Stadium" },
];

const latestResult = {
  home: "Rajshahi Stars FC",
  homeLogo: "/images/logo.png",
  homeScore: 3,
  away: "Mymensingh FC",
  awayScore: 1,
  competition: "SAFF Women's Futsal Championship 2026 · Final",
  date: "15 Jun 2026",
};

export default function MatchStrip() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const marqueeRef = useRef<HTMLDivElement>(null);

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
          secs: Math.floor((diff / 1000) % 60),
        });
      }
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className={styles.matchSection} id="matches" aria-label="Match Center">
      <div className={styles.matchInner}>
        {/* Latest Result */}
        <div className={styles.resultBlock}>
          <div className={styles.resultMeta}>
            <span className={styles.resultLabel}>LATEST RESULT</span>
            <span className={styles.resultComp}>{latestResult.competition}</span>
          </div>
          <div className={styles.scoreRow}>
            <div className={styles.teamBlock}>
              <span className={styles.teamName}>{latestResult.home}</span>
            </div>
            <div className={styles.scoreBox}>
              <span className={styles.scoreNum}>{latestResult.homeScore}</span>
              <span className={styles.scoreDash}>–</span>
              <span className={styles.scoreNum}>{latestResult.awayScore}</span>
            </div>
            <div className={styles.teamBlock}>
              <span className={styles.teamName}>{latestResult.away}</span>
            </div>
          </div>
          <div className={styles.resultDate}>{latestResult.date}</div>
        </div>

        {/* Divider */}
        <div className={styles.divider} aria-hidden="true" />

        {/* Next Match */}
        <div className={styles.nextMatchBlock}>
          <div className={styles.nextLabel}>NEXT MATCH</div>
          <div className={styles.nextInfo}>
            <span className={styles.nextComp}>{fixtures[0].competition}</span>
            <div className={styles.nextTeams}>
              <span>{fixtures[0].home}</span>
              <span className={styles.vsTag}>VS</span>
              <span>{fixtures[0].away}</span>
            </div>
            <span className={styles.nextVenue}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              {fixtures[0].venue}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} aria-hidden="true" />

        {/* Countdown */}
        <div className={styles.countdownBlock}>
          <div className={styles.countdownLabel}>KICKOFF IN</div>
          <div className={styles.countdownRow}>
            <div className={styles.countUnit}>
              <span className={styles.countNum}>{pad(countdown.days)}</span>
              <span className={styles.countText}>D</span>
            </div>
            <span className={styles.sep}>:</span>
            <div className={styles.countUnit}>
              <span className={styles.countNum}>{pad(countdown.hours)}</span>
              <span className={styles.countText}>H</span>
            </div>
            <span className={styles.sep}>:</span>
            <div className={styles.countUnit}>
              <span className={styles.countNum}>{pad(countdown.mins)}</span>
              <span className={styles.countText}>M</span>
            </div>
            <span className={styles.sep}>:</span>
            <div className={styles.countUnit}>
              <span className={styles.countNum}>{pad(countdown.secs)}</span>
              <span className={styles.countText}>S</span>
            </div>
          </div>
          <a href="#" className={styles.ticketLink} id="matchstrip-buy-tickets">
            Buy Tickets
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 10V6a2 2 0 00-2-2H4a2 2 0 00-2 2v4c1.1 0 2 .9 2 2s-.9 2-2 2v4a2 2 0 002 2h16a2 2 0 002-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Fixtures Marquee */}
      <div className={styles.marqueeBar} aria-hidden="true">
        <div className={styles.marqueeTrack} ref={marqueeRef}>
          {[...fixtures, ...fixtures].map((f, i) => (
            <span key={i} className={styles.marqueeItem}>
              <span className={styles.marqueeComp}>{f.competition}</span>
              <strong>{f.home}</strong>
              <span className={styles.marqueeVs}>vs</span>
              <strong>{f.away}</strong>
              <span className={styles.marqueeDate}>{f.date} · {f.time}</span>
              <span className={styles.marqueeDot}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
