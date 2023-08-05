import React from "react";

function ProjectCard({ image, title, description, tags, link }) {
  return (
    <div className="group project-card w-full rounded overflow-hidden shadow-lg bg-custom-gray">
      <a href={link}>
        <img className="w-full h-48 object-cover" src={image} alt={title} />
        <div className="px-6 py-4">
          <div className="text-lg font-semibold mb-2">{title}</div>
          <p className="text-gray-400 text-xs line-clamp-2 overflow-ellipsis group-visited:overflow-auto group-hover:overflow-visible group-hover:line-clamp-none transition-all ease-in-out duration-300">
            {description}
          </p>
        </div>
        <div className="px-6 pb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2"
            >
              #{tag}
            </span>
          ))}
        </div>
      </a>
    </div>
  );
}

export default ProjectCard;
