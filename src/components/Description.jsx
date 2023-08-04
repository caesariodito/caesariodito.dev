import React from "react";
import PhotoCollection from "./PhotoCollection";

function Description() {
  return (
    <div>
      {/* Heading */}
      <h1 className="font-bold text-2xl mb-8">wassup, I'm sesar 🙌</h1>
      {/* Brief Description */}
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente
        eveniet esse, corrupti deleniti odit velit reprehenderit quisquam hic
        harum tempore. Sit tenetur consequatur facilis ad veritatis vitae nobis,
        possimus repudiandae!
      </p>
      {/* Gallery - Photos */}
      <PhotoCollection />
      {/* Another Brief Description */}
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem non
        repellat obcaecati? Sunt, nulla? Laudantium possimus vero nostrum vel ab
        ad suscipit eos, ullam explicabo, eius dolor distinctio ipsa quod?
      </p>
    </div>
  );
}

export default Description;
