"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import DropdownMenuComponent from "./dropdownMenu";
import NavbarLinksComponent from "./navbarLinks";
import NavbarNotificationsComponent from "./navbarNotifications";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-shadow ${
        scrolled ? "shadow bg-white" : "bg-transparent"
      }`}
    >
      <div className="mx-auto px-4 md:px-20 lg:px-72 py-2 flex items-center justify-between">
        <Link href="/feed" className="text-2xl font-bold text-primary">
          TechConnect
        </Link>
        <div className="flex items-center space-x-4">
          <NavbarLinksComponent />
          <NavbarNotificationsComponent />
          <DropdownMenuComponent />
        </div>
      </div>
    </header>
  );
}
