"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

/* ─── Animation variants ────────────────────────── */
const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE, delay: d },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  show: (d = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: EASE, delay: d },
  }),
};

const fadeRight = {
  hidden: { opacity: 0, x: 32 },
  show: (d = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: EASE, delay: d },
  }),
};

/* ─── Contact info data ──────────────────────────── */
const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
    label: "Stadium / Office",
    value: "Rajshahi Stadium Complex\nRajshahi Division, Bangladesh",
    href: "https://maps.google.com",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
    label: "Support Email",
    value: "info@rajshahistarsfc.com",
    href: "mailto:info@rajshahistarsfc.com",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </svg>
    ),
    label: "Phone Number",
    value: "+880 123 456 789",
    href: "tel:+880123456789",
  },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
      </svg>
    ),
  },
  {
    name: "Twitter/X",
    href: "https://twitter.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const subjects = [
  "General Inquiry",
  "Match & Ticket Information",
  "Partnership & Sponsorship",
  "Media & Press",
  "Youth Academy",
  "Other",
];

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormStatus = "idle" | "sending" | "success" | "error";

/* ─── Reusable input component ───────────────────── */
function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  autoComplete?: string;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        autoComplete={autoComplete}
        className={[
          "w-full bg-[#0f2045] border rounded-lg px-4 pt-6 pb-2 text-white text-sm",
          "outline-none transition-all duration-250 peer placeholder-transparent",
          focused
            ? "border-[#FF6B00] ring-2 ring-[#FF6B00]/30 shadow-[0_0_0_4px_rgba(255,107,0,0.12)]"
            : "border-white/10 hover:border-white/25",
        ].join(" ")}
        placeholder=" "
        aria-label={label}
      />
      <label
        htmlFor={id}
        className={[
          "absolute left-4 pointer-events-none transition-all duration-200 select-none",
          lifted
            ? "top-2 text-[0.68rem] font-semibold tracking-wider uppercase"
            : "top-1/2 -translate-y-1/2 text-sm",
          focused ? "text-[#FF6B00]" : "text-white/40",
        ].join(" ")}
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({
  id,
  label,
  value,
  onChange,
  required,
  rows = 5,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="relative">
      <textarea
        id={id}
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className={[
          "w-full bg-[#0f2045] border rounded-lg px-4 pt-7 pb-3 text-white text-sm resize-none",
          "outline-none transition-all duration-250 placeholder-transparent",
          focused
            ? "border-[#FF6B00] ring-2 ring-[#FF6B00]/30 shadow-[0_0_0_4px_rgba(255,107,0,0.12)]"
            : "border-white/10 hover:border-white/25",
        ].join(" ")}
        placeholder=" "
        aria-label={label}
      />
      <label
        htmlFor={id}
        className={[
          "absolute left-4 pointer-events-none transition-all duration-200 select-none",
          lifted
            ? "top-2 text-[0.68rem] font-semibold tracking-wider uppercase"
            : "top-4 text-sm",
          focused ? "text-[#FF6B00]" : "text-white/40",
        ].join(" ")}
      >
        {label}
      </label>
    </div>
  );
}

