"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  HomeIcon,
  UserIcon,
  Cog6ToothIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline"; // Importing Heroicons

export default function NavDash() {
  const pathname = usePathname();

  return (
    <nav className="p-2 bg-primary text-primary-contrast dark:bg-background-dark dark:text-foreground-light flex items-center">
      {/* Logo Section with Viviendo Name and Office Icon */}
      <div className="flex items-center space-x-2">
        <div className="w-14 flex justify-center">
          <BuildingOfficeIcon className="h-8 w-8 text-primary-contrast dark:text-foreground-light" />
        </div>

        <span className="text-xl font-bold hidden md:block">viviendo</span>
      </div>

      {/* Navigation Links aligned to the right */}
      <div className="flex space-x-4 ml-auto">
        {/* Profile Link */}
        <Link
          href="/profile"
          className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium 
            ${
              pathname === "/profile"
                ? "bg-primary-dark dark:bg-foreground-light dark:text-background-dark"
                : "hover:bg-primary-light dark:hover:bg-gray-700"
            }`}
        >
          <UserIcon className="h-5 w-5" />
          <span className="hidden md:block">Profile</span>
        </Link>

        {/* Home Link */}
        <Link
          href="/"
          className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium 
            ${pathname === "/" ? "bg-primary-dark dark:bg-foreground-light dark:text-background-dark" : "hover:bg-primary-light dark:hover:bg-gray-700"}`}
        >
          <HomeIcon className="h-5 w-5" />
          <span className="hidden md:block">Home</span>
        </Link>

        {/* Settings Link */}
        <Link
          href="/settings"
          className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium 
            ${
              pathname === "/settings"
                ? "bg-primary-dark dark:bg-foreground-light dark:text-background-dark"
                : "hover:bg-primary-light dark:hover:bg-gray-700"
            }`}
        >
          <Cog6ToothIcon className="h-5 w-5" />
          <span className="hidden md:block">Settings</span>
        </Link>
      </div>
    </nav>
  );
}
