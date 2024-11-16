import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Projects() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const { projects } = portfolioData;

  // Get the currently selected project based on the index
  const selectedProject = projects[selectedProjectIndex];

  return (
    <div>
      <SectionTitle title="Projects" />
      <div className="flex py-10 mt-10 gap-40 sm:flex-col">
        {/* Project Titles */}
        <div className="flex flex-col gap-8 justify-between border-l-2 border-[#03030c] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {projects.map((project, index) => (
            <div
              key={project.id} // Always good to add a key when mapping over arrays
              className="cursor-pointer"
              onClick={() => setSelectedProjectIndex(index)}
            >
              <h1
                className={`text-xl px-5 py-3 ${
                  selectedProjectIndex === index
                    ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#f4a0882d] py-3 rounded-r-lg"
                    : "text-secondary"
                }`}
              >
                {project.title}
              </h1>
            </div>
          ))}
        </div>

        {/* Project Image */}

        <div className="flex items-center justify-center gap-10 sm:flex-col">
          <img
            src={selectedProject.image}
            alt={`Project - ${selectedProject.title}`} // Provide a descriptive alt text
            className="h-auto w-auto max-w-full rounded-lg" // Make image responsive
          />
        </div>

        {/* Project Details */}
        <div className="flex flex-col gap-5 ml-15">
          <h1 className="text-tertiary font-semibold text-xl">
            {selectedProject.title}
          </h1>
          <p className="text-secondary">{selectedProject.description}</p>
          <p className="text-tertiary text-lg bg-[#f4a0882d] p-2 rounded-md ">
            Technologies: {selectedProject.technologies.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Projects;
