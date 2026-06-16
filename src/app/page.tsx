import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import MatchStrip from "@/components/MatchStrip/MatchStrip";
import LatestNews from "@/components/LatestNews/LatestNews";
import Squad from "@/components/Squad/Squad";
import Stats from "@/components/Stats/Stats";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MatchStrip />
        <LatestNews />
        <Squad />
        <Stats />
      </main>
      <Footer />
    </>
  );
}
