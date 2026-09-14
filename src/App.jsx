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
import ProductDetail from "./pages/ProductDetail";
import ServiceDetail from "./pages/ServiceDetail";
import TeamMoments from "./components/TeamMoments";
import Careers from "./pages/Careers";


const Home = () => (
  <>
    <Hero />
    <About />
    <TeamMoments />
    <Collaboration />
    <Services />
    <Products />
    <Roadmap />
    <ContactForm />
  </>
);

const App = () => {
  return (
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="*" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/careers" element={<Careers />} />
      </Routes>

      <Footer />

      <ButtonGradient />
    </div>
  );
};

export default App;