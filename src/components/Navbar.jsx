import React from "react";

function Navbar() {
  const links = [
    { href: "/", text: "home" },
    { text: "/" },
    // TODO change / to /projects
    { href: "/", text: "projects" },
  ];

  return (
    <nav className="navbar ml-[8px] mb-16 tracking-tight">
      <div className="flex flex-row space-x-0 pr-10">
        {links.map((link) => (
          <a
            key={link.href}
            className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle px-4"
            href={link.href}
          >
            {link.text}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
