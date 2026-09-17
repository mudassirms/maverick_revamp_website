import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";

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

  // --------------------------------------------------
  // SCROLL + OUTSIDE CLICK
  // --------------------------------------------------
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

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // --------------------------------------------------
  // NAVIGATION
  // --------------------------------------------------
  const navItems = [
    {
      name: "Home",
      href: "/hero",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Services",
      href: "/services",
    },
    {
      name: "Products",
      href: "/products",
    },
    {
      name: "Contact",
      href: "/contact",
    },
    {
      name: "Careers",
      href: "/careers",
    },
  ];

  // --------------------------------------------------
  // DROPDOWN ITEMS
  // --------------------------------------------------
  const dropdownItems = {
    About: [
      {
        name: "About Us",
        href: "/about",
      },
      {
        name: "Meet the Team",
        href: "/team",
      },
    ],

    Products: products.map((p) => ({
      name: p.title,
      href: `/products/${p.slug}`,
    })),

    Services: services.map((s) => ({
      name: s.title,
      href: `/services/${s.slug}`,
    })),

    Careers: [
      {
        name: "Open Roles",
        href: "/careers",
      },
    ],
  };

  const isDropdown = (name) => {
    return Object.prototype.hasOwnProperty.call(dropdownItems, name);
  };

  // --------------------------------------------------
  // ACTIVE NAV ITEM
  // --------------------------------------------------
  const isActive = (item) => {
    if (isDropdown(item.name)) {
      return dropdownItems[item.name].some((sub) => {
        if (sub.href.includes("#")) {
          return location.pathname === sub.href.split("#")[0];
        }

        return (
          location.pathname === sub.href ||
          location.pathname.startsWith(`${sub.href}/`)
        );
      });
    }

    if (item.href.startsWith("#")) {
      return (
        location.pathname === "/" &&
        activeSection === item.href
      );
    }

    return location.pathname === item.href;
  };

  const activeItem = navItems.find(isActive)?.name ?? null;

  const highlightedItem =
    hoveredItem ?? activeItem;

  // --------------------------------------------------
  // SECTION SCROLL
  // --------------------------------------------------
  const scrollToSection = (hash) => {
    const sectionId = hash.replace("#", "");

    if (location.pathname !== "/") {
      navigate(`/${hash}`);
      return;
    }

    const el = document.getElementById(sectionId);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // --------------------------------------------------
  // CLOSE MENU
  // --------------------------------------------------
  const closeMenu = () => {
    setIsMenuOpen(false);
    enablePageScroll();
  };

  // --------------------------------------------------
  // TOP NAV CLICK
  // --------------------------------------------------
  const handleNavClick = (href) => {
    closeMenu();
    setOpenDropdown(null);

    if (href.startsWith("#")) {
      scrollToSection(href);
    } else {
      navigate(href);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // --------------------------------------------------
  // SUB MENU CLICK
  // --------------------------------------------------
  const handleSubItemClick = (href) => {
    closeMenu();
    setOpenDropdown(null);

    if (href.includes("#")) {
      const [path, hash] = href.split("#");

      if (location.pathname === path) {
        setTimeout(() => {
          const el = document.getElementById(hash);

          if (el) {
            el.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 100);
      } else {
        navigate(href);
      }

      return;
    }

    navigate(href);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // --------------------------------------------------
  // MOBILE MENU
  // --------------------------------------------------
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

  // --------------------------------------------------
  // NAV LABEL
  // --------------------------------------------------
  const navLabelClass = (item) => `
    font-code
    text-[12px]
    font-semibold
    uppercase
    tracking-[0.14em]
    transition-colors
    duration-200
    cursor-pointer
    whitespace-nowrap
    ${
      isActive(item)
        ? "text-[#1D4ED8]"
        : "text-n-3 hover:text-n-1"
    }
  `;

  return (
    <header
      className={`
        fixed
        top-0
        left-0
        right-0
        z-[100]
        overflow-visible
        transition-all
        duration-300
        border-b
        border-n-6
        ${
          isScrolled
            ? "bg-n-8/95 backdrop-blur-md py-2 shadow-[0_4px_20px_rgba(20,22,27,0.08)]"
            : "bg-n-8 py-3"
        }
      `}
    >
      {/* Premium accent line */}
      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-[#3B89F6]/70
          to-transparent
          pointer-events-none
        "
      />

      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          flex
          items-center
          justify-between
          h-16
        "
      >
        {/* =====================================================
            LOGO
        ===================================================== */}
        <Link
          to="/"
          className="
            flex
            items-center
            space-x-3
            shrink-0
          "
        >
          <img
            src="/maverick-logo.png"
            alt="Maverick Ignite Logo"
            className="
              h-10
              sm:h-14
              w-auto
              object-contain
            "
          />

          <div className="leading-tight">
            <h1
              className="
                text-xl
                sm:text-2xl
                font-bold
                text-n-1
                whitespace-nowrap
              "
            >
              MAVERICK IGNITE
            </h1>

            <p
              className="
                text-sm
                font-bold
                text-[#1D4ED8]
                -mt-1
                tracking-wide
              "
            >
              SOLUTIONS LLP
            </p>
          </div>
        </Link>

        {/* =====================================================
            DESKTOP NAV
        ===================================================== */}
        <nav
          ref={dropdownRef}
          className="
            hidden
            md:flex
            items-center
            space-x-5
            lg:space-x-6
            xl:space-x-8
            h-full
            overflow-visible
          "
          onMouseLeave={() => setHoveredItem(null)}
        >
          {navItems.map((item) => {
            const isCareer = item.name === "Careers";

            return (
              <div
                key={item.name}
                className="
                  relative
                  flex
                  items-center
                  h-full
                  py-2
                "
                onMouseEnter={() =>
                  setHoveredItem(item.name)
                }
              >
                {/* ---------------------------------------------
                    NAV BUTTON
                --------------------------------------------- */}
                {isDropdown(item.name) ? (
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.name
                          ? null
                          : item.name
                      )
                    }
                    className={`
                      flex
                      items-center
                      gap-1.5
                      ${navLabelClass(item)}
                    `}
                  >
                    {item.name}

                    <ChevronDown
                      size={14}
                      strokeWidth={2}
                      className={`
                        transition-transform
                        duration-200
                        ${
                          openDropdown === item.name
                            ? "rotate-180"
                            : ""
                        }
                      `}
                    />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      handleNavClick(item.href)
                    }
                    className={navLabelClass(item)}
                  >
                    {item.name}
                  </button>
                )}

                {/* ---------------------------------------------
                    SLIDING ACTIVE UNDERLINE
                --------------------------------------------- */}
                {highlightedItem === item.name && (
                  <motion.span
                    layoutId="nav-underline"
                    className="
                      absolute
                      -bottom-0.5
                      left-0
                      right-0
                      h-[2px]
                      rounded-full
                      bg-gradient-to-r
                      from-[#1D4ED8]
                      to-[#3B82F6]
                    "
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                  />
                )}

                {/* =================================================
                    DESKTOP DROPDOWN
                ================================================= */}
                {openDropdown === item.name && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -6,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -6,
                      scale: 0.98,
                    }}
                    transition={{
                      duration: 0.18,
                      ease: "easeOut",
                    }}
                    className={`
                      absolute
                      top-[calc(100%+8px)]
                      ${
                        isCareer
                          ? "right-0"
                          : "left-0"
                      }
                      w-[260px]
                      bg-white
                      border
                      border-slate-200
                      rounded-2xl
                      p-2
                      z-[999]
                      shadow-[0_20px_50px_rgba(15,23,42,0.15)]
                      backdrop-blur-xl
                    `}
                  >
                    {/* Small top indicator */}
                    <div
                      className={`
                        absolute
                        -top-[5px]
                        ${
                          isCareer
                            ? "right-6"
                            : "left-6"
                        }
                        w-2.5
                        h-2.5
                        bg-white
                        border-l
                        border-t
                        border-slate-200
                        rotate-45
                      `}
                    />

                    {/* Dropdown items */}
                    <div className="relative">
                      {dropdownItems[item.name].map(
                        (subItem) => (
                          <button
                            key={subItem.name}
                            type="button"
                            onClick={() =>
                              handleSubItemClick(
                                subItem.href
                              )
                            }
                            className="
                              group
                              relative
                              flex
                              items-center
                              justify-between
                              w-full
                              text-left
                              px-4
                              py-3
                              rounded-xl
                              text-sm
                              font-medium
                              text-slate-600
                              hover:text-slate-900
                              hover:bg-slate-50
                              transition-all
                              duration-200
                            "
                          >
                            <span className="relative z-10">
                              {subItem.name}
                            </span>

                            <ArrowUpRight
                              size={16}
                              className="
                                text-[#2563EB]
                                opacity-0
                                translate-x-[-4px]
                                group-hover:opacity-100
                                group-hover:translate-x-0
                                transition-all
                                duration-200
                              "
                            />

                            {/* Hover accent */}
                            <span
                              className="
                                absolute
                                left-0
                                top-1/2
                                -translate-y-1/2
                                w-0
                                group-hover:w-1
                                h-7
                                rounded-r-full
                                bg-[#2563EB]
                                transition-all
                                duration-200
                              "
                            />
                          </button>
                        )
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </nav>

        {/* =====================================================
            MOBILE MENU BUTTON
        ===================================================== */}
        <button
          type="button"
          onClick={toggleMenu}
          className="
            md:hidden
            text-n-1
            p-2
            rounded-lg
            hover:bg-slate-100
            transition-colors
          "
          aria-label={
            isMenuOpen
              ? "Close menu"
              : "Open menu"
          }
        >
          {isMenuOpen ? (
            <X size={22} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* =====================================================
          MOBILE DROPDOWN MENU
      ===================================================== */}
      {isMenuOpen && (
        <motion.div
          initial={{
            opacity: 0,
            height: 0,
          }}
          animate={{
            opacity: 1,
            height: "auto",
          }}
          exit={{
            opacity: 0,
            height: 0,
          }}
          transition={{
            duration: 0.25,
          }}
          className="
            md:hidden
            bg-n-8/98
            backdrop-blur-md
            text-n-1
            px-5
            py-5
            space-y-4
            border-t
            border-n-6
            shadow-lg
            max-h-[calc(100vh-80px)]
            overflow-y-auto
          "
        >
          {navItems.map((item) => (
            <div key={item.name}>
              {/* ---------------------------------------------
                  MOBILE TOP LEVEL
              --------------------------------------------- */}
              {isDropdown(item.name) ? (
                <button
                  type="button"
                  onClick={() =>
                    toggleMobileDropdown(item.name)
                  }
                  className="
                    flex
                    justify-between
                    items-center
                    w-full
                    font-code
                    text-[13px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-n-1
                  "
                >
                  <span>{item.name}</span>

                  <ChevronDown
                    size={16}
                    className={`
                      transition-transform
                      duration-200
                      ${
                        openMobileDropdowns[item.name]
                          ? "rotate-180"
                          : ""
                      }
                    `}
                  />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    handleNavClick(item.href)
                  }
                  className={`
                    block
                    ${navLabelClass(item)}
                  `}
                >
                  {item.name}
                </button>
              )}

              {/* ---------------------------------------------
                  MOBILE SUB ITEMS
              --------------------------------------------- */}
              {isDropdown(item.name) &&
                openMobileDropdowns[item.name] && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                    }}
                    className="
                      ml-4
                      mt-3
                      pl-4
                      border-l
                      border-slate-200
                      space-y-3
                    "
                  >
                    {dropdownItems[item.name].map(
                      (subItem) => (
                        <button
                          key={subItem.name}
                          type="button"
                          onClick={() =>
                            handleSubItemClick(
                              subItem.href
                            )
                          }
                          className="
                            block
                            text-left
                            text-sm
                            text-n-4
                            hover:text-[#1D4ED8]
                            transition-colors
                          "
                        >
                          {subItem.name}
                        </button>
                      )
                    )}
                  </motion.div>
                )}
            </div>
          ))}
        </motion.div>
      )}
    </header>
  );
};

export default Header;