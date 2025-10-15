"use client";

import { useState } from "react";
import { useAuth } from "@/context/Auth.context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EditProfile() {
  const { user, updateProfile, loading, error } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: user?.username || "",
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    address: user?.address || "",
    profilePic: user?.profilePic || "",
  });
  const [preview, setPreview] = useState(formData.profilePic);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePic: reader.result as string });
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const message = await updateProfile(formData);
      router.push("/profile");
    } catch (error) {
      // Error is handled by AuthContext, displayed via `error` state
    }
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          {/* Form Section */}
          <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border border-gray-200/30 dark:border-gray-800/30 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">
                Edit Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-200 text-sm font-medium">
                    Username
                  </label>
                  <Input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="rounded-full bg-gray-100 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-200 text-sm font-medium">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="rounded-full bg-gray-100 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-200 text-sm font-medium">
                    Phone
                  </label>
                  <Input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="rounded-full bg-gray-100 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-200 text-sm font-medium">
                    Address
                  </label>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="rounded-full bg-gray-100 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-200 text-sm font-medium">
                    Profile Photo
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="text-gray-700 dark:text-gray-200 text-sm font-medium"
                  />
                </div>
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
                  disabled={loading}
                  className="w-full rounded-full bg-gradient-to-r from-indigo-600 to-teal-500 text-white hover:from-indigo-700 hover:to-teal-600 text-sm font-medium py-2.5 transition-all duration-300"
                >
                  {loading ? "Saving..." : "Save"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border border-gray-200/30 dark:border-gray-800/30 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                {preview ? (
                  <Image
                    src={preview}
                    alt="Profile Preview"
                    width={96}
                    height={96}
                    className="rounded-full object-cover border-2 border-gray-300 dark:border-gray-700"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xl font-medium">
                    {formData.fullName?.charAt(0) ||
                      formData.username?.charAt(0) ||
                      "U"}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                    {formData.fullName || formData.username || "User"}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                    {formData.phone || "No phone"}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                    {formData.address || "No address"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
