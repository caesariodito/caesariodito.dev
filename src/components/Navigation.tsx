import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Philosophy", path: "/philosophy" },
    { name: "Tools", path: "/tools" },
    { name: "Journal", path: "/journal" },
  ];

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-700">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-medium text-stone-800 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            Sesar
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.slice(1).map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-amber-600 dark:hover:text-amber-400 ${
                  location.pathname === item.path
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-stone-600 dark:text-stone-300"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="sm"
              className="ml-4 text-stone-600 hover:text-amber-600 dark:text-stone-300 dark:hover:text-amber-400"
            >
              {theme === "light" ? "🌙" : "☀️"}
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
              {theme === "light" ? "🌙" : "☀️"}
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
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium transition-colors hover:text-amber-600 dark:hover:text-amber-400 ${
                    location.pathname === item.path
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-stone-600 dark:text-stone-300"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
