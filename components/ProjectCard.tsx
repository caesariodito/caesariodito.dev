import Image from "next/image";
import { ProjectProp } from "@/lib/project";

export default function ProjectCard({
  image,
  title,
  description,
  tags,
  link,
}: ProjectProp) {
  return (
    <div style={{ height: "380px" }}>
      <div className="project-card group w-full overflow-hidden rounded bg-black shadow-lg">
        <a href={link}>
          <Image
            className="h-48 w-full object-cover"
            src={image}
            alt={title}
            height={400}
            width={400}
          />
          <div className="px-6 py-4">
            <div className="mb-2 text-lg font-semibold">{title}</div>
            <p className="line-clamp-2 overflow-ellipsis text-xs text-gray-400 transition-all duration-300 ease-in-out group-visited:overflow-auto group-hover:line-clamp-none group-hover:overflow-visible">
              {description}
            </p>
          </div>
          <div className="px-6 pb-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        </a>
      </div>
    </div>
  );
}
