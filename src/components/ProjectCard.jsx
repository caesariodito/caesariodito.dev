import React from "react";

function ProjectCard({ image, title, description, tags, link }) {
  return (
    <a href={link}>
      <div className="project-card rounded overflow-hidden shadow-lg bg-custom-gray">
        <img className="w-full h-48 object-cover" src={image} alt={title} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
        <div className="px-6 pb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

export default ProjectCard;
