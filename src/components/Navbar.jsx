import React from "react";
import { Link } from "react-scroll";

function Navbar() {
  const links = [
    { to: "/", text: "home" },
    { to: "projects", text: "projects" },
    { to: "creative", text: "creative" },
  ];

  return (
    <nav className="navbar ml-[8px] mb-16 tracking-tight">
      <div className="flex flex-row space-x-0 pr-10">
        {links.map((link, index) => (
          <React.Fragment key={link.to}>
            {index !== 0 && <span className="mx-2">/</span>}
            {link.to === "projects" ? (
              <Link
                className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle px-4 cursor-pointer"
                to={link.to}
                smooth={true}
                duration={800}
              >
                {link.text}
              </Link>
            ) : (
              <a
                className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle px-4 cursor-pointer"
                href={link.to}
              >
                {link.text}
              </a>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
