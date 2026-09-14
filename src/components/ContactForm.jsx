"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "react-toastify/dist/ReactToastify.css";
import Section from "./Section";
import AnimatedGlobe from "./AnimatedGlobe";

const fieldVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

// same rim-light gradient border used across About/Services/Products/Roadmap —
// worth lifting into one shared component file at this point
const Panel = ({ accent = "mixed", className = "", children }) => {
  const gradients = {
    red: "from-[#e11d2e]/40 via-n-6 to-n-6",
    gold: "from-[#c9a227]/40 via-n-6 to-n-6",
    mixed: "from-[#e11d2e]/30 via-n-6 to-[#c9a227]/30",
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

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
    <Section id="contact">
      <ToastContainer position="top-right" autoClose={4000} theme="dark" />
      <div className="container relative z-2">
        {/* ambient atmosphere, same language as About/Services */}
        <div className="absolute top-0 right-0 w-[40rem] h-[30rem] rounded-full bg-[#e11d2e]/[0.06] blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[26rem] h-[26rem] rounded-full bg-[#c9a227]/[0.06] blur-[110px] pointer-events-none" />

        <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Form panel */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
          >
            <Panel accent="mixed">
              <div className="p-8 lg:p-10">
                <motion.p variants={fieldVariants} className="tagline text-n-4 mb-3">
                  Get in touch
                </motion.p>
                <motion.h2 variants={fieldVariants} className="h2 mb-4">
                  Tell us what you&apos;re building.
                </motion.h2>
                <motion.p variants={fieldVariants} className="body-2 text-n-3 mb-8 max-w-md">
                  A short note is enough — team size, the problem you&apos;re
                  solving, and a rough timeline. We&apos;ll reply within a
                  business day.
                </motion.p>

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
                      rows="4"
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

          {/* Globe panel */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Panel accent="gold">
              <div className="relative flex flex-col items-center p-8 lg:p-10">
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
      </div>
    </Section>
  );
}