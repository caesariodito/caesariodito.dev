import React from "react";
import Navbar from "./Navbar";
import Description from "./Description";
import Projects from "./Projects";

import projects from "../utils/projects";

function Home() {
  return (
    <div className="antialiased max-w-2xl mb-40 flex flex-col md:flex-row m-auto mt-8 lg:mx-auto">
      <div className="main flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
        <Navbar />
        <Description />
        <Projects projects={projects} />
        <p className="mt-8">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem non
          repellat obcaecati? Sunt, nulla? Laudantium possimus vero nostrum vel
        </p>
        <ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-600 dark:text-neutral-300">
          <li>
            <a
              className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
              rel="noopener noreferrer"
              target="_blank"
              href="https://linkedin.com/in/caesariodito"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
                  fill="currentColor"
                ></path>
              </svg>
              <p className="h-7 ml-2">connect with me on linkedin</p>
            </a>
          </li>
          <li>
            <a
              className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/caesariodito"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
                  fill="currentColor"
                ></path>
              </svg>
              <p className="h-7 ml-2">view my github profile</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
