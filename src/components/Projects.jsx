import React from "react";
import ProjectCard from "./ProjectCard";

function Projects(props) {
  return (
    <>
      <div className="projects mt-16">
        <h1 className="font-extrabold text-2xl mb-4 text-center">
          projects 💻
        </h1>
      </div>
      <div className="flex flex-wrap">
        {props.projects.map((project) => (
          <div
            key={project.title}
            className="w-full h-auto md:w-1/2 flex justify-center"
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
