import Link from "next/link";
import React from "react";

export default function Navbar() {
  const links = [
    { to: "/", text: "home" },
    { to: "#projects", text: "projects" },
    { to: "creative", text: "creative" },
  ];

  return (
    <nav className="navbar mb-16 ml-[8px] tracking-tight">
      <div className="flex flex-row space-x-0 pr-10">
        {links.map((link, index) => (
          <React.Fragment key={index}>
            {index !== 0 && <span className="mx-2">/</span>}
            {
              <Link
                href={link.to}
                className="flex cursor-pointer px-4 align-middle transition-all hover:text-neutral-800 dark:hover:text-neutral-200"
              >
                {link.text}
              </Link>
            }
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
}
