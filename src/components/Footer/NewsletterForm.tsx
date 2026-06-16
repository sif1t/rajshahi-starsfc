"use client";

import styles from "./Footer.module.css";

export default function NewsletterForm() {
  return (
    <div className={styles.newsletter}>
      <h4 className={styles.newsletterTitle}>Stay Updated</h4>
      <form
        className={styles.newsletterForm}
        onSubmit={(e) => e.preventDefault()}
        id="footer-newsletter"
      >
        <input
          type="email"
          placeholder="Your email address"
          className={styles.emailInput}
          id="newsletter-email"
          aria-label="Email for newsletter"
        />
        <button type="submit" className={styles.subscribeBtn} id="newsletter-submit">
          Subscribe
        </button>
      </form>
    </div>
  );
}
