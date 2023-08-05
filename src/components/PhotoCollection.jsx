import React from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import images from "../utils/images";

function PhotoCollection() {
  const handleOnLoad = () => {
    const images = document.querySelectorAll(".ReactGridGallery_tile");
    images.forEach((image) => {
      image.classList.add("dim");
    });
  };

  const handleHover = (event) => {
    if (event.target.tagName === "IMG") {
      const images = document.querySelectorAll(".ReactGridGallery_tile");
      images.forEach((image) => {
        if (image !== event.target.closest(".ReactGridGallery_tile")) {
          image.classList.add("dimHover");
        }
      });
    }
  };

  const handleMouseOut = (event) => {
    if (event.target.tagName === "IMG") {
      const images = document.querySelectorAll(".ReactGridGallery_tile");
      images.forEach((image) => {
        image.classList.remove("dimHover");
      });
    }
  };

  const [open, setOpen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const slides = images.map((image) => ({ src: image.src }));

  const handleClick = (index, item) => {
    setCurrentIndex(index);
    setOpen(true);
  };
  return (
    <div
      className="dim my-8"
      onLoad={handleOnLoad}
      onMouseOver={handleHover}
      onMouseOut={handleMouseOut}
    >
      {/* using library */}
      <Gallery
        images={images}
        enableImageSelection={false}
        margin={4}
        onClickThumbnail={(index) => setCurrentIndex(index)} // not working, need to fix
        onClick={handleClick}
      />
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={currentIndex}
      />
    </div>
  );
}

export default PhotoCollection;
