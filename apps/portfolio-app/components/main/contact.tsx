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
    <section id="contact" className="relative w-full bg-white">
      <div className="relative w-screen mx-[calc(50%-50vw)] px-6 md:px-10 py-24 md:py-32">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="mb-20">
            <motion.h2
              variants={item}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 tracking-tight"
            >
              Let&apos;s Work Together
            </motion.h2>
            <motion.p
              variants={item}
              className="text-lg md:text-xl text-gray-600 max-w-2xl"
            >
              Ready to bring your ideas to life? Let&apos;s discuss your next project
            </motion.p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon;
                const content = (
                  <motion.div
                    variants={item}
                    className="group relative rounded-2xl bg-black/[0.02] hover:bg-black/[0.04] p-6 transition-all duration-300 border border-black/5 hover:border-black/10"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-black flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-sm text-gray-500 mb-1 font-medium uppercase tracking-wider">{info.label}</p>
                        <p className="text-black font-medium text-base">{info.value}</p>
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
              className="lg:sticky lg:top-32 space-y-8"
            >
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-black mb-4 tracking-tight">
                  Ready to Start?
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  I&apos;m always interested in new opportunities and exciting projects.
                  Whether you have a question or just want to say hi, I&apos;ll try my
                  best to get back to you!
                </p>
              </div>

              <Link
                href="mailto:sawantnikhil122@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-black hover:bg-black/90 px-8 py-4 text-base font-medium text-white transition-all duration-300 hover:scale-[1.02]"
              >
                <RxEnvelopeClosed className="w-5 h-5" />
                Email Me
              </Link>

              {/* Social Links */}
              <div className="pt-8 border-t border-black/10">
                <p className="text-sm text-gray-500 mb-4 font-medium uppercase tracking-wider">Connect</p>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <Link
                        key={social.name}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-xl bg-black/[0.04] hover:bg-black/[0.08] border border-black/5 hover:border-black/10 flex items-center justify-center transition-all duration-300 hover:scale-105"
                        aria-label={social.name}
                      >
                        <Icon className="w-5 h-5 text-black" />
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