function FloatingSelect({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={[
          "w-full bg-[#0f2045] border rounded-lg px-4 pt-6 pb-2 text-white text-sm",
          "outline-none transition-all duration-250 appearance-none cursor-pointer",
          lifted ? "" : "text-transparent",
          focused
            ? "border-[#FF6B00] ring-2 ring-[#FF6B00]/30 shadow-[0_0_0_4px_rgba(255,107,0,0.12)]"
            : "border-white/10 hover:border-white/25",
        ].join(" ")}
        aria-label={label}
      >
        <option value="" disabled className="bg-[#0f2045] text-white/40">
          {label}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#0f2045] text-white">
            {o}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={[
          "absolute left-4 pointer-events-none transition-all duration-200 select-none",
          lifted
            ? "top-2 text-[0.68rem] font-semibold tracking-wider uppercase"
            : "top-1/2 -translate-y-1/2 text-sm",
          focused ? "text-[#FF6B00]" : "text-white/40",
        ].join(" ")}
      >
        {label}
      </label>
      {/* Chevron icon */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}

/* ─── Main Page Component ────────────────────────── */
export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const setField = (field: keyof FormState) => (v: string) =>
    setForm((prev) => ({ ...prev, [field]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <>
      <Navbar />

      <main
        className="min-h-screen"
        style={{ background: "var(--primary)" }}
      >
        {/* ── Hero strip ─────────────────────────── */}
        <div
          className="relative overflow-hidden pt-28 pb-20"
          style={{ background: "var(--primary-mid)" }}
        >
          {/* Decorative orange glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[240px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,107,0,0.12) 0%, transparent 70%)",
            }}
          />
          {/* Diagonal accent lines */}
          <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-white"
                style={{
                  width: "140%",
                  left: "-20%",
                  top: `${16 + i * 14}%`,
                  transform: "rotate(-4deg)",
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.05}
            >
              <p
                className="flex items-center gap-3 text-[#FF6B00] text-xs font-bold tracking-[0.2em] uppercase mb-4"
              >
                <span className="block w-8 h-px bg-[#FF6B00]" />
                Get in touch
              </p>
              <h1
                className="text-white leading-none mb-4"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.8rem, 6vw, 5rem)",
                }}
              >
                Contact <span className="text-[#FF6B00]">Us</span>
              </h1>
              <p className="text-white/50 text-base max-w-xl leading-relaxed">
                Have a question, partnership idea, or want to support the Stars? We&apos;d love to hear from you. Our team usually responds within 24 hours.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── Two-column content ──────────────────── */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 xl:gap-20 items-start">

            {/* ── LEFT: Contact Info ──────────────── */}
            <motion.aside
              className="lg:col-span-2 space-y-10"
              variants={fadeLeft}
              initial="hidden"
              animate="show"
              custom={0.15}
            >
              {/* Info cards */}
              <div className="space-y-4">
                {contactInfo.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-4 p-5 rounded-xl border border-white/8 hover:border-[#FF6B00]/40 transition-all duration-300 cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.2 + i * 0.1, duration: 0.5, ease: EASE },
                    }}
                    whileHover={{ x: 4 }}
                  >
                    <div
                      className="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center text-[#FF6B00] transition-colors duration-200 group-hover:bg-[#FF6B00] group-hover:text-white"
                      style={{ background: "rgba(255,107,0,0.1)" }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-white/40 text-[0.72rem] font-semibold tracking-widest uppercase mb-1">
                        {item.label}
                      </p>
                      <p className="text-white text-sm font-medium leading-relaxed whitespace-pre-line">
                        {item.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-white/8" />

              {/* Social handles */}
              <div>
                <p className="text-white/40 text-[0.72rem] font-semibold tracking-widest uppercase mb-5">
                  Follow Us
                </p>
                <div className="flex gap-3 flex-wrap">
                  {socialLinks.map((s, i) => (
                    <motion.a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center text-white/50 hover:bg-[#FF6B00] hover:border-[#FF6B00] hover:text-white transition-all duration-250"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        transition: { delay: 0.45 + i * 0.07, duration: 0.4, ease: EASE },
                      }}
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      id={`contact-social-${s.name.toLowerCase().replace("/", "-")}`}
                    >
                      {s.icon}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Map preview card */}
              <motion.div
                className="rounded-xl overflow-hidden border border-white/8 relative"
                style={{ height: 180 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.6 } }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #0f2045 0%, #1a2d6b 50%, #132050 100%)",
                  }}
                />
                {/* Stylized map dots */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-[#FF6B00] z-10 relative" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-[#FF6B00]/40 animate-ping" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-[#FF6B00]/15" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0A1B3D] to-transparent">
                  <p className="text-white/60 text-xs flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-[#FF6B00] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    </svg>
                    Rajshahi Stadium, Rajshahi Division
                  </p>
                </div>
              </motion.div>
            </motion.aside>

            {/* ── RIGHT: Contact Form ─────────────── */}
            <motion.div
              className="lg:col-span-3"
              variants={fadeRight}
              initial="hidden"
              animate="show"
              custom={0.25}
            >
              <div
                className="rounded-2xl border border-white/8 p-8 md:p-10"
                style={{ background: "rgba(19, 32, 80, 0.5)", backdropFilter: "blur(12px)" }}
              >
                <h2
                  className="text-white mb-2 leading-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  }}
                >
                  Send a <span className="text-[#FF6B00]">Message</span>
                </h2>
                <p className="text-white/40 text-sm mb-8">
                  Fill in the form below and we&apos;ll get back to you as soon as possible.
                </p>

                {/* Success state */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8 flex items-start gap-4 p-5 rounded-xl border border-green-500/30 bg-green-500/10"
                  >
                    <div className="w-9 h-9 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-green-400 font-semibold text-sm">Message sent successfully!</p>
                      <p className="text-white/50 text-xs mt-0.5">Our team will be in touch within 24 hours.</p>
                    </div>
                  </motion.div>
                )}

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  noValidate
                  id="contact-form"
                >
                  {/* Row 1: Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FloatingInput
                      id="contact-name"
                      label="Full Name"
                      value={form.name}
                      onChange={setField("name")}
                      required
                      autoComplete="name"
                    />
                    <FloatingInput
                      id="contact-email"
                      label="Email Address"
                      type="email"
                      value={form.email}
                      onChange={setField("email")}
                      required
                      autoComplete="email"
                    />
                  </div>

                  {/* Subject dropdown */}
                  <FloatingSelect
                    id="contact-subject"
                    label="Subject"
                    value={form.subject}
                    onChange={setField("subject")}
                    options={subjects}
                  />

                  {/* Message */}
                  <FloatingTextarea
                    id="contact-message"
                    label="Your Message"
                    value={form.message}
                    onChange={setField("message")}
                    required
                    rows={5}
                  />

                  {/* Privacy note */}
                  <p className="text-white/25 text-[0.72rem] leading-relaxed">
                    By submitting this form you agree to our{" "}
                    <a href="#" className="text-[#FF6B00] hover:underline">Privacy Policy</a>. We never share your information with third parties.
                  </p>

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    id="contact-submit"
                    className="relative w-full flex items-center justify-center gap-3 bg-[#FF6B00] text-white font-bold text-sm tracking-widest uppercase rounded-lg py-4 px-8 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                    whileHover={status !== "sending" ? { scale: 1.015, backgroundColor: "#FF8C3A" } : {}}
                    whileTap={status !== "sending" ? { scale: 0.98 } : {}}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Shimmer sweep on hover */}
                    <motion.span
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
                        backgroundSize: "200%",
                      }}
                      initial={{ backgroundPosition: "-100% center" }}
                      whileHover={{ backgroundPosition: "200% center" }}
                      transition={{ duration: 0.55 }}
                    />

                    {status === "sending" ? (
                      <>
                        <svg
                          className="w-5 h-5 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
