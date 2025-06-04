import Image from "next/image";
import { promises as fs } from "fs";
import { ImageProp } from "@/lib/images";

export default async function PhotoCollection() {
  const file = await fs.readFile(
    process.cwd() + "/utils/imagedatalocal.json",
    "utf8",
  );

  const images = JSON.parse(file) as ImageProp[];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {images.map((image, index) => (
        <div key={index}>
          <Image
            className="h-32 w-full rounded-lg object-cover"
            src={image.src}
            alt={image.alt}
            height={500}
            width={500}
          />
        </div>
      ))}
    </div>
  );
}
