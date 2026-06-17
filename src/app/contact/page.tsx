"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

/* ─── Animation helpers ──────────────────────────── */
const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/* ─── Data ───────────────────────────────────────── */
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
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
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
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
      </svg>
    ),
  },
  {
    name: "Twitter/X",
    href: "https://twitter.com",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
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

type FormState = { name: string; email: string; subject: string; message: string };
type FormStatus = "idle" | "sending" | "success" | "error";

/* ─── Floating-label input ───────────────────────── */
function FloatingInput({
  id, label, type = "text", value, onChange, required, autoComplete,
}: {
  id: string; label: string; type?: string; value: string;
  onChange: (v: string) => void; required?: boolean; autoComplete?: string;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;
  return (
    <div className="relative w-full">
      <input
        id={id} type={type} value={value} required={required}
        autoComplete={autoComplete} placeholder=" "
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ background: "rgba(10,27,61,0.8)" }}
        className={[
          "w-full border rounded-lg px-4 pt-6 pb-2 text-white text-sm outline-none",
          "transition-all duration-200 placeholder-transparent",
          focused
            ? "border-[#FF6B00] ring-2 ring-[#FF6B00]/25 shadow-[0_0_0_4px_rgba(255,107,0,0.10)]"
            : "border-white/10 hover:border-white/20",
        ].join(" ")}
      />
      <label
        htmlFor={id}
        className={[
          "absolute left-4 pointer-events-none transition-all duration-200 select-none",
          lifted ? "top-[7px] text-[0.64rem] font-bold tracking-widest uppercase" : "top-1/2 -translate-y-1/2 text-sm",
          focused ? "text-[#FF6B00]" : "text-white/35",
        ].join(" ")}
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({
  id, label, value, onChange, required, rows = 5,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  required?: boolean; rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;
  return (
    <div className="relative w-full">
      <textarea
        id={id} value={value} rows={rows} required={required}
        placeholder=" " style={{ background: "rgba(10,27,61,0.8)" }}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={[
          "w-full border rounded-lg px-4 pt-7 pb-3 text-white text-sm resize-none outline-none",
          "transition-all duration-200 placeholder-transparent",
          focused
            ? "border-[#FF6B00] ring-2 ring-[#FF6B00]/25 shadow-[0_0_0_4px_rgba(255,107,0,0.10)]"
            : "border-white/10 hover:border-white/20",
        ].join(" ")}
      />
      <label
        htmlFor={id}
        className={[
          "absolute left-4 pointer-events-none transition-all duration-200 select-none",
          lifted ? "top-[7px] text-[0.64rem] font-bold tracking-widest uppercase" : "top-4 text-sm",
          focused ? "text-[#FF6B00]" : "text-white/35",
        ].join(" ")}
      >
        {label}
      </label>
    </div>
  );
}

function FloatingSelect({
  id, label, value, onChange, options,
}: {
  id: string; label: string; value: string;
  onChange: (v: string) => void; options: string[];
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;
  return (
    <div className="relative w-full">
      <select
        id={id} value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ background: "rgba(10,27,61,0.8)" }}
        className={[
          "w-full border rounded-lg px-4 pt-6 pb-2 text-white text-sm outline-none",
          "transition-all duration-200 appearance-none cursor-pointer",
          !lifted ? "text-transparent" : "",
          focused
            ? "border-[#FF6B00] ring-2 ring-[#FF6B00]/25 shadow-[0_0_0_4px_rgba(255,107,0,0.10)]"
            : "border-white/10 hover:border-white/20",
        ].join(" ")}
      >
        <option value="" disabled style={{ background: "#0A1B3D", color: "rgba(255,255,255,0.35)" }}>{label}</option>
        {options.map((o) => (
          <option key={o} value={o} style={{ background: "#0A1B3D", color: "white" }}>{o}</option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={[
          "absolute left-4 pointer-events-none transition-all duration-200 select-none",
          lifted ? "top-[7px] text-[0.64rem] font-bold tracking-widest uppercase" : "top-1/2 -translate-y-1/2 text-sm",
          focused ? "text-[#FF6B00]" : "text-white/35",
        ].join(" ")}
      >
        {label}
      </label>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/35">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────── */
export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const set = (f: keyof FormState) => (v: string) => setForm((p) => ({ ...p, [f]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <>
      <Navbar />

      {/* ── Page wrapper — pushes below fixed navbar ── */}
      <div style={{ background: "var(--primary)", minHeight: "100vh" }}>

        {/* ── Hero strip ──────────────────────────── */}
        <div
          className="relative overflow-hidden"
          style={{
            background: "var(--primary-mid)",
            paddingTop: "120px",
            paddingBottom: "3rem",
          }}
        >
          {/* Subtle radial glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,107,0,0.10) 0%, transparent 70%)",
            }}
          />
          {/* Thin diagonal stripes */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.04]">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-white"
                style={{ width: "150%", left: "-25%", top: `${20 + i * 15}%`, transform: "rotate(-3deg)" }}
              />
            ))}
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {/* Tag line */}
              <p className="flex items-center gap-2 mb-3 text-[#FF6B00] text-xs font-bold tracking-[0.22em] uppercase">
                <span className="inline-block w-6 h-px bg-[#FF6B00]" />
                Get in touch
              </p>

              {/* Page title */}
              <h1
                className="text-white leading-none mb-3"
                style={{
                  fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
                  fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
                }}
              >
                Contact <span style={{ color: "var(--accent, #FF6B00)" }}>Us</span>
              </h1>

              {/* Subtitle */}
              <p
                className="text-white/50 leading-relaxed"
                style={{ fontSize: "clamp(0.85rem, 1.5vw, 1rem)", maxWidth: "38rem" }}
              >
                Have a question, partnership idea, or want to support the Stars?
                We'd love to hear from you. Our team usually responds within 24 hours.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── Two-column body ─────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[22rem_minmax(0,1fr)] gap-10 xl:gap-14 items-start">

            {/* ── LEFT: Info column ────────────────── */}
            <motion.aside
              variants={stagger}
              initial="hidden"
              animate="show"
              className="space-y-3"
            >
              {/* Info cards */}
              {contactInfo.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  variants={itemUp}
                  whileHover={{ x: 5 }}
                  className="group flex items-start gap-4 p-4 sm:p-5 rounded-xl border border-white/8 transition-colors duration-200 cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.025)" }}
                >
                  {/* Icon bubble */}
                  <div
                    className="flex-shrink-0 mt-0.5 w-10 h-10 rounded-lg flex items-center justify-center text-[#FF6B00] transition-all duration-200 group-hover:bg-[#FF6B00] group-hover:text-white"
                    style={{ background: "rgba(255,107,0,0.10)" }}
                  >
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-white/40 mb-1">
                      {item.label}
                    </p>
                    <p className="text-white text-sm leading-relaxed break-words whitespace-pre-line">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}

              {/* Divider */}
              <motion.div variants={itemUp} className="border-t border-white/8 pt-6">
                <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-white/40 mb-4">
                  Follow Us
                </p>
                <div className="flex gap-2 flex-wrap">
                  {socialLinks.map((s, i) => (
                    <motion.a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      id={`contact-social-${s.name.toLowerCase().replace("/", "-")}`}
                      className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/45 hover:bg-[#FF6B00] hover:border-[#FF6B00] hover:text-white transition-all duration-200"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: 1, scale: 1,
                        transition: { delay: 0.4 + i * 0.07, duration: 0.35, ease: EASE },
                      }}
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.93 }}
                    >
                      {s.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Stylised map card */}
              <motion.div
                variants={itemUp}
                className="rounded-xl overflow-hidden border border-white/8 relative"
                style={{ height: 160, background: "linear-gradient(135deg,#0f2045,#162a60,#132050)" }}
              >
                {/* Ping dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-[#FF6B00] relative z-10" />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-[#FF6B00]/40 animate-ping" />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-[#FF6B00]/15" />
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#0A1B3D] to-transparent">
                  <p className="text-white/55 text-xs flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-[#FF6B00] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    </svg>
                    Rajshahi Stadium, Rajshahi Division
                  </p>
                </div>
              </motion.div>
            </motion.aside>

            {/* ── RIGHT: Form column ───────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            >
              <div
                className="rounded-2xl border border-white/8 p-6 sm:p-8 lg:p-10"
                style={{ background: "rgba(19,32,80,0.55)", backdropFilter: "blur(14px)" }}
              >
                {/* Card header */}
                <h2
                  className="text-white leading-tight mb-1"
                  style={{
                    fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
                    fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                  }}
                >
                  Send a <span style={{ color: "var(--accent, #FF6B00)" }}>Message</span>
                </h2>
                <p className="text-white/40 text-sm mb-7">
                  Fill in the form below and we'll get back to you as soon as possible.
                </p>

                {/* Success banner */}
                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      className="mb-6 flex items-start gap-3 p-4 rounded-xl border border-green-500/30 bg-green-500/10"
                    >
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-green-400 font-semibold text-sm">Message sent!</p>
                        <p className="text-white/45 text-xs mt-0.5">We'll be in touch within 24 hours.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form */}
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  noValidate
                  id="contact-form"
                >
                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FloatingInput
                      id="contact-name" label="Full Name" value={form.name}
                      onChange={set("name")} required autoComplete="name"
                    />
                    <FloatingInput
                      id="contact-email" label="Email Address" type="email"
                      value={form.email} onChange={set("email")} required autoComplete="email"
                    />
                  </div>

                  {/* Subject */}
                  <FloatingSelect
                    id="contact-subject" label="Subject"
                    value={form.subject} onChange={set("subject")} options={subjects}
                  />

                  {/* Message */}
                  <FloatingTextarea
                    id="contact-message" label="Your Message"
                    value={form.message} onChange={set("message")} required rows={5}
                  />

                  {/* Privacy */}
                  <p className="text-white/25 text-[0.72rem] leading-relaxed">
                    By submitting you agree to our{" "}
                    <a href="#" className="text-[#FF6B00] hover:underline">Privacy Policy</a>.
                    We never share your data.
                  </p>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    id="contact-submit"
                    className="relative w-full flex items-center justify-center gap-3 text-white font-bold text-sm tracking-widest uppercase rounded-xl py-4 px-6 overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: "#FF6B00" }}
                    whileHover={status !== "sending" ? { scale: 1.015 } : {}}
                    whileTap={status !== "sending" ? { scale: 0.975 } : {}}
                    transition={{ duration: 0.18 }}
                  >
                    {/* Shimmer */}
                    <motion.span
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
                        backgroundSize: "200% 100%",
                        backgroundPosition: "-100% center",
                      }}
                      whileHover={{ backgroundPosition: "200% center" }}
                      transition={{ duration: 0.55 }}
                    />

                    {status === "sending" ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
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
      </div>

      <Footer />
    </>
  );
}
