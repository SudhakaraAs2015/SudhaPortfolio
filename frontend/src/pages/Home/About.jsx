import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function About({ aboutRef }) {
  const { portfolioData } = useSelector((state) => state.root);
  const { about } = portfolioData;
  const { skills, lottieURL, Aboutdescription } = about;

  return (
    <div ref={aboutRef} className="py-10">
      {/* Section Title */}
      <SectionTitle title="About" />

      {/* About Section: Animation and Description */}
      <div className="flex w-full items-center sm:flex-col gap-10">
        {/* Lottie Animation */}
        <div className="h-[50vh] w-1/2 sm:w-full flex justify-center">
          <dotlottie-player
            src={lottieURL}
            background="transparent"
            speed="1"
            autoplay
            loop
            className="w-full h-full"
          ></dotlottie-player>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-4 w-1/2 sm:w-full">
          <p className="text-secondary text-1xl sm:text-base">
            {Aboutdescription || ""}
          </p>
        </div>
      </div>

      {/* Skills Section */}
      <div className="py-5">
        <div className="flex justify-center gap-10 items-center">
          <h1 className="text-xl font-semibold text-tertiary">Skills</h1>
          <div className="w-10 h-[1px] bg-tertiary"></div>
        </div>
      </div>

      {/* Display Skills */}
      <div className="flex flex-wrap gap-5 mt-5 justify-center">
        {" "}
        {skills.map((skill, index) => (
          <div
            key={index}
            className="border border-secondary py-2 px-7 rounded-lg shadow-md"
          >
            {" "}
            <h1 className="text-secondary text-1xl">{skill}</h1>{" "}
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
