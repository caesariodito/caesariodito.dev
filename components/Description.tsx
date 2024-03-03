import PhotoCollection from "./PhotoCollection";

export default function Description() {
  return (
    <div>
      {/* Heading */}
      <h1 className="my-8 text-center text-2xl font-bold">
        wassup, I&apos;m sesar 🙌
      </h1>
      {/* Brief Description */}
      <p className="text">
        A fresh graduate informatics student with a passion for software
        engineering and a desire to gain more in-depth experience in the field.
        Skilled in various programming languages, frameworks, and tools, as well
        as problem-solving, debugging, and testing. I thrive in collaborative
        settings and am dedicated to mastering the latest advancements in this
        dynamic field. I am seeking a position that will allow me to apply my
        knowledge and skills to real-world projects and challenges.
      </p>
      {/* Gallery - Photos */}
      <PhotoCollection />
      {/* Another Brief Description */}
      <p className="text">
        Passionate about self-development and dedicated to sharing personal
        insights from experiences to help others grow. Believes in the limitless
        potential for personal growth to be better every single day.
      </p>
    </div>
  );
}
