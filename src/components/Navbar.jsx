import React from "react";
import { Link } from "react-scroll";

function Navbar() {
  const links = [
    { to: "/", text: "home" },
    { text: "/" },
    // TODO change / to /projects
    { to: "projects", text: "projects" },
  ];

  return (
    <nav className="navbar ml-[8px] mb-16 tracking-tight">
      <div className="flex flex-row space-x-0 pr-10">
        {links.map((link) => (
          <Link
            key={link.to}
            className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle px-4"
            to={link.to}
            smooth={true}
            duration={800}
          >
            {link.text}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
