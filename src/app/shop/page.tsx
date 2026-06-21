"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

/* ─── Animation helpers ──────────────────────────── */
const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/* ─── Data ───────────────────────────────────────── */
const categories = ["All Kits", "Home Jersey", "Away Jersey", "Training Wear", "Accessories"];

const products = [
  {
    id: 1,
    category: "AUTHENTIC MATCH WEAR",
    title: "RSFC OFFICIAL HOME JERSEY 2026",
    price: "৳ 1,250",
    sizes: "S - XXL",
    image: "/images/shop/home-jersey.png",
    type: "Home Jersey",
    watermark: "KIT",
  },
  {
    id: 2,
    category: "AUTHENTIC MATCH WEAR",
    title: "RSFC OFFICIAL AWAY JERSEY 2026",
    price: "৳ 1,250",
    sizes: "S - XXL",
    image: "/images/shop/away-jersey.png",
    type: "Away Jersey",
    watermark: "KIT",
  },
  {
    id: 3,
    category: "TRAINING APPAREL",
    title: "RSFC ELITE TRAINING TOP",
    price: "৳ 950",
    sizes: "M - XL",
    image: "/images/shop/training-top.png",
    type: "Training Wear",
    watermark: "TRG",
  },
  {
    id: 4,
    category: "CLUB MERCHANDISE",
    title: "STARS FC CLASSIC SCARF",
    price: "৳ 450",
    sizes: "ONE SIZE",
    image: "/images/shop/scarf.png",
    type: "Accessories",
    watermark: "ACC",
  },
  {
    id: 5,
    category: "CLUB MERCHANDISE",
    title: "OFFICIAL SNAPBACK CAP",
    price: "৳ 650",
    sizes: "ADJUSTABLE",
    image: "/images/shop/cap.png",
    type: "Accessories",
    watermark: "CAP",
  },
  {
    id: 6,
    category: "AUTHENTIC MATCH WEAR",
    title: "RSFC GOALKEEPER JERSEY",
    price: "৳ 1,350",
    sizes: "S - XL",
    image: "/images/shop/gk-jersey.png",
    type: "Home Jersey",
    watermark: "GK",
  },
];

/* ─── Component ──────────────────────────────────── */
export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All Kits");

  const filteredProducts = activeCategory === "All Kits" 
    ? products 
    : products.filter(p => p.type === activeCategory);

  return (
    <>
      <Navbar />

      <main className="bg-[#070D1B] min-h-screen pt-[120px] pb-24">
        
        {/* ── Page Header ──────────────────────────── */}
        <div className="text-center px-4 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
            <h1 className="text-white uppercase leading-none mb-3" style={{ fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)", fontSize: "clamp(3rem, 6vw, 5rem)" }}>
              OFFICIAL CLUB <span className="text-[#FF5A00]">SHOP</span>
            </h1>
            <p className="text-[#FF5A00] font-bold tracking-[0.2em] uppercase text-sm">
              WEAR THE COLORS OF THE STARS
            </p>
          </motion.div>
        </div>

        {/* ── Category Filter Bar ──────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="flex overflow-x-auto pb-4 hide-scrollbar justify-start md:justify-center gap-3"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-bold tracking-wider uppercase whitespace-nowrap transition-colors duration-300 ${
                  activeCategory === cat ? "text-white" : "text-white/50 hover:text-white"
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-[#FF5A00] rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* ── Product Grid ─────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={stagger}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemUp}
                  className="group relative bg-[#0A1B3D] rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(255,90,0,0.15)] flex flex-col h-full"
                >
                  {/* Top Half: Image & Overlay */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#050914]">
                    {/* Watermark */}
                    <div className="absolute top-4 left-4 z-10 select-none pointer-events-none">
                      <span className="text-white/[0.04] font-bold text-7xl leading-none" style={{ fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)" }}>
                        {product.watermark}
                      </span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image 
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>

                    {/* Dark gradient overlay matching the squad card */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1B3D] to-transparent opacity-90" />
                  </div>

                  {/* Bottom Half: Typography & Stats */}
                  <div className="relative z-20 flex flex-col flex-grow px-6 pb-6 -mt-20">
                    <p className="text-[#2B5A9F] font-black text-[0.65rem] tracking-[0.2em] uppercase mb-1">
                      {product.category}
                    </p>
                    <h3 className="text-white leading-tight mb-5" style={{ fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)", fontSize: "1.75rem" }}>
                      {product.title}
                    </h3>

                    {/* Metrics Row */}
                    <div className="flex items-center gap-6 mt-auto mb-6">
                      <div>
                        <p className="text-[#FF5A00] font-bold text-xl leading-none mb-1">{product.price}</p>
                        <p className="text-white/40 font-bold text-[0.6rem] tracking-[0.2em] uppercase">Price</p>
                      </div>
                      <div className="w-px h-8 bg-white/10" />
                      <div>
                        <p className="text-[#FF5A00] font-bold text-xl leading-none mb-1">{product.sizes}</p>
                        <p className="text-white/40 font-bold text-[0.6rem] tracking-[0.2em] uppercase">Sizes</p>
                      </div>
                    </div>

                    {/* Buy Button */}
                    <button className="w-full bg-[#FF5A00] hover:bg-[#ff6a1a] text-white font-bold uppercase tracking-widest text-sm py-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-300 shadow-[0_4px_15px_rgba(255,90,0,0.25)]">
                      <ShoppingBag className="w-4 h-4" />
                      Buy Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Footer />
      
      {/* Hide scrollbar styles inline for convenience */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </>
  );
}
