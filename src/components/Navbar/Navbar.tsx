"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import styles from "./Navbar.module.css";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "First Team", href: "/#squad" },
  { label: "Matches", href: "/#matches" },
  { label: "News", href: "/#news" },
  { label: "Club", href: "/#club" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
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
          <Link href="/" className={styles.logo} aria-label="Rajshahi Stars FC Home">
            <div className={styles.logoWrapper}>
              <Image
                src="/images/logo.png"
                alt="Rajshahi Stars FC"
                width={56}
                height={56}
                priority
                className={`${styles.logoImg} cursor-pointer`}
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
                  <Link
                    href={link.href}
                    className={`${styles.navLink} ${
                      activeLink === link.label ? styles.active : ""
                    }`}
                    onClick={() => setActiveLink(link.label)}
                  >
                    {link.label}
                  </Link>
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
            <NavAuthButton />
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
                <Link
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={() => {
                    setActiveLink(link.label);
                    setMenuOpen(false);
                  }}
                >
                  <span className={styles.mobileNavNum}>{String(i + 1).padStart(2, "0")}</span>
                  {link.label}
                </Link>
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

/* ─── Auth button shown in the Navbar ─────────────── */
function NavAuthButton() {
  const { data: session, status } = useSession();
  const [dropOpen, setDropOpen] = useState(false);

  if (status === "loading") return null;

  if (session?.user) {
    return (
      <div className="relative hidden md:block">
        <button
          onClick={() => setDropOpen(!dropOpen)}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full pl-1 pr-3 py-1 transition-all duration-200"
        >
          {session.user.image ? (
            <Image src={session.user.image} alt={session.user.name ?? ""} width={28} height={28} className="rounded-full" />
          ) : (
            <div className="w-7 h-7 rounded-full bg-[#FF5A00] flex items-center justify-center text-white text-xs font-bold">
              {session.user.name?.[0]?.toUpperCase()}
            </div>
          )}
          <span className="text-white text-xs font-semibold max-w-[80px] truncate">{session.user.name}</span>
        </button>
        {dropOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-[#0C1527] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
            <Link href="/auth" className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors" onClick={() => setDropOpen(false)}>My Account</Link>
            <button
              onClick={() => { setDropOpen(false); signOut({ callbackUrl: "/" }); }}
              className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href="/auth"
      className="hidden md:flex items-center gap-1.5 text-white/70 hover:text-white border border-white/20 hover:border-[#FF5A00] text-xs font-bold tracking-widest uppercase rounded-full px-4 py-2 transition-all duration-200"
    >
      Sign In
    </Link>
  );
}
