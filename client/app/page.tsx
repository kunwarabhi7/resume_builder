"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/Auth.context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:via-black dark:to-gray-800 relative overflow-hidden">
      {/* Background blur circles */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 1,
          ease: "easeOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute w-80 h-80 bg-indigo-600/20 dark:bg-indigo-600/20 rounded-full blur-3xl top-10 left-10"
      ></motion.div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute w-80 h-80 bg-teal-500/20 dark:bg-teal-500/20 rounded-full blur-3xl bottom-10 right-10"
      ></motion.div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-3xl"
        >
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 bg-clip-text text-transparent mb-6">
            Craft Your Professional Resume
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg font-medium mb-8 max-w-2xl mx-auto">
            Create stunning, job-winning resumes with ResumeBuilder. Choose from
            professional templates, customize with ease, and land your dream
            job.
          </p>
          <div className="flex justify-center space-x-4">
            {user ? (
              <Link href="/dashboard">
                <Button className="rounded-full bg-gradient-to-r from-indigo-600 to-teal-500 text-white hover:from-indigo-700 hover:to-teal-600 text-sm font-medium px-6 py-2.5 transition-all duration-300">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/register">
                  <Button className="rounded-full bg-gradient-to-r from-indigo-600 to-teal-500 text-white hover:from-indigo-700 hover:to-teal-600 text-sm font-medium px-6 py-2.5 transition-all duration-300">
                    Get Started
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="rounded-full border-indigo-500 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-sm font-medium px-6 py-2.5 transition-all duration-300"
                  >
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 bg-clip-text text-transparent mb-12">
            Why Choose ResumeBuilder?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border border-gray-200/30 dark:border-gray-800/30 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                    Professional Templates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                    Choose from a variety of ATS-friendly, professionally
                    designed templates to make your resume stand out.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border border-gray-200/30 dark:border-gray-800/30 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                    Easy Customization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                    Tailor your resume with our intuitive editor to highlight
                    your skills and experience effortlessly.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border border-gray-200/30 dark:border-gray-800/30 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                    Instant Export
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                    Download your resume in PDF or other formats with a single
                    click, ready to share with employers.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
