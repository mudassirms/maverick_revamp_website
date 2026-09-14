import { Link } from "react-router-dom";
import Section from "./Section";
import { socials } from "../constants";

// Single source of truth for the office address — also used on the
// Contact page (ContactPage.jsx OFFICE constant). If the address ever
// changes, update it in both places, or better, lift this into a shared
// constants file so it can never drift again.
const OFFICE_ADDRESS =
  "No 16 HIG-A Building No.20, 3rd Floor, KHB Colony, Shirke Layout, Kengeri, Bangalore 560060";
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  OFFICE_ADDRESS
)}`;

const Footer = () => {
  return (
    <Section
      crosses
      className="!px-0 !py-10 bg-n-7 text-n-1 border-t border-n-6"
    >
      <div className="container">
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-14">
          {/* Logo & About */}
          <div className="lg:w-1/3">
            <Link to="/" className="flex items-center space-x-3 mb-3">
              <img
                src="/maverick-logo.png"
                alt="Maverick Ignite Logo"
                className="h-10 sm:h-14 w-auto object-contain"
              />
              <div className="leading-tight">
                <h1 className="text-xl sm:text-2xl font-bold text-n-1">
                  MAVERICK IGNITE
                </h1>
                <p className="text-sm font-bold text-[#1D4ED8] -mt-1 tracking-wide">
                  SOLUTIONS LLP
                </p>
              </div>
            </Link>
            <p className="text-n-4 text-sm leading-relaxed mt-2">
              MaverickIgnite Solutions LLP specializes in AI software development,
              data management, and system integration solutions.
            </p>

            <ul className="flex gap-4 mt-4">
              {socials.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-n-8 border border-n-6 rounded-full transition-colors hover:bg-[#1D4ED8]/10 hover:border-[#1D4ED8]/50"
                >
                  <img src={item.iconUrl} width={16} height={16} alt={item.title} />
                </a>
              ))}
            </ul>
          </div>

          {/* Info Columns */}
          <div className="flex flex-col sm:flex-row justify-between flex-1 gap-8">
            <div className="min-w-[150px]">
              <h4 className="font-semibold mb-4 text-n-1">Company</h4>
              <ul className="space-y-2 text-n-4 text-sm">
                <li>
                  <a href="#about" className="hover:text-[#1D4ED8] transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <Link to="/careers" className="hover:text-[#1D4ED8] transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#1D4ED8] transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div className="min-w-[220px]">
              <h4 className="font-semibold mb-4 text-n-1">Services</h4>
              <ul className="space-y-3 text-n-4 text-sm leading-relaxed">
                <li>
                  <a href="#ai" className="hover:text-[#1D4ED8] transition-colors">
                    AI-Driven Software Development
                  </a>
                </li>
                <li>
                  <a href="#database" className="hover:text-[#1D4ED8] transition-colors">
                    Database Management & Smart Optimization
                  </a>
                </li>
                <li>
                  <a href="#integration" className="hover:text-[#1D4ED8] transition-colors">
                    System Integration & API Engineering
                  </a>
                </li>
              </ul>
            </div>

            <div className="min-w-[220px]">
              <h4 className="font-semibold mb-4 text-n-1">Get In Touch</h4>
              <p className="text-n-4 text-sm">
                Email:{" "}
                <a
                  href="mailto:Business@maverickignite.com"
                  className="hover:text-[#1D4ED8] transition-colors"
                >
                  Business@maverickignite.com
                </a>
              </p>
              <p className="text-n-4 text-sm mt-2">
                Phone:{" "}
                <a href="tel:+919036666910" className="hover:text-[#1D4ED8] transition-colors">
                  +91 9036666910
                </a>
              </p>
              <p className="text-n-4 text-sm mt-2">
                Address:{" "}
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1D4ED8] transition-colors"
                >
                  {OFFICE_ADDRESS}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="border-t border-n-6 mt-8 pt-4 text-center text-n-4 text-xs sm:text-sm">
          <p className="mb-2">
            © {new Date().getFullYear()}{" "}
            <span className="text-n-1 font-semibold">
              MAVERICK IGNITE SOLUTIONS LLP
            </span>
            . All rights reserved.
          </p>

          <div className="flex justify-center items-center gap-3 mb-1">
            <Link to="/privacy-policy" className="hover:text-[#1D4ED8] transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link to="/terms-of-service" className="hover:text-[#1D4ED8] transition-colors">
              Terms of Service
            </Link>
          </div>

          <div className="text-right">
            Crafted by{" "}
            <a
              href="https://www.linkedin.com/in/mudassir269251"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1D4ED8] font-medium hover:underline"
            >
              Mudassir Sanderwale
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Footer;