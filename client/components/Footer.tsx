"use client";

import { useAuth } from "@/context/Auth.context";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const { user } = useAuth();

  // Animation variants for links
  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <footer className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-t border-gray-200/30 dark:border-gray-800/30 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Branding */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">
              ResumeBuilder
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-2">
              Crafting professional resumes for your career success.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <motion.div
              variants={linkVariants}
              initial="hidden"
              animate="visible"
            >
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-200 text-sm font-medium hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300"
              >
                Home
              </Link>
            </motion.div>
            {user ? (
              <motion.div
                variants={linkVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  href="/dashboard"
                  className="text-gray-700 dark:text-gray-200 text-sm font-medium hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300"
                >
                  Dashboard
                </Link>
              </motion.div>
            ) : (
              <>
                <motion.div
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href="/register"
                    className="text-gray-700 dark:text-gray-200 text-sm font-medium hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300"
                  >
                    Register
                  </Link>
                </motion.div>
                <motion.div
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href="/login"
                    className="text-gray-700 dark:text-gray-200 text-sm font-medium hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300"
                  >
                    Login
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} ResumeBuilder. All rights
            reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
