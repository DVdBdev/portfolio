import Navbar from "@/components/layout/Navbar";
import StatusBar from "@/components/layout/StatusBar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import TelemetryFeed from "@/components/sections/TelemetryFeed";
import ProjectsSection from "@/components/sections/ProjectsSection";
import StackGraph from "@/components/sections/StackGraph";
import TimelineSection from "@/components/sections/TimelineSection";
import PrinciplesSection from "@/components/sections/PrinciplesSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Status bar sits just below the fixed nav */}
      <div className="pt-14">
        <StatusBar />
      </div>

      <main className="flex-1">
        <HeroSection />

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#21262D] to-transparent" />
        </div>

        <TelemetryFeed />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#21262D] to-transparent" />
        </div>

        <ProjectsSection />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#21262D] to-transparent" />
        </div>

        <StackGraph />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#21262D] to-transparent" />
        </div>

        <TimelineSection />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#21262D] to-transparent" />
        </div>

        <PrinciplesSection />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#21262D] to-transparent" />
        </div>

        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
