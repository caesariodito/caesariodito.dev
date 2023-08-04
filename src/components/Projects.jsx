import React from "react";
import ProjectCard from "./ProjectCard";
// TODO implement link to scroll
// import { Link } from "react-scroll";

function Projects(props) {
  return (
    <>
      <div className="mt-8">
        <h1 className="font-bold text-2xl mb-4">Projects</h1>
      </div>
      <div className="flex flex-wrap">
        {props.projects.map((project) => (
          <div className="w-1/2 p-2">
            <ProjectCard
              key={project.title}
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
