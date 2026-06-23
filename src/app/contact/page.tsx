"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Send } from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const inputClass =
  "h-12 w-full bg-[#060D1B] border border-white/5 rounded-xl px-4 text-white text-sm placeholder:text-gray-600 focus:border-[#FF5A00] focus:ring-1 focus:ring-[#FF5A00] outline-none transition-all duration-300";

const labelClass =
  "block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2";

const infoItems = [
  {
    icon: <MapPin size={20} strokeWidth={1.8} />,
    label: "Stadium / Office",
    value: "NGI House, 23-24, Tejgaon Industrial Area, Dhaka, Bangladesh, 1208",
    href: "https://maps.google.com",
  },
  {
    icon: <Mail size={20} strokeWidth={1.8} />,
    label: "Support Email",
    value: "rajshahiwarriors.bpl@gmail.com",
    href: "mailto:rajshahiwarriors.bpl@gmail.com",
  },
  {
    icon: <Phone size={20} strokeWidth={1.8} />,
    label: "Phone Number",
    value: "+880 1712-345678",
    href: "tel:+8801712345678",
  },
];

const socialIcons = [
  <svg key="fb" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.99H7.898v-2.888h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.888h-2.33v6.99C18.343 21.128 22 16.991 22 12z"/></svg>,
  <svg key="ig" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  <svg key="yt" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>,
  <svg key="tw" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
];

export default function ContactPage() {
  return (
    <div className="bg-[#070D1B] min-h-screen selection:bg-[#FF5A00] selection:text-white flex flex-col">
      <Navbar />

      {/* Content area — pushed below the 72px fixed navbar */}
      <div className="flex-1 flex justify-center" style={{ marginTop: "72px" }}>
        <div className="w-full pt-16 sm:pt-20 pb-28" style={{ maxWidth: "1100px", paddingLeft: "clamp(1.5rem, 5vw, 4rem)", paddingRight: "clamp(1.5rem, 5vw, 4rem)" }}>

          {/* ── HERO HEADER ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="text-center mb-16 space-y-3 w-full"
          >
            <p className="flex items-center justify-center gap-3 text-[#FF5A00] text-xs font-bold tracking-[0.25em] uppercase">
              <span className="inline-block w-8 h-px bg-[#FF5A00]" />
              Get In Touch
              <span className="inline-block w-8 h-px bg-[#FF5A00]" />
            </p>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase text-white">
              Contact <span className="text-[#FF5A00]">Us</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed pt-2">
              Have a question, partnership idea, or want to support the Stars? We'd love to hear from you. Our team usually responds within 24 hours.
            </p>
          </motion.div>

          {/* ── 2-COLUMN GRID ──────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start w-full">

            {/* ── LEFT COLUMN: INFO CARDS (5 cols) ─────────── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
              className="space-y-4"
            >
              {/* 3 Stacked Info Cards */}
              {infoItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 p-6 bg-[#0C1527] rounded-2xl border border-white/10 shadow-xl transition-all duration-300 hover:border-[#FF5A00]/40 hover:-translate-y-0.5 group"
                >
                  {/* Icon Badge */}
                  <div className="w-12 h-12 rounded-xl bg-[#FF5A00]/10 text-[#FF5A00] flex items-center justify-center shrink-0 border border-[#FF5A00]/20 group-hover:bg-[#FF5A00] group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  {/* Text */}
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{item.label}</p>
                    <p className="text-sm font-semibold text-white leading-snug break-words group-hover:text-[#FF5A00] transition-colors duration-300">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}

              {/* Social Card */}
              <div className="p-6 bg-[#0C1527] rounded-2xl border border-white/10 shadow-xl">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">Follow The Stars</p>
                <div className="flex gap-3 flex-wrap">
                  {socialIcons.map((icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-11 h-11 rounded-xl bg-[#111C33] border border-white/8 flex items-center justify-center text-gray-400 hover:bg-[#FF5A00] hover:border-[#FF5A00] hover:text-white hover:-translate-y-1 transition-all duration-300"
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT COLUMN: FORM CARD (7 cols) ─────────── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
              className=""
            >
              <div className="bg-[#0C1527] p-8 sm:p-10 rounded-2xl border border-white/10 shadow-2xl space-y-6">

                <div>
                  <h2 className="text-white uppercase leading-none mb-1" style={{ fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)", fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>
                    Send A <span className="text-[#FF5A00]">Message</span>
                  </h2>
                  <p className="text-gray-500 text-sm">Fill in the form and we'll get back to you shortly.</p>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-5">

                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Full Name</label>
                      <input type="text" placeholder="John Doe" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Email Address</label>
                      <input type="email" placeholder="john@example.com" className={inputClass} />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className={labelClass}>Subject</label>
                    <div className="relative">
                      <select className={`${inputClass} appearance-none cursor-pointer`} defaultValue="">
                        <option value="" disabled>Select a subject...</option>
                        <option>General Inquiry</option>
                        <option>Sponsorship &amp; Partnership</option>
                        <option>Ticketing &amp; Merchandise</option>
                        <option>Media &amp; Press</option>
                        <option>Youth Academy</option>
                        <option>Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className={labelClass}>Your Message</label>
                    <textarea
                      rows={6}
                      placeholder="How can we help you?"
                      className="min-h-[150px] w-full bg-[#060D1B] border border-white/5 rounded-xl p-4 text-white text-sm placeholder:text-gray-600 focus:border-[#FF5A00] focus:ring-1 focus:ring-[#FF5A00] outline-none transition-all duration-300 resize-y"
                    />
                  </div>

                  {/* Privacy */}
                  <p className="text-xs text-gray-600">
                    By submitting you agree to our{" "}
                    <a href="#" className="text-[#FF5A00] hover:underline">Privacy Policy</a>. We never share your data.
                  </p>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="h-12 w-full rounded-xl bg-[#FF5A00] hover:bg-[#e04f00] text-white font-bold tracking-wider uppercase shadow-lg hover:shadow-[0_8px_25px_rgba(255,90,0,0.4)] transition-all duration-300 flex items-center justify-center gap-2 text-sm hover:-translate-y-0.5"
                  >
                    Send Message
                    <Send size={16} />
                  </button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}