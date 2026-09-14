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

const App = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <About />
        
        <Collaboration />
        <Services />
        <Products />
        <Roadmap />
        <ContactForm />
        <Footer />
      </div>

      <ButtonGradient />
    </>
  );
};

export default App;
