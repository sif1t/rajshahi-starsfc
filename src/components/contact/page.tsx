"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, Phone, ChevronDown, Send } from "lucide-react";
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
    icon: <MapPin className="w-5 h-5" />,
    label: "Stadium / Office",
    value: "NGI House, 23-24, Tejgaon Industrial Area,\nDhaka, Bangladesh, 1208",
    href: "https://maps.google.com",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Support Email",
    value: "rajshahiwarriors.bpl@gmail.com",
    href: "mailto:rajshahiwarriors.bpl@gmail.com",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: "Phone Number",
    value: "+880 1712-345678",
    href: "tel:+8801712345678",
  },
];

const socialLinks = [
  { name: "Facebook", href: "https://facebook.com", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
  { name: "Instagram", href: "https://instagram.com", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
  { name: "YouTube", href: "https://youtube.com", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg> },
  { name: "Twitter/X", href: "https://twitter.com", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
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

/* ─── Form Elements ───────────────────────── */
function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-xs font-bold tracking-[0.1em] uppercase text-white/60 mb-2">
      {children}
    </label>
  );
}

const inputStyles = "w-full bg-white/5 border border-white/20 rounded-xl p-4 text-white placeholder:text-white/30 focus:ring-2 focus:ring-[#FF5A00] focus:border-transparent outline-none transition-all duration-300";

/* ─── Page ───────────────────────────────────────── */
export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");

  const set = (f: keyof FormState) => (v: string) => setForm((p) => ({ ...p, [f]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <>
      <Navbar />

      <div className="bg-[#0a1429] min-h-screen relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_10%,rgba(255,90,0,0.06)_0%,transparent_70%)]" />
        
        {/* ── Main Content Container ─────────────────────── */}
        <section className="relative z-10 mx-auto grid min-h-screen w-full max-w-6xl place-items-center px-4 py-[120px] sm:px-6 lg:px-8">
          <div className="w-full rounded-[30px] border border-white/10 bg-white/[0.02] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-14">

            {/* ── LEFT: Info column ────────────────── */}
            <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-10">
              
              {/* Heading Section */}
              <motion.div variants={itemUp}>
                <p className="flex items-center gap-3 mb-4 text-[#FF5A00] text-sm font-bold tracking-[0.2em] uppercase">
                  <span className="inline-block w-8 h-px bg-[#FF5A00]" />
                  Get in touch
                </p>
                <h1 className="text-white uppercase leading-none mb-6" style={{ fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)", fontSize: "clamp(3rem, 6vw, 4.5rem)" }}>
                  CONTACT <span className="text-[#FF5A00]">US</span>
                </h1>
                <p className="text-white/60 text-base leading-relaxed max-w-md">
                  Have a question, partnership idea, or want to support the Stars?
                  We'd love to hear from you. Our team usually responds within 24 hours.
                </p>
              </motion.div>

              {/* Info Cards */}
              <div className="space-y-7">
                {contactInfo.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    variants={itemUp}
                    className="group flex items-start gap-5 cursor-pointer"
                  >
                    <div className="flex-shrink-0 mt-1 w-12 h-12 rounded-xl flex items-center justify-center text-[#FF5A00] bg-white/5 border border-white/10 transition-all duration-300 group-hover:bg-[#FF5A00] group-hover:border-[#FF5A00] group-hover:text-white shadow-lg">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold tracking-[0.15em] uppercase text-white/50 mb-1.5">
                        {item.label}
                      </p>
                      <p className="text-white text-[15px] leading-relaxed whitespace-pre-line group-hover:text-[#FF5A00] transition-colors duration-300">
                        {item.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Follow Us */}
              <motion.div variants={itemUp} className="pt-2">
                <p className="text-xs font-bold tracking-[0.15em] uppercase text-white/50 mb-6">
                  Follow Us
                </p>
                <div className="flex gap-4 flex-wrap">
                  {socialLinks.map((s, i) => (
                    <motion.a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#FF5A00] hover:border-[#FF5A00] hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(255,90,0,0.3)]"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1, transition: { delay: 0.4 + i * 0.07, duration: 0.35, ease: EASE } }}
                    >
                      {s.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Form column ───────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            >
              <div className="bg-[#0d1d3e]/80 border border-white/10 rounded-2xl p-7 lg:p-8 shadow-2xl">
                <h2 className="text-white leading-tight mb-2 uppercase" style={{ fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)", fontSize: "clamp(2rem, 3vw, 2.5rem)" }}>
                  SEND A <span className="text-[#FF5A00]">MESSAGE</span>
                </h2>
                <p className="text-white/50 text-[15px] mb-8">
                  Fill in the form below and we'll get back to you as soon as possible.
                </p>

                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-8 overflow-hidden"
                    >
                      <div className="flex items-start gap-4 p-5 rounded-xl border border-green-500/30 bg-green-500/10">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 flex-shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg>
                        </div>
                        <div>
                          <p className="text-green-400 font-bold text-sm tracking-wide uppercase">Message Sent</p>
                          <p className="text-white/60 text-[13px] mt-1">We'll be in touch within 24 hours.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="contact-name">Full Name</Label>
                      <input
                        id="contact-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => set("name")(e.target.value)}
                        required
                        placeholder="John Doe"
                        className={inputStyles}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-email">Email Address</Label>
                      <input
                        id="contact-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => set("email")(e.target.value)}
                        required
                        placeholder="john@example.com"
                        className={inputStyles}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="contact-subject">Subject</Label>
                    <div className="relative">
                      <select
                        id="contact-subject"
                        value={form.subject}
                        onChange={(e) => set("subject")(e.target.value)}
                        required
                        className={`${inputStyles} appearance-none cursor-pointer ${form.subject === "" ? "text-white/30" : "text-white"}`}
                      >
                        <option value="" disabled>Select a subject...</option>
                        {subjects.map((o) => (
                          <option key={o} value={o} className="bg-[#0a1429] text-white">
                            {o}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-[50%] -translate-y-1/2 pointer-events-none text-white/50">
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="contact-message">Your Message</Label>
                    <textarea
                      id="contact-message"
                      value={form.message}
                      onChange={(e) => set("message")(e.target.value)}
                      required
                      rows={5}
                      placeholder="How can we help you?"
                      className={`${inputStyles} resize-none`}
                    />
                  </div>

                  <p className="text-white/40 text-[13px] leading-relaxed pt-2">
                    By submitting you agree to our <a href="#" className="text-[#FF5A00] hover:underline">Privacy Policy</a>. We never share your data.
                  </p>

                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    className="relative w-full flex items-center justify-center gap-3 text-white font-bold text-sm tracking-widest uppercase rounded-xl py-4 px-6 bg-[#FF5A00] overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_4px_15px_rgba(255,90,0,0.25)] hover:shadow-[0_8px_30px_rgba(255,90,0,0.4)] transition-all duration-300 mt-2"
                    whileHover={status !== "sending" ? { y: -2, scale: 1.01 } : {}}
                    whileTap={status !== "sending" ? { scale: 0.98 } : {}}
                  >
                    <motion.span
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)", backgroundSize: "200% 100%", backgroundPosition: "-100% center" }}
                      whileHover={{ backgroundPosition: "200% center" }}
                      transition={{ duration: 0.6 }}
                    />
                    {status === "sending" ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
