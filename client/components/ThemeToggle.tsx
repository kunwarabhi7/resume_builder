"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Animation variants for dropdown items
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-indigo-500 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-all duration-300"
        >
          <Sun className="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border border-gray-200/30 dark:border-gray-800/30"
      >
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <DropdownMenuItem
            onClick={() => setTheme("light")}
            className="text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors duration-300 focus:bg-indigo-100 dark:focus:bg-indigo-900/30"
          >
            Light
          </DropdownMenuItem>
        </motion.div>
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <DropdownMenuItem
            onClick={() => setTheme("dark")}
            className="text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors duration-300 focus:bg-indigo-100 dark:focus:bg-indigo-900/30"
          >
            Dark
          </DropdownMenuItem>
        </motion.div>
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <DropdownMenuItem
            onClick={() => setTheme("system")}
            className="text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors duration-300 focus:bg-indigo-100 dark:focus:bg-indigo-900/30"
          >
            System
          </DropdownMenuItem>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
