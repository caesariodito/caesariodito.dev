"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown when changing routes
  useEffect(() => {
    setProjectsDropdownOpen(false);
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
    { name: "Philosophy", path: "/philosophy" },
    { name: "Tools", path: "/tools" },
    { name: "Journal", path: "/journal" },
  ];

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const isProjectsActive =
    pathname === "/projects" ||
    pathname === "/project-gallery" ||
    pathname.startsWith("/projects/");

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-700">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-medium text-stone-800 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            Sesar
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.slice(1).map((item) =>
              item.hasDropdown ? (
                <div key={item.name} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() =>
                      setProjectsDropdownOpen(!projectsDropdownOpen)
                    }
                    className={`text-sm font-medium transition-colors hover:text-amber-600 dark:hover:text-amber-400 flex items-center ${
                      isProjectsActive
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-stone-600 dark:text-stone-300"
                    }`}
                  >
                    {item.name}
                    <ChevronDown
                      size={16}
                      className={`ml-1 transition-transform ${
                        projectsDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {projectsDropdownOpen && (
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
                      onClick={() =>
                        setProjectsDropdownOpen(!projectsDropdownOpen)
                      }
                      className={`text-sm font-medium transition-colors hover:text-amber-600 dark:hover:text-amber-400 flex items-center ${
                        isProjectsActive
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-stone-600 dark:text-stone-300"
                      }`}
                    >
                      {item.name}
                      <ChevronDown
                        size={16}
                        className={`ml-1 transition-transform ${
                          projectsDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {projectsDropdownOpen && (
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
