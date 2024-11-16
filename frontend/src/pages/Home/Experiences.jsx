import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";
function Experiences() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const { educationandExperiences } = portfolioData;
  // const selectedExperience = educationandExperiences[selectedItemIndex];

  return (
    <div className="mt-16 pt-2">
      <SectionTitle title="Education And Experience" />
      <div className="flex py-10 mt-9 gap-20 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#03030c] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {educationandExperiences.map((experience, index) => (
            <div key={index}
              className="cursor-pointer"
              onClick={() => {
                setSelectedItemIndex(index);
              }}
            >
              <h1
                className={`text-xl px-5 py-5 ${
                  selectedItemIndex === index
                    ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#f4a0882d] py-3 rounded-r-lg"
                    : "text-secondary"
                }`}
              >
                {experience.period}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-5 ml-15">
          <h1 className="text-tertiary text-xl font-semibold">
            {educationandExperiences[selectedItemIndex].title}
          </h1>
          <h1 className="text-secondary text-xl">
            {educationandExperiences[selectedItemIndex].organization}
          </h1>
          <p>
          {educationandExperiences[selectedItemIndex].description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Experiences;
