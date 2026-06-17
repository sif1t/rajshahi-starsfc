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
    value: "NGI House, 23-24, Tejgaon Industrial Area,\nDhaka, Bangladesh, 1208",
    href: "https://maps.google.com",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
    label: "Support Email",
    value: "rajshahiwarriors.bpl@gmail.com",
    href: "mailto:rajshahiwarriors.bpl@gmail.com",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.62 10.79a15.15 15.15 0 006.29 6.29l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </svg>
    ),
    label: "Phone Number",
    value: "+880 1712-345678",
    href: "tel:+8801712345678",
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

/* ─── Floating-label inputs ───────────────────────── */
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
        className={[
          "w-full bg-[#152036] border border-white/10 rounded-lg px-4 pt-7 pb-3 text-white text-sm outline-none",
          "transition-all duration-300 placeholder-transparent",
          focused
            ? "border-[#FF5A00] ring-2 ring-[#FF5A00]/30 shadow-[0_0_0_4px_rgba(255,90,0,0.10)]"
            : "hover:border-white/20",
        ].join(" ")}
      />
      <label
        htmlFor={id}
        className={[
          "absolute left-4 pointer-events-none transition-all duration-300 select-none",
          lifted ? "top-[8px] text-[0.65rem] font-bold tracking-wider uppercase" : "top-1/2 -translate-y-1/2 text-sm",
          focused ? "text-[#FF5A00]" : "text-white/35",
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
        placeholder=" "
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={[
          "w-full bg-[#152036] border border-white/10 rounded-lg px-4 pt-7 pb-3 text-white text-sm resize-none outline-none",
          "transition-all duration-300 placeholder-transparent",
          focused
            ? "border-[#FF5A00] ring-2 ring-[#FF5A00]/30 shadow-[0_0_0_4px_rgba(255,90,0,0.10)]"
            : "hover:border-white/20",
        ].join(" ")}
      />
      <label
        htmlFor={id}
        className={[
          "absolute left-4 pointer-events-none transition-all duration-300 select-none",
          lifted ? "top-[8px] text-[0.65rem] font-bold tracking-wider uppercase" : "top-5 text-sm",
          focused ? "text-[#FF5A00]" : "text-white/35",
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
        className={[
          "w-full bg-[#152036] border border-white/10 rounded-lg px-4 pt-7 pb-3 text-sm outline-none",
          "transition-all duration-300 appearance-none cursor-pointer",
          !value ? "text-transparent" : "text-white",
          focused
            ? "border-[#FF5A00] ring-2 ring-[#FF5A00]/30 shadow-[0_0_0_4px_rgba(255,90,0,0.10)]"
            : "hover:border-white/20",
        ].join(" ")}
      >
        <option value="" disabled></option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#0A1B3D] text-white">
            {o}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={[
          "absolute left-4 pointer-events-none transition-all duration-300 select-none",
          lifted ? "top-[8px] text-[0.65rem] font-bold tracking-wider uppercase" : "top-1/2 -translate-y-1/2 text-sm",
          focused ? "text-[#FF5A00]" : "text-white/35",
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

      {/* ── Full-screen centered wrapper ── */}
      <div className="relative min-h-screen overflow-hidden bg-[#071433]">
        {/* Atmospheric background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 15% 20%, rgba(255,90,0,0.18) 0%, transparent 38%), radial-gradient(circle at 85% 10%, rgba(73,142,255,0.14) 0%, transparent 42%), linear-gradient(180deg, #10214f 0%, #071433 52%, #051029 100%)",
          }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.08]">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-white"
              style={{ width: "150%", left: "-25%", top: `${18 + i * 13}%`, transform: "rotate(-2deg)" }}
            />
          ))}
        </div>

        <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1320px] items-center px-4 pb-16 pt-[130px] sm:px-6 lg:px-10">
          <div className="w-full">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mx-auto max-w-3xl text-center"
            >
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF5A00]/40 bg-[#FF5A00]/10 px-4 py-1.5 text-[0.68rem] font-bold tracking-[0.24em] text-[#FF8C42] uppercase">
                <span className="inline-block h-px w-6 bg-[#FF5A00]" />
                Get in touch
              </p>
              <h1
                className="text-white leading-none uppercase"
                style={{
                  fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
                  fontSize: "clamp(2.6rem, 6vw, 5.2rem)",
                }}
              >
                Contact <span className="text-[#FF5A00]">Us</span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
                Have a question, partnership idea, or want to support the Stars? We would love to hear from you.
                Our team usually responds within 24 hours.
              </p>
            </motion.div>

            {/* Main panel */}
            <div className="mt-10 rounded-[28px] border border-white/10 bg-[#091a44]/70 p-4 shadow-[0_35px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 items-stretch gap-6 xl:grid-cols-12">
                {/* ── LEFT: Info column ────────────────── */}
                <motion.aside
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  className="rounded-2xl border border-white/10 bg-[#0B204F]/75 p-5 sm:p-6 xl:col-span-5"
                >
                  <div className="mb-6 flex flex-wrap gap-3">
                    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.68rem] font-semibold tracking-wide text-white/80 uppercase">
                      Response in 24h
                    </span>
                    <span className="rounded-full border border-[#FF5A00]/35 bg-[#FF5A00]/10 px-3 py-1 text-[0.68rem] font-semibold tracking-wide text-[#FF9C64] uppercase">
                      Official support
                    </span>
                  </div>

                  <div className="space-y-4">
                    {contactInfo.map((item) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        variants={itemUp}
                        className="group flex items-start gap-4 rounded-xl border border-white/10 bg-[#0A1B43]/80 p-4 transition-all duration-300 hover:border-[#FF5A00]/35 hover:bg-[#0D244F]/95"
                      >
                        <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#FF5A00]/10 text-[#FF5A00] transition-all duration-300 group-hover:bg-[#FF5A00] group-hover:text-white">
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="mb-1 text-[0.65rem] font-bold tracking-[0.18em] text-white/45 uppercase">
                            {item.label}
                          </p>
                          <p className="break-words whitespace-pre-line text-sm leading-relaxed text-white">
                            {item.value}
                          </p>
                        </div>
                      </motion.a>
                    ))}
                  </div>

                  <motion.div variants={itemUp} className="mt-6 border-t border-white/10 pt-6">
                    <p className="mb-4 text-[0.65rem] font-bold tracking-[0.18em] text-white/45 uppercase">
                      Follow Us
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {socialLinks.map((s, i) => (
                        <motion.a
                          key={s.name}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.name}
                          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/60 transition-all duration-300 hover:border-[#FF5A00] hover:bg-[#FF5A00] hover:text-white"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            transition: { delay: 0.4 + i * 0.07, duration: 0.35, ease: EASE },
                          }}
                          whileHover={{ y: -3, scale: 1.06 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {s.icon}
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                </motion.aside>

                {/* ── RIGHT: Form column ───────────────── */}
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
                  className="rounded-2xl border border-white/10 bg-[#0B204F]/75 p-6 sm:p-7 lg:p-8 xl:col-span-7"
                >
                  <h2
                    className="text-white leading-tight uppercase"
                    style={{
                      fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
                      fontSize: "clamp(1.85rem, 2.7vw, 2.5rem)",
                    }}
                  >
                    Send A <span className="text-[#FF5A00]">Message</span>
                  </h2>
                  <p className="mb-7 mt-2 text-sm text-white/50">
                    Fill in the form below and we will get back to you as soon as possible.
                  </p>

                  <AnimatePresence>
                    {status === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        className="mb-7 flex items-start gap-3 rounded-xl border border-green-500/30 bg-green-500/10 p-4"
                      >
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-green-400">Message sent!</p>
                          <p className="mt-0.5 text-xs text-white/45">We will be in touch within 24 hours.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    noValidate
                  >
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <FloatingInput
                        id="contact-name" label="Full Name" value={form.name}
                        onChange={set("name")} required autoComplete="name"
                      />
                      <FloatingInput
                        id="contact-email" label="Email Address" type="email"
                        value={form.email} onChange={set("email")} required autoComplete="email"
                      />
                    </div>

                    <FloatingSelect
                      id="contact-subject" label="Subject"
                      value={form.subject} onChange={set("subject")} options={subjects}
                    />

                    <FloatingTextarea
                      id="contact-message" label="Your Message"
                      value={form.message} onChange={set("message")} required rows={6}
                    />

                    <p className="pb-2 pt-2 text-[0.72rem] leading-relaxed text-white/30">
                      By submitting you agree to our{" "}
                      <a href="#" className="text-[#FF5A00] hover:underline">Privacy Policy</a>.
                      We never share your data.
                    </p>

                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      className="relative w-full overflow-hidden rounded-xl bg-[#FF5A00] px-6 py-4 text-sm font-bold tracking-widest text-white uppercase shadow-[0_8px_30px_rgba(255,90,0,0.35)] transition-shadow duration-300 hover:shadow-[0_12px_34px_rgba(255,90,0,0.45)] disabled:cursor-not-allowed disabled:opacity-60"
                      whileHover={status !== "sending" ? { y: -2, scale: 1.01 } : {}}
                      whileTap={status !== "sending" ? { scale: 0.98 } : {}}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {status === "sending" ? (
                          <>
                            <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                            </svg>
                          </>
                        )}
                      </span>
                      <motion.span
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.22) 50%, transparent 60%)",
                          backgroundSize: "200% 100%",
                          backgroundPosition: "-100% center",
                        }}
                        whileHover={{ backgroundPosition: "200% center" }}
                        transition={{ duration: 0.55 }}
                      />
                    </motion.button>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
