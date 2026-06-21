import Image from "next/image";
import styles from "./Footer.module.css";
import NewsletterForm from "./NewsletterForm";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "First Team", href: "#squad" },
  { label: "Match Center", href: "#matches" },
  { label: "Latest News", href: "#news" },
  { label: "Club History", href: "#club" },
  { label: "Contact Us", href: "/contact" },
  { label: "Shop", href: "/shop" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
      </svg>
    ),
  },
  {
    name: "Twitter/X",
    href: "https://twitter.com",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

const sponsors = [
  { name: "Nabil Group", logo: null },
  { name: "Star News", logo: null },
  { name: "Pirtex", logo: null },
  { name: "BFF", logo: null },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="contact" role="contentinfo">
      {/* Top Section */}
      <div className={styles.footerTop}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            {/* Brand Column */}
            <div className={styles.brandCol}>
              <div className={styles.footerLogo}>
                <div className={styles.logoImg}>
                  <Image
                    src="/images/logo.png"
                    alt="Rajshahi Stars FC"
                    width={72}
                    height={72}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div>
                  <div className={styles.footerLogoName}>Rajshahi Stars FC</div>
                  <div className={styles.footerLogoSub}>Est. 2018 · Rajshahi, Bangladesh</div>
                </div>
              </div>
              <p className={styles.brandDesc}>
                Rajshahi Stars FC is Bangladesh&apos;s premier women&apos;s football club, committed to excellence, community, and the beautiful game. Champions of the Women&apos;s Football League (WFL) 2026.
              </p>
              <div className={styles.socialLinks}>
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    className={styles.socialLink}
                    aria-label={s.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`footer-social-${s.name.toLowerCase().replace("/", "-")}`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.linksCol}>
              <h3 className={styles.colTitle}>Quick Links</h3>
              <ul className={styles.linksList}>
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={styles.footerLink}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className={styles.contactCol}>
              <h3 className={styles.colTitle}>Contact</h3>
              <ul className={styles.contactList}>
                <li className={styles.contactItem}>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span>NGI House, 23-24, Tejgaon Industrial Area, Dhaka, Bangladesh, 1208</span>
                </li>
                <li className={styles.contactItem}>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <a href="mailto:info@rajshahistarfsfc.com" className={styles.contactLink}>
                    rajshahiwarriors.bpl@gmail.com
                  </a>
                </li>
              </ul>

              {/* Newsletter */}
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>

      {/* Sponsors Bar */}
      <div className={styles.sponsorsBar}>
        <div className={styles.container}>
          <span className={styles.sponsorsLabel}>Our Partners</span>
          <div className={styles.sponsorsList}>
            {sponsors.map((s) => (
              <div key={s.name} className={styles.sponsorItem}>
                <span className={styles.sponsorName}>{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.footerBottom}>
        <div className={styles.container}>
          <div className={styles.bottomRow}>
            <p className={styles.copyright}>
              &copy; {year} Rajshahi Stars FC. All rights reserved.
            </p>
            <div className={styles.legalLinks}>
              <a href="#" className={styles.legalLink}>Privacy Policy</a>
              <span className={styles.legalDot}>·</span>
              <a href="#" className={styles.legalLink}>Terms of Use</a>
              <span className={styles.legalDot}>·</span>
              <a href="#" className={styles.legalLink}>Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
