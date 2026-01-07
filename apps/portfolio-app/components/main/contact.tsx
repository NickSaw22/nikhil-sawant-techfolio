"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { RxEnvelopeClosed, RxMobile, RxHome } from "react-icons/rx";
import { RxGithubLogo, RxLinkedinLogo } from "react-icons/rx";
import { SiHackerrank } from "react-icons/si";

const contactInfo = [
  {
    icon: RxEnvelopeClosed,
    label: "Email",
    value: "sawantnikhil122@gmail.com",
    link: "mailto:swanikhil122@gmail.com",
  },
  {
    icon: RxMobile,
    label: "Phone",
    value: "+91 8879075296",
    link: "tel:+918879075296",
  },
  {
    icon: RxHome,
    label: "Location",
    value: "Mumbai, India",
    link: null,
  },
];

const socialLinks = [
  {
    name: "LinkedIn",
    icon: RxLinkedinLogo,
    link: "https://www.linkedin.com/in/nikhil-m-sawant/",
  },
  {
    name: "GitHub",
    icon: RxGithubLogo,
    link: "https://github.com/NickSaw22",
  },
  {
    name: "HackerRank",
    icon: SiHackerrank,
    link: "https://www.hackerrank.com/profile/swanikhil217",
  },
];

export const Contact = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 25,
      },
    },
  };

  return (
    <section id="contact" className="relative w-full bg-[#0a0a0a]/60 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-screen mx-[calc(50%-50vw)] px-6 md:px-10 py-24 md:py-32">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="mb-24">
            <motion.h2
              variants={item}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-tight"
            >
              Let&apos;s Work{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Together
              </span>
            </motion.h2>
            <motion.p
              variants={item}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed"
            >
              Have an idea you&apos;d like to bring to life? Let&apos;s collaborate on your next project.
            </motion.p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-start">
            {/* Left: Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon;
                const content = (
                  <motion.div
                    variants={item}
                    className="group relative rounded-2xl mt-4 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-600/10 backdrop-blur-xl p-6 transition-all duration-500 border border-white/10 hover:border-purple-500/50 hover:from-purple-500/20 hover:via-pink-500/20 hover:to-purple-600/20 shadow-[0_8px_32px_rgba(139,92,246,0.15)] hover:shadow-[0_20px_60px_rgba(139,92,246,0.35)] cursor-pointer transform hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-purple-500/30">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wider">{info.label}</p>
                        <p className="text-white font-semibold text-base leading-relaxed">{info.value}</p>
                      </div>
                    </div>
                  </motion.div>
                );

                return info.link ? (
                  <Link key={idx} href={info.link} target="_blank" rel="noopener noreferrer">
                    {content}
                  </Link>
                ) : (
                  <div key={idx}>{content}</div>
                );
              })}
            </div>

            {/* Right: CTA Section */}
            <motion.div
              variants={item}
              className="lg:sticky lg:top-32 space-y-10"
            >
              <div className="space-y-6">
                <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                  Let&apos;s Connect
                </h3>
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                  I&apos;m always open to discussing new opportunities, innovative ideas, or potential collaborations.
                  Feel free to reach out I&apos;d love to hear from you!
                </p>
              </div>

              <Link
                href="mailto:sawantnikhil122@gmail.com"
                className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-10 py-5 text-lg font-semibold text-white transition-all duration-500 hover:scale-105 shadow-xl shadow-purple-600/40 hover:shadow-2xl hover:shadow-purple-600/60 group"
              >
                <RxEnvelopeClosed className="w-6 h-6 group-hover:rotate-12 transition-transform duration-500" />
                Get in Touch
              </Link>

              {/* Social Links */}
              <div className="pt-10 border-t border-white/10">
                <p className="text-sm text-gray-300 mb-6 font-semibold uppercase tracking-widest">Follow Me</p>
                <div className="flex items-center gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <Link
                        key={social.name}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 rounded-2xl bg-white/5 hover:bg-gradient-to-br hover:from-purple-500/30 hover:to-pink-600/30 border border-white/10 hover:border-purple-500/50 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:-rotate-6 backdrop-blur-xl hover:shadow-xl hover:shadow-purple-500/30 group"
                        aria-label={social.name}
                      >
                        <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-500" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
