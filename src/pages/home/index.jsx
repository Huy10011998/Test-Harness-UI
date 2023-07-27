import React, { useState, useEffect } from "react";
import { Navigation } from "../../pages/home/navigation";
import { Header } from "../../pages/home/header";
import { Footer } from "../../pages/home/footer";
import { Features } from "./features";
import { About } from "./about";
import { Services } from "./services";
import { Gallery } from "./gallery";
import { Package } from "./package";
import { Contact } from "./contact";
import JsonData from "../../data/data.json";
import SmoothScroll from "smooth-scroll";
import { Testimonials } from "./testimonials";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const HomePage = () => {
  const [landingPageData, setLandingPageData] = useState({});

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <React.Fragment>
      <Navigation />
      <Header data={landingPageData.Header} />
      <About data={landingPageData.About} />
      <Features data={landingPageData.Features} />
      {/* <About data={landingPageData.About} /> */}
      <Package />
      {/* <Services data={landingPageData.Services} /> */}
      {/* <Gallery data={landingPageData.Gallery} /> */}
      <Contact data={landingPageData.Contact} />
      <Footer />
      <Testimonials data={landingPageData.Testimonials} />
    </React.Fragment>
  );
};

export default HomePage;
