'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { LINKS, NAV_LINKS, SOCIALS } from "../../constants";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(link => {
        const id = link.link.replace('#', '');
        return document.getElementById(id);
      }).filter(Boolean);

      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection('#' + section.id);
          break;
        }
      }
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="w-full h-[65px] fixed top-0 left-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001427] backdrop-blur-xl z-50 px-10 border-b border-white/5" aria-label="Primary">
      {/* Reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      
      {/* Navbar Container */}
      <div className="relative w-full h-full flex items-center justify-between m-auto px-[10px]">
        {/* Logo + Name */}
        <Link
          href="#about-me"
          className="flex items-center group"
        >
          <div className="relative">
            <Image
              src="/logo.png"
              alt="Logo"
              width={60}
              height={60}
              draggable={false}
              className="cursor-pointer transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </div>
          <div className="hidden md:flex font-bold ml-[10px] text-gray-300 md:text-lg group-hover:text-white transition-colors duration-300">Nikhil Sawant</div>
        </Link>

        {/* Web Navbar */}
        <div className="hidden md:flex h-full flex-row items-center md:mr-20">
          <div className="flex items-center w-auto h-auto border border-white/10 bg-white/5 backdrop-blur-md mr-[15px] px-6 py-2 rounded-full text-gray-200 whitespace-nowrap gap-6 lg:gap-8 shadow-lg">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className={`relative cursor-pointer transition-all duration-300 group ${
                  activeSection === link.link ? 'text-white font-semibold' : 'hover:text-white'
                }`}
              >
                <span className="relative z-10">{link.title}</span>
                <span className={`absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 transition-transform duration-300 origin-left ${
                  activeSection === link.link ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </Link>
            ))}

            {/* Source Code */}
            <Link
              href={LINKS.sourceCode}
              target="_blank"
              rel="noreferrer noopener"
              className="relative cursor-pointer hover:text-white transition-all duration-300 group"
            >
              <span className="relative z-10">Source Code</span>
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          </div>
        </div>

        {/* Social Icons (Web) */}
        <div className="hidden md:flex flex-row gap-5">
          {SOCIALS.map(({ link, name, icon: Icon }) => (
            <Link
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              key={name}
              className="group relative"
            >
              <Icon className="h-6 w-6 text-white transition-all duration-300 group-hover:scale-110 group-hover:text-purple-400" />
              <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </Link>
          ))}
        </div>

        {/* Hamburger Menu */}
        <button
          className="md:hidden text-white focus:outline-none text-4xl transition-transform duration-300 hover:scale-110"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[65px] left-0 w-full bg-[#030014]/95 backdrop-blur-xl border-b border-white/10 p-5 flex flex-col items-center text-gray-300 md:hidden shadow-2xl">
          {/* Links */}
          <div className="flex flex-col items-center gap-4 w-full">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className={`relative w-full text-center px-4 py-3 rounded-lg hover:bg-white/5 cursor-pointer transition-all duration-300 group ${
                  activeSection === link.link ? 'text-white font-semibold bg-white/5' : 'hover:text-white'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="relative z-10">{link.title}</span>
                <span className={`absolute inset-x-4 bottom-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 transition-transform duration-300 ${
                  activeSection === link.link ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </Link>
            ))}
            <Link
              href={LINKS.sourceCode}
              target="_blank"
              rel="noreferrer noopener"
              className="relative w-full text-center px-4 py-3 rounded-lg hover:bg-white/5 cursor-pointer hover:text-white transition-all duration-300 group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="relative z-10">Source Code</span>
              <span className="absolute inset-x-4 bottom-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 mt-6 pt-6 border-t border-white/10 w-full">
            {SOCIALS.map(({ link, name, icon: Icon }) => (
              <Link
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                key={name}
                className="group relative"
              >
                <Icon className="h-8 w-8 text-white transition-all duration-300 group-hover:scale-110 group-hover:text-purple-400" />
                <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};