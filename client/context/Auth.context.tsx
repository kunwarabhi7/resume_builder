"use client";
import axiosInstance from "@/lib/axios";
import { AuthContextType, User } from "@/utils/types";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getUser = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/users/me");

      setUser(res.data.user || null);
    } catch (error) {
      setError("Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const register = async (
    username: string,
    email: string,
    password: string,
    fullName: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.post("/users/register", {
        username,
        email,
        password,
        fullName,
      });
      setUser(res.data.user);
    } catch (error: any) {
      console.log(error.response?.data);
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axiosInstance.post("/users/login", {
        email,
        password,
      });
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await axiosInstance.post("/users/logout");
      setUser(null);
    } catch (error) {
      console.log(error);
      setError("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: {
    fullName?: string;
    phone?: string;
    address?: string;
    photo?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.put("/users/me", profileData);
      setUser(res.data.user);
      return res.data.message;
    } catch (error) {
      console.log(error);
      setError("Profile update failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        getUser,
        register,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
