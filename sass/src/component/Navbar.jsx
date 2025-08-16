// src/components/Navbar.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react"
import {
  useAuth,
  useClerk,
  useUser,
  UserButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { openSignIn } = useClerk();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <motion.nav
 
      className={`fixed top-0 left-0 w-full z-50 py-4 transition-all duration-300 
      ${isScrolled ? "bg-white/80 shadow-md py-0" : "bg-transparent py-0"}`}
    >
      <div className="flex items-center justify-between px-4 md:px-12 lg:px-20">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-xl md:text-2xl font-extrabold bg-clip-text text-transparent 
        bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500
        drop-shadow-lg tracking-wider animate-pulse">
        Ahmed Mustafa
      </h1>
        </Link>

        {/* Right side (Sign in or User button) */}
        <div className="flex items-center gap-4">
          {/* Show if user is signed in */}
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                },
              }}
            />
          </SignedIn>

          {/* Show if user is signed out */}
          <SignedOut>
            <button
              onClick={openSignIn}
              className={`flex items-center gap-2 rounded-full px-6 py-2 text-sm font-medium 
              transition-all duration-300
              ${isScrolled ? "bg-[#5044E5] text-white" : "bg-white text-[#5044E5] border border-white"}`}
            >
              Get Started <ArrowRight size={16} />
            </button>
          </SignedOut>
        </div>
      </div>
    </motion.nav>
  );
};
