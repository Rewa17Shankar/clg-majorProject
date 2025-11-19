// src/pages/Landing/Landing.jsx
import { useState, useEffect } from "react";
import Header from "../../component/Header";
import LoadingLoader from "../../component/LoadingLoader"
import Hero from "../../component/Hero";
import Features from "../../component/Features";
import Pricing from "../../component/Pricing";
import Preloader from "../../component/Preloader";
import Footer from "../../component/Footer";

export default function Landing() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && <Preloader onLoadingComplete={handleLoadingComplete} />}
      {!loading && (
        <>
          <Header />
          <LoadingLoader/>
          <Hero />
          <Features/>
          <Pricing />
          <Footer/>
        </>
      )}
    </>
  );
}
