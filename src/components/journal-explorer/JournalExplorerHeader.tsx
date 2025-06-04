import React from "react";

const JournalExplorerHeader = () => {
  return (
    <section className="py-12 text-center">
      <h1 className="text-4xl lg:text-5xl font-light text-stone-800 dark:text-stone-100 mb-6">
        Journal Explorer
      </h1>
      <p className="text-xl text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl mx-auto">
        Browse and discover connections between thoughts, learnings, and
        reflections.
      </p>
    </section>
  );
};

export default JournalExplorerHeader;
