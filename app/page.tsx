import Navbar from "@/components/Navbar";
import Description from "@/components/Description";
import Projects from "@/components/Projects";
import Closing from "@/components/Closing";
import { ProjectProp } from "@/lib/project";
import { promises as fs } from "fs";

export default async function Home() {
  const file = await fs.readFile(
    process.cwd() + "/utils/projectdatalocal.json",
    "utf8",
  );
  const projects = JSON.parse(file) as ProjectProp[];

  return (
    <div className="relative h-full w-full bg-black bg-dot-white/[0.2]">
      <div className="pointer-events-none absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_100%,black)]"></div>
      <div className="lg:mx-autop-14 m-auto flex max-w-2xl flex-col pb-20 pt-8 antialiased md:flex-row ">
        <div className="main mx-4 mt-6 flex min-w-0 flex-auto flex-col px-2 md:px-0">
          <Navbar />
          <Description />
          <Projects projects={projects} />
          <Closing />
        </div>
      </div>
    </div>
  );
}
