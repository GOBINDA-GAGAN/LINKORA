import React from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import FooterTop from "./FooterTop";
import Hero from "./Hero";
import Features from "./Features";
import Showcase from "./Showcase";
import HowItWorks from "./HowItWorks";
import Pricing from "./Pricing";
import AnalyticsDashboard from "./AnalyticsDashboard";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <Features />
        <Showcase />
        <HowItWorks />
        {/* <AnalyticsDashboard /> */}

        {/* Templates Section */}

        {/* Pricing Section */}
        <Pricing />
        <FooterTop />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
