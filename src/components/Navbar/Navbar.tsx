"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "First Team", href: "#squad" },
  { label: "Matches", href: "#matches" },
  { label: "News", href: "#news" },
  { label: "Club", href: "#club" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <>
      <header
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
        role="banner"
      >
        <div className={styles.navContainer}>
          {/* Logo */}
          <Link href="#home" className={styles.logo} aria-label="Rajshahi Stars FC Home">
            <div className={styles.logoWrapper}>
              <Image
                src="/images/logo.png"
                alt="Rajshahi Stars FC"
                width={56}
                height={56}
                priority
                className={styles.logoImg}
              />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoName}>Rajshahi Stars</span>
              <span className={styles.logoSub}>Football Club</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav} aria-label="Main Navigation">
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`${styles.navLink} ${
                      activeLink === link.label ? styles.active : ""
                    }`}
                    onClick={() => setActiveLink(link.label)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA & Hamburger */}
          <div className={styles.navActions}>
            <a href="#matches" className={styles.ticketBtn} id="nav-buy-tickets">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 10V6a2 2 0 00-2-2H4a2 2 0 00-2 2v4c1.1 0 2 .9 2 2s-.9 2-2 2v4a2 2 0 002 2h16a2 2 0 002-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2z"/>
              </svg>
              Buy Tickets
            </a>
            <button
              className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              id="nav-hamburger"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile Navigation">
          <ul className={styles.mobileNavList}>
            {navLinks.map((link, i) => (
              <li
                key={link.label}
                style={{ animationDelay: `${i * 0.06}s` }}
                className={menuOpen ? styles.mobileItemVisible : ""}
              >
                <a
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={() => {
                    setActiveLink(link.label);
                    setMenuOpen(false);
                  }}
                >
                  <span className={styles.mobileNavNum}>{String(i + 1).padStart(2, "0")}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.mobileFooter}>
          <a href="#matches" className="btn-primary" onClick={() => setMenuOpen(false)}>
            Buy Tickets
          </a>
        </div>
      </div>
    </>
  );
}
