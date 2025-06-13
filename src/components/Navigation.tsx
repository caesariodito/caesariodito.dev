"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const [journalDropdownOpen, setJournalDropdownOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const journalDropdownRef = useRef<HTMLDivElement>(null);

  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProjectsDropdownOpen(false);
      }

      if (
        journalDropdownRef.current &&
        !journalDropdownRef.current.contains(event.target as Node)
      ) {
        setJournalDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown when changing routes
  useEffect(() => {
    setProjectsDropdownOpen(false);
    setJournalDropdownOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    {
      name: "Projects",
      path: "/projects",
      hasDropdown: true,
      dropdownItems: [
        { name: "Featured Projects", path: "/projects" },
        { name: "Project Gallery", path: "/project-gallery" },
      ],
    },
    { name: "Tools", path: "/tools" },
    {
      name: "Journal",
      path: "/journal",
      hasDropdown: true,
      dropdownItems: [
        { name: "Latest Entries", path: "/journal" },
        { name: "Journal Explorer", path: "/journal-explorer" },
      ],
    },
  ];

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const isProjectsActive =
    pathname === "/projects" ||
    pathname === "/project-gallery" ||
    pathname.startsWith("/projects/");

  const isJournalActive =
    pathname === "/journal" ||
    pathname === "/journal-explorer" ||
    pathname.startsWith("/journal/");

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-700">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center text-stone-800 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            <Image
              src="/images/logo.png"
              alt="Quiet Code Soul Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="text-xl font-medium">sesar's</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.slice(1).map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.name}
                  className="relative"
                  ref={
                    item.name === "Projects"
                      ? dropdownRef
                      : item.name === "Journal"
                      ? journalDropdownRef
                      : undefined
                  }
                >
                  <button
                    onClick={() => {
                      if (item.name === "Projects") {
                        setProjectsDropdownOpen(!projectsDropdownOpen);
                      } else if (item.name === "Journal") {
                        setJournalDropdownOpen(!journalDropdownOpen);
                      }
                    }}
                    className={`text-sm font-medium transition-colors hover:text-amber-600 dark:hover:text-amber-400 flex items-center ${
                      (item.name === "Projects" && isProjectsActive) ||
                      (item.name === "Journal" && isJournalActive)
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-stone-600 dark:text-stone-300"
                    }`}
                  >
                    {item.name}
                    <ChevronDown
                      size={16}
                      className={`ml-1 transition-transform ${
                        (item.name === "Projects" && projectsDropdownOpen) ||
                        (item.name === "Journal" && journalDropdownOpen)
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>
                  {((item.name === "Projects" && projectsDropdownOpen) ||
                    (item.name === "Journal" && journalDropdownOpen)) && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-stone-800 rounded-md shadow-lg py-1 z-50 border border-stone-200 dark:border-stone-700">
                      {item.dropdownItems?.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.path}
                          className={`block px-4 py-2 text-sm hover:bg-stone-100 dark:hover:bg-stone-700 ${
                            pathname === dropdownItem.path
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-stone-600 dark:text-stone-300"
                          }`}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`text-sm font-medium transition-colors hover:text-amber-600 dark:hover:text-amber-400 ${
                    pathname === item.path
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-stone-600 dark:text-stone-300"
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="sm"
              className="ml-4 text-stone-600 hover:text-amber-600 dark:text-stone-300 dark:hover:text-amber-400"
            >
              {mounted && (theme === "light" ? "🌙" : "☀️")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="sm"
              className="text-stone-600 hover:text-amber-600 dark:text-stone-300 dark:hover:text-amber-400"
            >
              {mounted && (theme === "light" ? "🌙" : "☀️")}
            </Button>
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="ghost"
              size="sm"
              className="text-stone-600 hover:text-amber-600 dark:text-stone-300 dark:hover:text-amber-400"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-stone-200 dark:border-stone-700">
            <div className="flex flex-col space-y-3 pt-4">
              {navItems.map((item) =>
                item.hasDropdown ? (
                  <div key={item.name} className="space-y-2">
                    <button
                      onClick={() => {
                        if (item.name === "Projects") {
                          setProjectsDropdownOpen(!projectsDropdownOpen);
                        } else if (item.name === "Journal") {
                          setJournalDropdownOpen(!journalDropdownOpen);
                        }
                      }}
                      className={`text-sm font-medium transition-colors hover:text-amber-600 dark:hover:text-amber-400 flex items-center ${
                        (item.name === "Projects" && isProjectsActive) ||
                        (item.name === "Journal" && isJournalActive)
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-stone-600 dark:text-stone-300"
                      }`}
                    >
                      {item.name}
                      <ChevronDown
                        size={16}
                        className={`ml-1 transition-transform ${
                          (item.name === "Projects" && projectsDropdownOpen) ||
                          (item.name === "Journal" && journalDropdownOpen)
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>
                    {((item.name === "Projects" && projectsDropdownOpen) ||
                      (item.name === "Journal" && journalDropdownOpen)) && (
                      <div className="pl-4 space-y-2 mt-1">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.path}
                            onClick={() => setIsOpen(false)}
                            className={`block text-sm ${
                              pathname === dropdownItem.path
                                ? "text-amber-600 dark:text-amber-400"
                                : "text-stone-500 dark:text-stone-400"
                            }`}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm font-medium transition-colors hover:text-amber-600 dark:hover:text-amber-400 ${
                      pathname === item.path
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-stone-600 dark:text-stone-300"
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
