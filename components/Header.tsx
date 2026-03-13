"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Logo from "../public/logo/logo2.png";
import { Menu, X, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // don't render the header at all inside Sanity Studio
  if (pathname?.startsWith("/studio")) {
    return null;
  }

  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // const [] = use();

  // Smooth scroll
  const handleScrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      // Add background when scrolled
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { id: "home", leble: "Home", href: "/" },
    { id: "about", label: "About", href: "/about" },
    { id: "gallery", label: "Galleries", href: "/galleries" },
    { id: "videos", label: "Videos", href: "/videos" },
    { id: "contact", label: "Contact", href: "/contact" },
  ];
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent h-16 bg-transparent",
      )}>
      <div
        className={cn(
          "container mx-auto px-4 md:px-6 flex items-center",
          pathname === "/about" ? "justify-end" : "justify-between",
        )}>
        <Link href="/" className="group flex items-center gap-2 z-50 h-full">
          {/* hide the logo on the about page (header still present with nav links) */}
          {pathname !== "/about" && (
            <div className="relative flex items-center justify-center rounded-full text-background transition-transform group-hover:scale-105">
              {/* larger via transform so header height doesn't change */}
              <Image src={Logo} alt="Logo" className="w-18 h-18 scale-120" />
            </div>
          )}
          <span
            className={cn(
              "text-2xl font-display font-bold tracking-tight transition-colors",
              isScrolled ? "text-foreground" : "text-black",
            )}></span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className={cn(
            "hidden md:flex items-center gap-8",
            pathname === "/about" && "lg:mt-6",
          )}>
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => handleScrollTo(link.href)}
              className={cn(
                "text-sm font-medium transition-all hover:text-primary relative group py-2",
                pathname === link.href
                  ? "text-primary"
                  : isScrolled
                    ? "text-foreground/80"
                    : "text-white/90",
              )}>
              {link.label}
              <span
                className={cn(
                  "absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform origin-right group-hover:scale-x-100 group-hover:origin-left",
                  pathname === link.href && "scale-x-100",
                )}
              />
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className={cn(
            "md:hidden p-2 rounded-full transition-colors z-50",
            isScrolled
              ? "text-foreground hover:bg-muted"
              : "text-white hover:bg-white/10",
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 w-full bg-background border-b border-border shadow-2xl p-6 pt-24 md:hidden flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "text-xl font-display font-bold transition-colors",
                    pathname === link.href ? "text-primary" : "text-foreground",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
