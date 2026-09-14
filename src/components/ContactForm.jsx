import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "react-toastify/dist/ReactToastify.css";
import Section from "../components/Section";
import AnimatedGlobe from "../components/AnimatedGlobe";

// two-tone heading, same trick as the service/product pages — just
// switched to the contact form's red-to-gold gradient.
const AnimatedHeading = ({ text, className = "" }) => {
  const words = text.split(" ");
  const splitAt = words.length > 3 ? words.length - 2 : words.length - 1;
  const lead = words.slice(0, splitAt);
  const accent = words.slice(splitAt);

  const wordVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.h1
      className={className}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
    >
      {lead.map((word, i) => (
        <motion.span key={`lead-${i}`} className="inline-block mr-[0.3em] text-n-1" variants={wordVariants}>
          {word}
        </motion.span>
      ))}
      {accent.map((word, i) => (
        <motion.span
          key={`accent-${i}`}
          className="inline-block mr-[0.3em] bg-gradient-to-r from-[#e11d2e] to-[#c9a227] bg-clip-text text-transparent"
          variants={wordVariants}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};

const fieldVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

// same rim-light gradient border used across About/Services/Products/Roadmap —
// still worth lifting into one shared component file at some point
const Panel = ({ accent = "mixed", className = "", children }) => {
  const gradients = {
    red: "from-[#e11d2e]/40 via-n-6 to-n-6",
    gold: "from-[#c9a227]/40 via-n-6 to-n-6",
    mixed: "from-[#e11d2e]/30 via-n-6 to-[#c9a227]/30",
  };
  return (
    <div className={`rounded-3xl p-[1px] bg-gradient-to-br ${gradients[accent]} ${className}`}>
      <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-n-8 overflow-hidden">{children}</div>
    </div>
  );
};

const InfoCard = ({ label, value, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
    className="rounded-2xl border border-n-6 bg-n-7/80 backdrop-blur-sm px-5 py-4"
  >
    <p className="font-code text-[11px] uppercase tracking-wider text-n-4 mb-1">{label}</p>
    <p className="text-n-1 font-medium">{value}</p>
  </motion.div>
);

// swap these for your real details
const contactDetails = [
  { label: "Email", value: " Business@maverickignite.com" },
  { label: "Phone / WhatsApp", value: "+91 9036666910" },
  { label: "Response time", value: "Within one business day" },
];

// swap for your real office address
const OFFICE = {
  name: "Kengeri Satellite Town",
  address: "Kengeri Satellite Town, Bengaluru, Karnataka",
};
const MAPS_QUERY = encodeURIComponent(OFFICE.address);
const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

// dark-themed version of the "map + floating location card + open in
// maps" pattern — same building blocks as a typical embedded-maps
// contact section, restyled to match this site instead of Google's
// default light chrome.
const MapCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6 }}
    className="mt-16"
  >
    <p className="tagline text-n-4 mb-5">Find us</p>

    <Panel accent="red">
      <div className="relative">
        <div className="relative w-full aspect-[16/7] min-h-[280px]">
          <iframe
            title="Office location"
            src={MAPS_EMBED_SRC}
            className="absolute inset-0 w-full h-full grayscale-[35%] contrast-[1.05] brightness-[0.9]"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {/* darken + tint the map slightly so it sits inside the dark theme
              instead of glowing as a bright rectangle */}
          <div className="absolute inset-0 pointer-events-none bg-n-8/25 mix-blend-multiply" />

          {/* floating location card, same idea as Google's own info window */}
          {/* <div className="absolute left-4 top-4 sm:left-6 sm:top-6 max-w-[260px] rounded-2xl border border-n-6 bg-n-8/95 backdrop-blur-sm p-4 shadow-xl">
            <p className="font-medium text-n-1 mb-1">{OFFICE.name}</p>
            <p className="text-xs text-n-3 leading-relaxed">{OFFICE.address}</p>
          </div> */}
        </div>

        <a
          href={MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-4 font-code text-xs font-bold uppercase tracking-wider text-[#e11d2e] hover:text-[#c9a227] transition-colors border-t border-n-6"
        >
          <span aria-hidden>📍</span>
          Open in Google Maps
        </a>
      </div>
    </Panel>
  </motion.div>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // this same component is rendered both as the standalone /contact route
  // and as the embedded "Contact" section on the homepage (Section id="contact").
  // Only the standalone page should show a breadcrumb — on the homepage it'd
  // be redundant with the nav the visitor is already scrolled through.
  const location = useLocation();
  const isStandalonePage = location.pathname === "/contact";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "email") {
      setErrors((prev) => ({ ...prev, email: /\S+@\S+\.\S+/.test(value) ? "" : "Invalid email address" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: value ? "" : `${name} is required` }));
    }
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
    setErrors((prev) => ({ ...prev, phone: value ? "" : "Phone number is required" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message, phone } = formData;
    if (!name || !email || !message || !phone) {
      toast.error("Please fill out all fields.");
      return;
    }
    if (errors.email || errors.phone) {
      toast.error("Please correct the errors.");
      return;
    }
    setLoading(true);
    emailjs
      .send(
        "service_04odo0c",
        "template_gqgqb4c",
        { name, email, phone, message, time: new Date().toLocaleString(), title: "New Contact Form Submission" },
        "M-pTkSNkHoQjr6oSd"
      )
      .then(() => {
        toast.success("Message sent.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        toast.error("Something went wrong. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  const inputClass = (field) =>
    `w-full p-3.5 rounded-xl bg-n-7 border text-n-1 placeholder-n-4 outline-none transition-colors duration-300 focus:border-[#c9a227]/70 ${
      errors[field] ? "border-[#e11d2e]/70" : "border-n-6"
    }`;

  return (
    <div className="relative overflow-hidden">
      <ToastContainer position="top-right" autoClose={4000} theme="dark" />

      {/* full-bleed grid texture — same treatment as the service/product pages */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)",
        }}
      />

      <div
        className="absolute -top-40 -right-40 w-[32rem] h-[32rem] rounded-full blur-[130px] opacity-20 pointer-events-none"
        style={{ background: "#e11d2e" }}
      />
      <div
        className="absolute top-1/2 -left-40 w-[26rem] h-[26rem] rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ background: "#c9a227" }}
      />

      <Section className="pt-[8rem]" id="contact">
        <div className="w-full max-w-[1680px] mx-auto px-6 lg:px-10 xl:px-16 relative z-2">

          {/* ==================================================
              BREADCRUMB
              Home > Contact — only on the standalone /contact page,
              never when this section is embedded in the homepage
             ================================================== */}
          {isStandalonePage && (
            <nav
              aria-label="Breadcrumb"
              className="mb-10 flex flex-wrap items-center gap-2 font-code text-xs uppercase tracking-wider"
            >
              <Link to="/" className="text-n-4 hover:text-[#c9a227] transition-colors">
                Home
              </Link>

              <span className="text-n-6 select-none">›</span>

              <span className="text-[#c9a227]" aria-current="page">
                Contact
              </span>
            </nav>
          )}

          {/* page hero */}
          <div className="max-w-2xl mb-14">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="tagline text-n-4 mb-3"
            >
              Get in touch
            </motion.p>
            <AnimatedHeading text="Tell us what you're building" className="h1 mb-6" />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="body-1 text-n-3"
            >
              A short note is enough — team size, the problem you&rsquo;re solving, and a rough
              timeline. We&rsquo;ll reply within a business day.
            </motion.p>
          </div>

          {/* quick contact info */}
          <div className="grid sm:grid-cols-3 gap-4 mb-14">
            {contactDetails.map((c, i) => (
              <InfoCard key={c.label} {...c} index={i} />
            ))}
          </div>

          <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
            {/* form panel */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
            >
              <Panel accent="mixed" className="h-full">
                <div className="p-8 lg:p-10">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <motion.div variants={fieldVariants}>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={inputClass("name")}
                        required
                      />
                      {errors.name && <p className="text-[#e11d2e] text-sm mt-1">{errors.name}</p>}
                    </motion.div>

                    <motion.div variants={fieldVariants}>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Work email"
                        className={inputClass("email")}
                        required
                      />
                      {errors.email && <p className="text-[#e11d2e] text-sm mt-1">{errors.email}</p>}
                    </motion.div>

                    <motion.div variants={fieldVariants}>
                      <PhoneInput
                        country={"us"}
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        enableSearch={true}
                        searchPlaceholder="Search country"
                        preferredCountries={["us", "in", "gb", "ca"]}
                        inputClass="!w-full !p-3.5 !bg-n-7 !text-n-1 !border !border-n-6 !rounded-xl"
                        buttonClass="!bg-n-7 !border-n-6 !rounded-l-xl"
                        dropdownClass="!bg-n-8 !text-n-1 !z-[1000] !max-h-[250px] !overflow-y-auto !border !border-n-6"
                        containerClass="!w-full"
                        searchStyle={{
                          backgroundColor: "#171821",
                          color: "#f4f4f5",
                          border: "1px solid #23242e",
                          borderRadius: "0.5rem",
                          padding: "0.5rem",
                          marginBottom: "0.5rem",
                        }}
                      />
                      {errors.phone && <p className="text-[#e11d2e] text-sm mt-1">{errors.phone}</p>}
                    </motion.div>

                    <motion.div variants={fieldVariants}>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="What are you trying to build?"
                        rows="5"
                        className={inputClass("message")}
                        required
                      />
                      {errors.message && <p className="text-[#e11d2e] text-sm mt-1">{errors.message}</p>}
                    </motion.div>

                    <motion.div variants={fieldVariants} className="relative">
                      {!loading && (
                        <motion.span
                          className="absolute inset-0 rounded-xl border border-[#c9a227]/60 pointer-events-none"
                          initial={{ opacity: 0.5, scale: 1 }}
                          animate={{ opacity: 0, scale: 1.06 }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                        />
                      )}
                      <button
                        type="submit"
                        disabled={loading}
                        className="relative w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-code text-xs font-bold uppercase tracking-wider text-n-8 bg-gradient-to-r from-[#e11d2e] to-[#c9a227] transition-transform duration-300 hover:scale-[1.015] disabled:opacity-60 disabled:hover:scale-100"
                      >
                        {loading && (
                          <span className="w-4 h-4 border-2 border-n-8 border-t-transparent rounded-full motion-safe:animate-spin" />
                        )}
                        {loading ? "Sending…" : "Send message"}
                      </button>
                    </motion.div>
                  </form>
                </div>
              </Panel>
            </motion.div>

            {/* globe panel */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Panel accent="gold" className="h-full">
                <div className="relative flex flex-col items-center justify-center h-full p-8 lg:p-10">
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-[#c9a227]/10 blur-[100px] pointer-events-none" />
                  <div className="relative aspect-square w-full max-w-sm">
                    <AnimatedGlobe />
                  </div>
                  <p className="tagline text-n-4 mt-6 text-center relative">
                    Every node is a decision your systems make for you.
                  </p>
                </div>
              </Panel>
            </motion.div>
          </div>

          <MapCard />
        </div>
      </Section>
    </div>
  );
};

export default ContactPage;