import { Link } from "react-router-dom";

import Section from "./Section";

import { socials } from "../constants";
import { services } from "../config/services";

// --------------------------------------------------
// OFFICE INFORMATION
// --------------------------------------------------
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
        {/* =====================================================
            MAIN FOOTER
        ===================================================== */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-14">
          
          {/* ===================================================
              LOGO & ABOUT
          =================================================== */}
          <div className="lg:w-1/3">
            <Link
              to="/"
              className="flex items-center space-x-3 mb-3"
            >
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
              MaverickIgnite Solutions LLP specializes in AI software
              development, data management, and system integration solutions.
            </p>

            {/* Social Links */}
            <ul className="flex gap-4 mt-4">
              {socials.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.title}
                    className="
                      flex
                      items-center
                      justify-center
                      w-10
                      h-10
                      bg-n-8
                      border
                      border-n-6
                      rounded-full
                      transition-all
                      duration-200
                      hover:bg-[#1D4ED8]/10
                      hover:border-[#1D4ED8]/50
                      hover:-translate-y-0.5
                    "
                  >
                    <img
                      src={item.iconUrl}
                      width={16}
                      height={16}
                      alt={item.title}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ===================================================
              INFO COLUMNS
          =================================================== */}
          <div className="flex flex-col sm:flex-row justify-between flex-1 gap-8">

            {/* =================================================
                COMPANY
            ================================================= */}
            <div className="min-w-[150px]">
              <h4 className="font-semibold mb-4 text-n-1">
                Company
              </h4>

              <ul className="space-y-2 text-n-4 text-sm">
                <li>
                  <Link
                    to="/about"
                    className="
                      hover:text-[#1D4ED8]
                      transition-colors
                    "
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    to="/careers"
                    className="
                      hover:text-[#1D4ED8]
                      transition-colors
                    "
                  >
                    Careers
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    className="
                      hover:text-[#1D4ED8]
                      transition-colors
                    "
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* =================================================
                SERVICES
                Uses the EXACT same services config as Header
            ================================================= */}
            <div className="min-w-[220px]">
              <h4 className="font-semibold mb-4 text-n-1">
                Services
              </h4>

              <ul className="space-y-3 text-n-4 text-sm leading-relaxed">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      to={`/services/${service.slug}`}
                      className="
                        group
                        inline-flex
                        items-center
                        gap-1.5
                        hover:text-[#1D4ED8]
                        transition-all
                        duration-200
                      "
                    >
                      <span>
                        {service.title}
                      </span>

                      <span
                        className="
                          text-[#3B82F6]
                          opacity-0
                          -translate-x-1
                          group-hover:opacity-100
                          group-hover:translate-x-0
                          transition-all
                          duration-200
                        "
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* =================================================
                GET IN TOUCH
            ================================================= */}
            <div className="min-w-[220px]">
              <h4 className="font-semibold mb-4 text-n-1">
                Get In Touch
              </h4>

              {/* Email */}
              <p className="text-n-4 text-sm">
                Email:{" "}
                <a
                  href="mailto:Business@maverickignite.com"
                  className="
                    hover:text-[#1D4ED8]
                    transition-colors
                  "
                >
                  Business@maverickignite.com
                </a>
              </p>

              {/* Phone */}
              <p className="text-n-4 text-sm mt-2">
                Phone:{" "}
                <a
                  href="tel:+919036666910"
                  className="
                    hover:text-[#1D4ED8]
                    transition-colors
                  "
                >
                  +91 9036666910
                </a>
              </p>

              {/* Address */}
              <p className="text-n-4 text-sm mt-2">
                Address:{" "}
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    hover:text-[#1D4ED8]
                    transition-colors
                  "
                >
                  {OFFICE_ADDRESS}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM STRIP
        ===================================================== */}
        <div
          className="
            border-t
            border-n-6
            mt-8
            pt-4
            text-center
            text-n-4
            text-xs
            sm:text-sm
          "
        >
          {/* Copyright */}
          <p className="mb-2">
            © {new Date().getFullYear()}{" "}
            <span className="text-n-1 font-semibold">
              MAVERICK IGNITE SOLUTIONS LLP
            </span>
            . All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex justify-center items-center gap-3 mb-1">
            <Link
              to="/privacy-policy"
              className="
                hover:text-[#1D4ED8]
                transition-colors
              "
            >
              Privacy Policy
            </Link>

            <span>|</span>

            <Link
              to="/terms-of-service"
              className="
                hover:text-[#1D4ED8]
                transition-colors
              "
            >
              Terms of Service
            </Link>
          </div>

          {/* Crafted By */}
          <div className="text-right">
            Crafted by{" "}
            <a
              href="https://www.linkedin.com/in/mudassir269251"
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-[#1D4ED8]
                font-medium
                hover:underline
              "
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