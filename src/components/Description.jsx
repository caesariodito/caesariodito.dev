import React from "react";
import PhotoCollection from "./PhotoCollection";

function Description() {
  return (
    <div>
      {/* Heading */}
      <h1 className="font-bold text-2xl mb-8 text-center">
        wassup, I'm sesar 🙌
      </h1>
      {/* Brief Description */}
      <p>
        A third-year undergraduate informatics student with a focus on
        Intelligent Systems. Experienced in machine learning with tabular data
        and computer vision and also eager to apply skills to real-world
        challenges. I can confidently say that I work well in a team environment
        and adaptable to all challenging situations.
      </p>
      <br />
      {/* Gallery - Photos */}
      <PhotoCollection />
      {/* Another Brief Description */}
      <p>
        Passionate about self-development and dedicated to sharing personal
        insights from experiences to help others grow. Believes in the limitless
        potential for personal growth to be better than yesterday.
      </p>
    </div>
  );
}

export default Description;
