"use client";

import { useAuth } from "@/context/Auth.context";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Handle redirect in useEffect to avoid render-phase updates
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    <p className="text-center text-gray-700 dark:text-gray-200">Loading...</p>;
  }

  if (!user) {
    return null;
  }
  console.log(user, loading);
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:via-black dark:to-gray-800 relative overflow-hidden">
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <Card className="w-full max-w-md bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border border-gray-200/30 dark:border-gray-800/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">
              Your Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex justify-center mb-4">
              {user.profilePic ? (
                <Image
                  src={user.profilePic}
                  alt="Profile"
                  width={120}
                  height={120}
                  className="rounded-full border-2 border-gray-300 dark:border-gray-700 object-cover"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xl font-medium">
                  {user.fullName?.charAt(0) || user.username?.charAt(0) || "U"}
                </div>
              )}
            </div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              {user.fullName || user.username}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              {user.email}
            </p>
            {user.phone && (
              <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm font-medium">
                📞 {user.phone}
              </p>
            )}
            {user.address && (
              <p className="mt-1 text-gray-500 dark:text-gray-400 text-sm font-medium">
                📍 {user.address}
              </p>
            )}
            <Link href="/profile/edit">
              <Button className="mt-6 rounded-full bg-gradient-to-r from-indigo-600 to-teal-500 text-white hover:from-indigo-700 hover:to-teal-600 text-sm font-medium px-6 py-2.5 transition-all duration-300">
                Edit Profile
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
