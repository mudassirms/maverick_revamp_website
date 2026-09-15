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


const AnimatedHeading = ({ text, className = "" }) => {
  const words = text.split(" ");
  const splitAt = words.length > 3 ? words.length - 2 : words.length - 1;
  const lead = words.slice(0, splitAt);
  const accent = words.slice(splitAt);

  const wordVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.h1
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.07,
            delayChildren: 0.1,
          },
        },
      }}
    >
      {lead.map((word, i) => (
        <motion.span
          key={`lead-${i}`}
          className="inline-block mr-[0.3em] text-n-1"
          variants={wordVariants}
        >
          {word}
        </motion.span>
      ))}

      {accent.map((word, i) => (
        <motion.span
          key={`accent-${i}`}
          className="inline-block mr-[0.3em] bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] bg-clip-text text-transparent"
          variants={wordVariants}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};

const fieldVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};


const Panel = ({ accent = "mixed", className = "", children }) => {
  const gradients = {
    red: "from-[#1D4ED8]/40 via-n-6 to-n-6",
    gold: "from-[#3B82F6]/40 via-n-6 to-n-6",
    mixed: "from-[#1D4ED8]/30 via-n-6 to-[#3B82F6]/30",
  };

  return (
    <div
      className={`rounded-3xl p-[1px] bg-gradient-to-br ${gradients[accent]} ${className}`}
    >
      <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-n-8 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

const InfoCard = ({ label, value, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      duration: 0.4,
      delay: index * 0.08,
    }}
    className="rounded-2xl border border-n-6 bg-n-7/80 backdrop-blur-sm px-5 py-4"
  >
    <p className="font-code text-[11px] uppercase tracking-wider text-n-4 mb-1">
      {label}
    </p>

    <p className="text-n-1 font-medium">{value}</p>
  </motion.div>
);


const contactDetails = [
  {
    label: "Email",
    value: " Business@maverickignite.com",
  },
  {
    label: "Phone / WhatsApp",
    value: "+91 9036666910",
  },
  {
    label: "Response time",
    value: "Within one business day",
  },
];


const OFFICE = {
  name: "Kengeri Satellite Town",
  address: "Kengeri Satellite Town, Bengaluru, Karnataka",
};

const MAPS_QUERY = encodeURIComponent(OFFICE.address);

const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;

const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;


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

          {/* Darken map so it sits naturally inside the dark theme */}
          <div className="absolute inset-0 pointer-events-none bg-n-8/25 mix-blend-multiply" />

        </div>

        <a
          href={MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-4 font-code text-xs font-bold uppercase tracking-wider text-[#1D4ED8] hover:text-[#3B82F6] transition-colors border-t border-n-6"
        >
          <span aria-hidden>📍</span>
          Open in Google Maps
        </a>
      </div>
    </Panel>
  </motion.div>
);


const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const isStandalonePage = location.pathname === "/contact";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: /\S+@\S+\.\S+/.test(value)
          ? ""
          : "Invalid email address",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: value ? "" : `${name} is required`,
      }));
    }
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));

    setErrors((prev) => ({
      ...prev,
      phone: value ? "" : "Phone number is required",
    }));
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
        {
          name,
          email,
          phone,
          message,
          time: new Date().toLocaleString(),
          title: "New Contact Form Submission",
        },
        "M-pTkSNkHoQjr6oSd"
      )
      .then(() => {
        toast.success("Message sent.");

        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        toast.error("Something went wrong. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };


  const inputClass = (field) =>
    `w-full p-3.5 rounded-xl bg-n-7 border text-n-1 placeholder-n-4 outline-none transition-colors duration-300 focus:border-[#1D4ED8]/70 ${
      errors[field]
        ? "border-[#ef4444]/70"
        : "border-n-6"
    }`;

  return (
    <div className="relative overflow-hidden">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        theme="dark"
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)",
        }}
      />


      <div
        className="absolute -top-40 -right-40 w-[32rem] h-[32rem] rounded-full blur-[130px] opacity-20 pointer-events-none"
        style={{
          background: "#1D4ED8",
        }}
      />

      <div
        className="absolute top-1/2 -left-40 w-[26rem] h-[26rem] rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{
          background: "#3B82F6",
        }}
      />


      <Section
        className="pt-[8rem]"
        id="contact"
      >
        <div className="w-full max-w-[1680px] mx-auto px-6 lg:px-10 xl:px-16 relative z-2">

          {isStandalonePage && (
            <nav
              aria-label="Breadcrumb"
              className="mb-10 flex flex-wrap items-center gap-2 font-code text-xs uppercase tracking-wider"
            >
              <Link
                to="/"
                className="text-n-4 hover:text-[#3B82F6] transition-colors"
              >
                Home
              </Link>

              <span className="text-n-2 select-none">
                ›
              </span> 

              <span
                className="text-[#3B82F6]"
                aria-current="page"
              >
                Contact
              </span>
            </nav>
          )}

          <div className="max-w-2xl mb-14">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="tagline text-n-4 mb-3"
            >
              Get in touch
            </motion.p>

            <AnimatedHeading
              text="Tell us what you're building"
              className="h1 mb-6"
            />

            <motion.p
              initial={{
                opacity: 0,
                y: 16,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.35,
              }}
              className="body-1 text-n-3"
            >
              A short note is enough — team size, the problem
              you&rsquo;re solving, and a rough timeline. We&rsquo;ll
              reply within a business day.
            </motion.p>
          </div>

          {/* ==================================================
              QUICK CONTACT INFO
              ================================================== */}

          <div className="grid sm:grid-cols-3 gap-4 mb-14">
            {contactDetails.map((c, i) => (
              <InfoCard
                key={c.label}
                {...c}
                index={i}
              />
            ))}
          </div>


          <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">


            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{
                staggerChildren: 0.08,
                delayChildren: 0.1,
              }}
            >
              <Panel
                accent="mixed"
                className="h-full"
              >
                <div className="p-8 lg:p-10">

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >

                    {/* NAME */}

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

                      {errors.name && (
                        <p className="text-[#ef4444] text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </motion.div>

                    {/* EMAIL */}

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

                      {errors.email && (
                        <p className="text-[#ef4444] text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </motion.div>

                    {/* PHONE */}

                    <motion.div variants={fieldVariants}>
                      <PhoneInput
                        country={"us"}
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        enableSearch={true}
                        searchPlaceholder="Search country"
                        preferredCountries={[
                          "us",
                          "in",
                          "gb",
                          "ca",
                        ]}
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

                      {errors.phone && (
                        <p className="text-[#ef4444] text-sm mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </motion.div>

                    {/* MESSAGE */}

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

                      {errors.message && (
                        <p className="text-[#ef4444] text-sm mt-1">
                          {errors.message}
                        </p>
                      )}
                    </motion.div>

                    <motion.div
                      variants={fieldVariants}
                      className="relative"
                    >
                      {!loading && (
                        <motion.span
                          className="absolute inset-0 rounded-xl border border-[#3B82F6]/60 pointer-events-none"
                          initial={{
                            opacity: 0.5,
                            scale: 1,
                          }}
                          animate={{
                            opacity: 0,
                            scale: 1.06,
                          }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "easeOut",
                          }}
                        />
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="relative w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-code text-xs font-bold uppercase tracking-wider text-n-8 bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] transition-transform duration-300 hover:scale-[1.015] disabled:opacity-60 disabled:hover:scale-100"
                      >
                        {loading && (
                          <span className="w-4 h-4 border-2 border-n-8 border-t-transparent rounded-full motion-safe:animate-spin" />
                        )}

                        {loading
                          ? "Sending…"
                          : "Send message"}
                      </button>
                    </motion.div>

                  </form>
                </div>
              </Panel>
            </motion.div>


            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Panel
                accent="gold"
                className="h-full"
              >
                <div className="relative flex flex-col items-center justify-center h-full p-8 lg:p-10">

                  {/* Blue ambient glow */}
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-[#3B82F6]/10 blur-[100px] pointer-events-none" />

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