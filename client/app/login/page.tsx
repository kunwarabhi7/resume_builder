"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/Auth.context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login, loading, error } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(form.email, form.password);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
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
        className="absolute w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl top-10 left-10"
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
        className="absolute w-80 h-80 bg-teal-500/20 rounded-full blur-3xl bottom-10 right-10"
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border border-gray-200/30 dark:border-gray-800/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">
              Sign In
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="rounded-full bg-gray-100 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              />
              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="rounded-full bg-gray-100 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              />

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm font-medium text-center"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <Button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-indigo-600 to-teal-500 text-white hover:from-indigo-700 hover:to-teal-600 text-sm font-medium py-2.5 transition-all duration-300"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium text-center mt-6">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-indigo-500 dark:text-indigo-400 hover:underline"
              >
                Register
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
