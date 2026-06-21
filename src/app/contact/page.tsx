"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Send } from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-[#070D1B] text-white px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#FF5A00] selection:text-white flex items-center justify-center pt-18 pb-16 min-h-screen">
        <div className="max-w-7xl w-full flex flex-col items-center justify-center gap-12">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wider mb-4">
            Contact <span className="text-[#FF5A00]">Us</span>
          </h1>
          <div className="h-1 w-20 bg-[#FF5A00] mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a question, partnership idea, or want to support the Stars? We'd love to hear from you. Our team usually responds within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          
          {/* Left Column: Contact Info (Takes up 5 columns on large screens) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Info Cards */}
            <div className="bg-[#0C1527] border border-white/5 rounded-none p-8 space-y-10 shadow-lg ">
              
              {/* Address */}
              <div className="flex items-start gap-5">
                <div className="mt-1 text-[#FF5A00]">
                  <MapPin size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Stadium / Office</h3>
                  <p className="font-medium text-gray-300 leading-relaxed">
                    NGI House, 23-24, Tejgaon Industrial Area,<br />
                    Dhaka, Bangladesh, 1208
                  </p>
                </div>
              </div>

              <div className="w-full h-px bg-white/5"></div>

              {/* Email */}
              <div className="flex items-start gap-5">
                <div className="mt-1 text-[#FF5A00]">
                  <Mail size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Support Email</h3>
                  <a href="mailto:rajshahiwarriors.bpl@gmail.com" className="font-medium text-gray-300 hover:text-[#FF5A00] transition-colors">
                    rajshahiwarriors.bpl@gmail.com
                  </a>
                </div>
              </div>

              <div className="w-full h-px bg-white/5"></div>

              

            </div>  

            {/* Social Media Block */}
            <div className="bg-[#0C1527] border border-white/5 rounded-none p-8 shadow-lg">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-5">Follow The Stars</h3>
              <div className="flex gap-4">
                <a href="#" className="bg-[#111C33] p-3.5 rounded border border-white/5 hover:bg-[#FF5A00] hover:border-[#FF5A00] hover:-translate-y-1 transition-all duration-300 text-gray-300 hover:text-white">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.99H7.898v-2.888h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.888h-2.33v6.99C18.343 21.128 22 16.991 22 12z"/></svg>
                </a>
                <a href="#" className="bg-[#111C33] p-3.5 rounded border border-white/5 hover:bg-[#FF5A00] hover:border-[#FF5A00] hover:-translate-y-1 transition-all duration-300 text-gray-300 hover:text-white">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/></svg>
                </a>
                <a href="#" className="bg-[#111C33] p-3.5 rounded border border-white/5 hover:bg-[#FF5A00] hover:border-[#FF5A00] hover:-translate-y-1 transition-all duration-300 text-gray-300 hover:text-white">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58z"/></svg>
                </a>
                <a href="#" className="bg-[#111C33] p-3.5 rounded border border-white/5 hover:bg-[#FF5A00] hover:border-[#FF5A00] hover:-translate-y-1 transition-all duration-300 text-gray-300 hover:text-white">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form (Takes up 7 columns on large screens) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-7"
          >
            <div className="bg-[#0C1527] border border-white/5 rounded-none p-8 md:p-12 shadow-lg relative overflow-hidden">
              
              <h2 className="text-2xl font-black uppercase tracking-wider mb-8">
                Send A <span className="text-[#FF5A00]">Message</span>
              </h2>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full bg-[#060D1B] border border-white/10 rounded-none px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF5A00] focus:ring-1 focus:ring-[#FF5A00] transition-all"
                    />
                  </div>
                  {/* Email Address */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com" 
                      className="w-full bg-[#060D1B] border border-white/10 rounded-none px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF5A00] focus:ring-1 focus:ring-[#FF5A00] transition-all"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Subject</label>
                  <div className="relative">
                    <select className="w-full bg-[#060D1B] border border-white/10 rounded-none px-4 py-3.5 text-white focus:outline-none focus:border-[#FF5A00] focus:ring-1 focus:ring-[#FF5A00] transition-all appearance-none cursor-pointer">
                      <option value="" disabled selected className="text-gray-600">Select a subject...</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Partnership">Sponsorship & Partnership</option>
                      <option value="Ticketing">Ticketing & Merchandise</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Your Message</label>
                  <textarea 
                    rows={6}
                    placeholder="How can we help you?" 
                    className="w-full bg-[#060D1B] border border-white/10 rounded-none px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF5A00] focus:ring-1 focus:ring-[#FF5A00] transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button 
                    type="submit" 
                    className="w-full bg-[#FF5A00] hover:bg-[#e65100] text-white font-bold uppercase tracking-widest py-4 rounded-none flex justify-center items-center gap-3 transition-all duration-300"
                  >
                    Send Message
                    <Send size={18} />
                  </button>
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    By submitting you agree to our Privacy Policy. We never share your data.
                  </p>
                </div>
              </form>
            </div>
          </motion.div>

        </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}