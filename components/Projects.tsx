import React from "react";
import ProjectCard from "./ProjectCard";
import { ProjectProp } from "@/lib/project";

interface ProjectProps {
  projects: ProjectProp[];
}

function Projects({ projects }: ProjectProps) {
  return (
    <>
      <div id="projects" className="projects mb-4 mt-16">
        <h1 className="mb-4 text-center text-2xl font-extrabold">
          projects 💻
        </h1>
      </div>
      <div className="flex flex-wrap">
        {projects.map((project) => (
          <div
            key={project.title}
            className="flex w-full justify-center md:w-1/2"
          >
            <ProjectCard
              link={project.link}
              image={project.image}
              title={project.title}
              description={project.description}
              tags={project.tags}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Projects;
