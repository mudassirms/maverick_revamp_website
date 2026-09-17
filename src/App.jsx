import { Routes, Route } from "react-router-dom";

import ButtonGradient from "./assets/svg/ButtonGradient";

import Products from "./components/Products";
import Collaboration from "./components/Collaboration";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Roadmap from "./components/Roadmap";
import Services from "./components/Services";
import About from "./components/About";
import ContactForm from "./components/ContactForm";
import ScrollToTop from "./components/ScrollToTop";

import ProductDetail from "./pages/ProductDetail";
import ServiceDetail from "./pages/ServiceDetail";
import Careers from "./pages/Careers";
import Team from "./pages/Team";
// import TeamMemberPage from "./pages/TeamMemberPage";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Collaboration />
      <Services />
      <Products />
      <Roadmap />
      <ContactForm />
    </>
  );
};

const App = () => {
  return (
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
      <ScrollToTop />

      <Header />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* About */}
        <Route path="/about" element={<About />} />

        {/* Services */}
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />

        {/* Products */}
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />

        {/* Contact */}
        <Route path="/contact" element={<ContactForm />} />

        {/* Careers */}
        <Route path="/careers" element={<Careers />} />

        {/* Team */}
        <Route path="/team" element={<Team />} />
        {/* <Route path="/team/:slug" element={<TeamMemberPage />} /> */}

        {/* 404 / unknown routes */}
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
      <ButtonGradient />
    </div>
  );
};

export default App;