import Link from "next/link";
import React from "react";

export default function Navbar() {
  const links = [
    { to: "/", text: "home" },
    { to: "#projects", text: "projects" },
    { to: "https://blog.sesar.my.id/", text: "blog", redirect: true },
    { to: "creative", text: "creative" },
  ];

  return (
    <nav className="navbar mb-16 ml-[8px] tracking-tight">
      <div className="flex flex-row space-x-0 pr-10">
        {links.map((link, index) => (
          <React.Fragment key={index}>
            {index !== 0 && <span className="mx-2">/</span>}
            {link.redirect ? (
              <a
                href={link.to}
                target="_blank"
                rel="noopener noreferrer"
                className="flex cursor-pointer items-center px-4 align-middle transition-all hover:text-neutral-800 dark:hover:text-neutral-200"
              >
                {link.text}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1"
                >
                  <path
                    d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </a>
            ) : (
              <Link
                href={link.to}
                className="flex cursor-pointer px-4 align-middle transition-all hover:text-neutral-800 dark:hover:text-neutral-200"
              >
                {link.text}
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
}
