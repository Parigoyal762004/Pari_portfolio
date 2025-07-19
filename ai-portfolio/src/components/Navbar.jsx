import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle"; // Assuming ThemeToggle is in the same directory

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu visibility
  const menuRef = useRef(null); // Ref for detecting clicks outside the mobile menu

  // Function to handle clicks on the "About" link
  const handleAboutClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    if (location.pathname === "/about") {
      navigate(0); // Reload the page if already on /about
    } else {
      navigate("/about"); // Navigate to /about
    }
    setIsMenuOpen(false); // Close menu after navigation
  };

  // Function to close the mobile menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Effect to close menu when route changes
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  // Effect to handle clicks outside the mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Common styles for navigation links
  const navLinkClasses = "block px-4 py-2 hover:text-pink dark:hover:text-blue transition-colors rounded-md";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-dark/70 border-b border-peach dark:border-blue shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Site Logo/Name */}
        <h1 className="text-xl font-extrabold tracking-tight text-dark dark:text-light">
          <Link to="/" className="hover:text-pink dark:hover:text-blue transition-colors">Pari’s Portfolio</Link>
        </h1>

        {/* Desktop Navigation Links */}
        <div className="hidden sm:flex items-center space-x-6 text-sm font-medium text-dark dark:text-light">
          <Link to="/" className="hover:text-pink dark:hover:text-blue transition-colors">Home</Link>
          <a href="/about" onClick={handleAboutClick} className="hover:text-pink dark:hover:text-blue transition-colors">About</a>
          <Link to="/projects" className="hover:text-pink dark:hover:text-blue transition-colors">Projects</Link>
          <Link to="/skills" className="hover:text-pink dark:hover:text-blue transition-colors">Skills</Link>
          <Link to="/resume" className="hover:text-pink dark:hover:text-blue transition-colors">Resume</Link>
          
          <Link to="/contact" className="hover:text-pink dark:hover:text-blue transition-colors">Contact</Link>
        
          {/* Dark/Light Theme Toggle for desktop */}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex items-center">
          <ThemeToggle /> {/* ThemeToggle always visible on mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="ml-4 p-2 rounded-md text-dark dark:text-light bg-peach dark:bg-blue hover:bg-pink dark:hover:bg-pink transition-colors focus:outline-none focus:ring-2 focus:ring-pink"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="font-semibold">{isMenuOpen ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="sm:hidden absolute top-full left-0 w-full bg-white dark:bg-dark border-t border-peach dark:border-blue shadow-lg pb-4 animate-fade-in-down"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 text-dark dark:text-light">
            <Link to="/" className={navLinkClasses} onClick={closeMenu}>Home</Link>
            <a href="/about" onClick={handleAboutClick} className={navLinkClasses}>About</a>
            <Link to="/projects" className={navLinkClasses} onClick={closeMenu}>Projects</Link>
            <Link to="/skills" className={navLinkClasses} onClick={closeMenu}>Skills</Link>
            <Link to="/resume" className={navLinkClasses} onClick={closeMenu}>Resume</Link>
          
            <Link to="/contact" className={navLinkClasses} onClick={closeMenu}>Contact</Link>
            
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;