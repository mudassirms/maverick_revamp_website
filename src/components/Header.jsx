import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { Menu, X, ChevronDown } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openMobileDropdowns, setOpenMobileDropdowns] = useState({});
  const [activeSection, setActiveSection] = useState("");
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

useEffect(() => {
  const handleScroll = () => {
    const scrollY = window.scrollY;

    setIsScrolled(scrollY > 10);

    const sectionIds = [
      "hero",
      "about",
      "services",
      "products",
      "contact",
    ];

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
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target)
    ) {
      setOpenDropdown(null);
    }
  };

  window.addEventListener("scroll", handleScroll);
  document.addEventListener("mousedown", handleClickOutside);

  // Run once when page loads
  handleScroll();

  return () => {
    window.removeEventListener("scroll", handleScroll);
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Products", href: "#products" },
    { name: "Contact", href: "#contact" },
    { name: "Careers", href: "/careers" },
  ];

  const dropdownItems = {
    Products: [
      { name: "DataSense", href: "#products", id: "DataSense" },
      { name: "SupportSense", href: "#products", id: "SupportSense" },
      { name: "NotifyBot", href: "#products", id: "NotifyBot" },
    ],
    Services: [
      { name: "AI-Driven Software Development", href: "#services", id: "ai" },
      { name: "Enterprise Software Development", href: "#services", id: "data" },
      { name: "Database Management & Smart Optimization", href: "#services", id: "database" },
      { name: "Data Engineering & Analytics", href: "#services", id: "data-eng" },
      { name: "System Integration & API Engineering", href: "#services", id: "integration" },
      { name: "Full-Cycle Product Development", href: "#services", id: "product-development" },
    ],
    Careers: [
      { name: "Open Roles", href: "/careers" },
      { name: "Culture", href: "/culture" },
    ],
  };

  const isDropdown = (name) => Object.keys(dropdownItems).includes(name);

  const scrollToSection = (hash) => {
    const sectionId = hash.replace("#", "");

    if (location.pathname !== "/") {
      navigate(`/${hash}`);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-[#2a2530] ${
        isScrolled
          ? "bg-[#15131a]/95 backdrop-blur-md py-2 shadow-[0_4px_30px_rgba(0,0,0,0.35)]"
          : "bg-gradient-to-b from-[#1a1720] to-[#15131a] py-3"
      }`}
    >
      {/* thin premium accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e11d2e]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 mb-3">
          <img
            src="/maverick.png"
            alt="Maverick Ignite Logo"
            className="h-10 sm:h-14 w-auto object-contain"
          />
          <div className="leading-tight">
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              MAVERICK IGNITE
            </h1>
            <p className="text-sm font-bold text-[#c9a227] -mt-1 tracking-wide">
              SOLUTIONS LLP
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center space-x-4 xl:space-x-6 text-sm font-medium text-white"
          ref={dropdownRef}
        >
          {navItems.map((item) => (
            <div key={item.name} className="relative">
              {isDropdown(item.name) ? (
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === item.name ? null : item.name)
                  }
                  className={`flex items-center gap-1 nav-link tracking-wide cursor-pointer transition-colors hover:text-[#e11d2e] ${
                    activeSection === item.href ? "text-[#e11d2e]" : ""
                  }`}
                >
                  {item.name}
                  <ChevronDown size={16} />
                </button>
              ) : (
                <button
                  onClick={() => handleNavClick(item.href)}
                  className={`nav-link tracking-wide cursor-pointer transition-colors hover:text-[#e11d2e] ${
                    activeSection === item.href ? "text-[#e11d2e]" : ""
                  }`}
                >
                  {item.name}
                </button>
              )}

              {openDropdown === item.name && (
                <div className="absolute top-full left-0 mt-2 bg-[#1c1a22] border border-[#2a2530] shadow-[0_10px_40px_rgba(0,0,0,0.45)] rounded-md py-2 w-56 z-50">
                  {dropdownItems[item.name].map((subItem) => (
                    <button
                      key={subItem.name}
                      onClick={() =>
                        item.name === "Careers"
                          ? navigate(subItem.href)
                          : handleNavClick(subItem.href)
                      }
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-[#2a2530] hover:text-[#e11d2e] transition"
                    >
                      {subItem.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button onClick={toggleMenu} className="md:hidden text-white">
          {isMenuOpen ? <X size={20} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#15131a]/98 backdrop-blur-md text-white px-5 py-4 space-y-4 transition-all duration-300 border-t border-[#2a2530]">
          {navItems.map((item) => (
            <div key={item.name}>
              {isDropdown(item.name) ? (
                <button
                  onClick={() => toggleMobileDropdown(item.name)}
                  className="flex justify-between items-center w-full text-sm tracking-wide"
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
                <button
                  onClick={() => handleNavClick(item.href)}
                  className={`block nav-link text-sm tracking-wide transition-colors hover:text-[#e11d2e] ${
                    activeSection === item.href ? "text-[#e11d2e]" : ""
                  }`}
                >
                  {item.name}
                </button>
              )}

              {isDropdown(item.name) && openMobileDropdowns[item.name] && (
                <div className="ml-4 mt-1 space-y-2">
                  {dropdownItems[item.name].map((subItem) => (
                    <button
                      key={subItem.name}
                      onClick={() =>
                        item.name === "Careers"
                          ? navigate(subItem.href)
                          : handleNavClick(subItem.href)
                      }
                      className="block text-left text-sm text-gray-400 hover:text-[#e11d2e] transition-colors"
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