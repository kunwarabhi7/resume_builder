"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/Auth.context";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200/30 dark:border-gray-800/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">
                ResumeBuilder
              </span>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-end ml-auto space-x-4">
            {user ? (
              <>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center space-x-2"
                >
                  {user.profilePic ? (
                    <Image
                      src={user.profilePic}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-gray-300 dark:border-gray-700 object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                      {user.fullName?.charAt(0) ||
                        user.username?.charAt(0) ||
                        "U"}
                    </div>
                  )}
                  <span className="text-gray-700 dark:text-gray-200 font-medium text-sm">
                    Welcome, {user.username}
                  </span>
                </motion.div>
                <Link href="/profile">
                  <Button
                    variant="ghost"
                    className="rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/50 text-sm font-medium px-4 py-1.5 transition-colors duration-300"
                  >
                    Profile
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    className="rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/50 text-sm font-medium px-4 py-1.5 transition-colors duration-300"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="rounded-full border-indigo-500 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-sm font-medium px-4 py-1.5 transition-colors duration-300"
                  onClick={logout}
                >
                  Logout
                </Button>
                <ThemeToggle />
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/50 text-sm font-medium px-4 py-1.5 transition-colors duration-300"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="rounded-full bg-gradient-to-r from-indigo-600 to-teal-500 text-white hover:from-indigo-700 hover:to-teal-600 text-sm font-medium px-4 py-1.5 transition-all duration-300">
                    Get Started
                  </Button>
                </Link>
                <ThemeToggle />
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 dark:text-gray-200 focus:outline-none p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors duration-200"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200/30 dark:border-gray-800/30"
            >
              <div className="px-4 pt-4 pb-6 space-y-3">
                {user ? (
                  <>
                    <div className="flex items-center space-x-2 py-2">
                      {user.profilePic ? (
                        <Image
                          src={user.profilePic}
                          alt="Profile"
                          width={32}
                          height={32}
                          className="rounded-full border-2 border-gray-300 dark:border-gray-700 object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                          {user.fullName?.charAt(0) ||
                            user.username?.charAt(0) ||
                            "U"}
                        </div>
                      )}
                      <span className="text-gray-700 dark:text-gray-200 font-medium text-sm">
                        Welcome, {user.username}
                      </span>
                    </div>
                    <Link href="/profile">
                      <Button
                        variant="ghost"
                        className="w-full rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/50 text-sm font-medium py-2 transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Profile
                      </Button>
                    </Link>
                    <Link href="/dashboard">
                      <Button
                        variant="ghost"
                        className="w-full rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/50 text-sm font-medium py-2 transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full rounded-full border-indigo-500 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-sm font-medium py-2 transition-colors duration-300"
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button
                        variant="ghost"
                        className="w-full rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/50 text-sm font-medium py-2 transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button
                        className="w-full rounded-full bg-gradient-to-r from-indigo-600 to-teal-500 text-white hover:from-indigo-700 hover:to-teal-600 text-sm font-medium py-2 transition-all duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
