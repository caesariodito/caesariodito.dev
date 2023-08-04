import React from "react";
import { Gallery } from "react-grid-gallery";

// TODO add lightbox (optional), source: https://benhowell.github.io/react-grid-gallery/examples/with-react-image-lightbox#source-code

const images = [
  {
    src: "https://cdn.discordapp.com/attachments/1105720623143063614/1135557037867155466/IMG_6081.jpg",
    width: "1227",
    height: "920",
  },
  {
    src: "https://cdn.discordapp.com/attachments/1105720623143063614/1135558403708686479/IMG-20230625-WA0000.jpg",
    width: "1227",
    height: "590",
  },
  {
    src: "https://cdn.discordapp.com/attachments/1105720623143063614/1135557811108069407/IMG-20230629-WA0045.jpg",
    width: "744",
    height: "993",
  },
  {
    src: "https://cdn.discordapp.com/attachments/1105720623143063614/1135558403708686479/IMG-20230625-WA0000.jpg",
    width: "1227",
    height: "590",
  },
  {
    src: "https://cdn.discordapp.com/attachments/1105720623143063614/1135557037867155466/IMG_6081.jpg",
    width: "1227",
    height: "920",
  },
  {
    src: "https://cdn.discordapp.com/attachments/1105720623143063614/1135557811108069407/IMG-20230629-WA0045.jpg",
    width: "744",
    height: "993",
  },
];

function PhotoCollection() {
  return (
    <div className="my-8">
      {/* using library */}
      <Gallery images={images} enableImageSelection={false} />
    </div>
  );
}

export default PhotoCollection;
