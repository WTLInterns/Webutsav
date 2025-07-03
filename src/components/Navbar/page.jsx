"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../../components/ui/button"

const Navbar = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const servicesRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setIsServicesOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    setIsServicesOpen(false)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setIsServicesOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/Webutsav__3.png" 
              alt="WebUtsav Logo" 
              width={350} 
              height={250} 
              className="h-24 w-auto transform transition-transform duration-300 hover:scale-105" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/" isScrolled={isScrolled}>
              Home
            </NavLink>
            <NavLink href="/AboutUs" isScrolled={isScrolled}>
              About Us
            </NavLink>
            <div
              className="relative group"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
              ref={servicesRef}
            >
              <button
                className={`${
                  isScrolled ? "text-gray-800" : "text-white"
                } hover:text-amber-500 transition-colors flex items-center group`}
              >
                Services
                <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <AnimatePresence>{isServicesOpen && <ServicesDropdown />}</AnimatePresence>
            </div>
            <NavLink href="/Blog" isScrolled={isScrolled}>
              Blog
            </NavLink>
            <NavLink href="/Contact" isScrolled={isScrolled}>
              Contact
            </NavLink>
            <NavLink href="/Career" isScrolled={isScrolled}>
              Careers
            </NavLink>
          </div>

          {/* Client Login Button */}
          {/* <Link
            href="/login"
            className={`hidden md:inline-block ${
              isScrolled ? "bg-amber-400 text-white" : "bg-white text-amber-400"
            } hover:bg-amber-500 hover:text-white px-6 py-2 rounded-md transition-colors duration-300 transform hover:scale-105`}
          >
            Client Login
          </Link> */}

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden ${isScrolled ? "text-gray-800" : "text-white"} focus:outline-none`}
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <MobileNavLink href="/" onClick={closeMobileMenu}>
                  Home
                </MobileNavLink>
                <MobileNavLink href="/aboutus" onClick={closeMobileMenu}>
                  About Us
                </MobileNavLink>
                <div>
                  <button
                    className="w-full text-left px-3 py-2 text-base font-medium text-gray-800 hover:text-amber-500 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center justify-between"
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                  >
                    Services
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {isServicesOpen && <MobileServicesDropdown closeMobileMenu={closeMobileMenu} />}
                  </AnimatePresence>
                </div>
                <MobileNavLink href="/blog" onClick={closeMobileMenu}>
                  Blog
                </MobileNavLink>
                <MobileNavLink href="/contact" onClick={closeMobileMenu}>
                  Contact
                </MobileNavLink>
                {/* <Link
                  href="/login"
                  className="block px-3 py-2 text-base font-medium text-white bg-amber-400 hover:bg-amber-500 rounded-md transition-colors duration-300 transform hover:scale-105"
                  onClick={closeMobileMenu}
                >
                  Client Login
                </Link> */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

const NavLink = ({ href, children, isScrolled }) => (
  <Link
    href={href}
    className={`${
      isScrolled ? "text-gray-800" : "text-white"
    } hover:text-amber-500 transition-colors duration-200 relative group`}
  >
    {children}
    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
  </Link>
)

const MobileNavLink = ({ href, children, onClick }) => (
  <Link
    href={href}
    className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-amber-500 hover:bg-gray-50 rounded-md transition-colors duration-200"
    onClick={onClick}
  >
    {children}
  </Link>
)

const ServicesDropdown = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
  >
    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
      <DropdownLink href="/Services/web-designing-development">Web Designing & Development</DropdownLink>
      <DropdownLink href="/Services//ecommerce-website-designing">Ecommerce Website Designing</DropdownLink>
      <DropdownLink href="/Services/google-adwords">Google Adwords</DropdownLink>
      <DropdownLink href="/Services/search-engine-optimisation">Search Engine Optimization</DropdownLink>
      <DropdownLink href="/Services/local-seo">Local SEO</DropdownLink>
      <DropdownLink href="/Services/social-media-marketing">Social Media Marketing</DropdownLink>
      <DropdownLink href="/Services/mobile-application">Mobile Application Development</DropdownLink>
      <DropdownLink href="/Services/cab-expenses-tracker">Cab Expenses Tracker</DropdownLink>
    </div>
  </motion.div>
)

const MobileServicesDropdown = ({ closeMobileMenu }) => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.2 }}
    className="pl-4 overflow-hidden"
  >
    <MobileNavLink href="/Services/web-designing-development" onClick={closeMobileMenu}>
      Web Designing & Development
    </MobileNavLink>
    <MobileNavLink href="/Services//ecommerce-website-designing" onClick={closeMobileMenu}>
      Ecommerce Website Designing
    </MobileNavLink>
    <MobileNavLink href="/Services/google-adwords" onClick={closeMobileMenu}>
      Google Adwords
    </MobileNavLink>
    <MobileNavLink href="/Services/search-engine-optimisation" onClick={closeMobileMenu}>
      Search Engine Optimization
    </MobileNavLink>
    <MobileNavLink href="/Services/local-seo" onClick={closeMobileMenu}>
      Local SEO
    </MobileNavLink>
    <MobileNavLink href="/Services/social-media-marketing" onClick={closeMobileMenu}>
      Social Media Marketing
    </MobileNavLink>
    <MobileNavLink href="/Services/mobile-application" onClick={closeMobileMenu}>
      Mobile Application Development
    </MobileNavLink>
    <MobileNavLink href="/Services/cab-expenses-tracker" onClick={closeMobileMenu}>
      Cab Expenses Tracker
    </MobileNavLink>
  </motion.div>
)

const DropdownLink = ({ href, children }) => (
  <Link
    href={href}
    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-amber-500 transition-colors duration-200"
  >
    {children}
  </Link>
)

export default Navbar