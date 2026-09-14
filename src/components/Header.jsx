import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { Menu, X, ChevronDown } from "lucide-react";
import { products } from "../config/products";
import { services } from "../config/services";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openMobileDropdowns, setOpenMobileDropdowns] = useState({});
  const [activeSection, setActiveSection] = useState("");
  const [hoveredItem, setHoveredItem] = useState(null);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10);

      const sectionIds = ["hero", "about", "services", "products", "contact"];
      const headerOffset = 100;
      let currentSection = "hero";

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (!section) continue;
        const sectionTop = section.offsetTop - headerOffset;
        if (scrollY >= sectionTop) {
          currentSection = id;
        }
      }
      setActiveSection(`#${currentSection}`);
    };

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: "Home", href: "/hero" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/careers" },
  ];

  // dropdown entries now point at real routes (/products/:slug, /services/:slug)
  // built straight from the shared configs, so they always match what the
  // detail pages actually render.
  const dropdownItems = {
    Products: products.map((p) => ({ name: p.title, href: `/products/${p.slug}` })),
    Services: services.map((s) => ({ name: s.title, href: `/services/${s.slug}` })),
    Careers: [
      { name: "Open Roles", href: "/careers" },
      { name: "Culture", href: "/culture" },
    ],
  };

  const isDropdown = (name) => Object.keys(dropdownItems).includes(name);

  // whether a nav item counts as "current" — used to color it and to park
  // the sliding underline under it when nothing is being hovered
  const isActive = (item) => {
    if (isDropdown(item.name)) {
      return dropdownItems[item.name].some(
        (sub) => location.pathname === sub.href || location.pathname.startsWith(`${sub.href}/`)
      );
    }
    if (item.href.startsWith("#")) {
      return location.pathname === "/" && activeSection === item.href;
    }
    return location.pathname === item.href;
  };

  const activeItem = navItems.find(isActive)?.name ?? null;
  const highlightedItem = hoveredItem ?? activeItem;

  const scrollToSection = (hash) => {
    const sectionId = hash.replace("#", "");
    if (location.pathname !== "/") {
      navigate(`/${hash}`);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    enablePageScroll();
  };

  const handleNavClick = (href) => {
    closeMenu();
    setOpenDropdown(null);
    if (href.startsWith("#")) {
      scrollToSection(href);
    } else {
      navigate(href);
    }
  };

  // top-level nav items (Home/About/Services/Products/Contact) use hashes and
  // scroll on the home page; Careers and dropdown sub-items use real routes.
  const handleSubItemClick = (href) => {
    closeMenu();
    setOpenDropdown(null);
    if (href.startsWith("#")) {
      scrollToSection(href);
    } else {
      navigate(href);
      window.scrollTo(0, 0);
    }
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      setIsMenuOpen(true);
      disablePageScroll();
    }
  };

  const toggleMobileDropdown = (itemName) => {
    setOpenMobileDropdowns((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  // shared classes for the top-level nav label — monospace, uppercase,
  // wide tracking: the same "tagline" typography already used for badges,
  // section taglines, and buttons across the site, just applied to nav so
  // the header actually looks like it belongs to the same brand instead of
  // falling back to a generic sans nav-link style.
  const navLabelClass = (item) =>
    `font-code text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 cursor-pointer ${
      isActive(item) ? "text-[#1D4ED8]" : "text-n-3 hover:text-n-1"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-n-6 ${
        isScrolled
          ? "bg-n-8/95 backdrop-blur-md py-2 shadow-[0_4px_20px_rgba(20,22,27,0.08)]"
          : "bg-n-8 py-3"
      }`}
    >
      {/* thin premium accent line — blue */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B89F6]/70 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
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

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center space-x-6 xl:space-x-8"
          ref={dropdownRef}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative py-2"
              onMouseEnter={() => setHoveredItem(item.name)}
            >
              {isDropdown(item.name) ? (
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === item.name ? null : item.name)
                  }
                  className={`flex items-center gap-1.5 ${navLabelClass(item)}`}
                >
                  {item.name}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      openDropdown === item.name ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <button onClick={() => handleNavClick(item.href)} className={navLabelClass(item)}>
                  {item.name}
                </button>
              )}

              {/* sliding underline — shares a layoutId so it glides between
                  items instead of just popping in/out under each one */}
              {highlightedItem === item.name && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}

              {openDropdown === item.name && (
                <div className="absolute top-full left-0 mt-3 bg-n-8 border border-n-6 shadow-[0_20px_40px_rgba(0,0,0,0.35)] rounded-xl py-2 w-64 z-50">
                  {dropdownItems[item.name].map((subItem) => (
                    <button
                      key={subItem.name}
                      onClick={() => handleSubItemClick(subItem.href)}
                      className="group flex items-center justify-between w-full text-left px-4 py-2.5 mx-1 rounded-lg text-sm text-n-2 hover:bg-n-7 hover:text-n-1 transition-colors"
                      style={{ width: "calc(100% - 0.5rem)" }}
                    >
                      <span>{subItem.name}</span>
                      <span className="text-[#3B82F6] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                        →
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button onClick={toggleMenu} className="md:hidden text-n-1">
          {isMenuOpen ? <X size={20} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-n-8/98 backdrop-blur-md text-n-1 px-5 py-4 space-y-4 transition-all duration-300 border-t border-n-6">
          {navItems.map((item) => (
            <div key={item.name}>
              {isDropdown(item.name) ? (
                <button
                  onClick={() => toggleMobileDropdown(item.name)}
                  className="flex justify-between items-center w-full font-code text-[13px] font-semibold uppercase tracking-[0.14em] text-n-1"
                >
                  <span>{item.name}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      openMobileDropdowns[item.name] ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <button onClick={() => handleNavClick(item.href)} className={`block ${navLabelClass(item)}`}>
                  {item.name}
                </button>
              )}

              {isDropdown(item.name) && openMobileDropdowns[item.name] && (
                <div className="ml-4 mt-2 space-y-2.5">
                  {dropdownItems[item.name].map((subItem) => (
                    <button
                      key={subItem.name}
                      onClick={() => handleSubItemClick(subItem.href)}
                      className="block text-left text-sm text-n-4 hover:text-[#1D4ED8] transition-colors"
                    >
                      {subItem.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;