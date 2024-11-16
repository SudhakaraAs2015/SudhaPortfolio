import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
// import { courses } from "../../resources/courses";
import { useSelector } from "react-redux";

function Courses() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const { courses } = portfolioData;
  // const selectedCourses= courses[selectedItemIndex];
  return (
    <div>
      <SectionTitle title="Courses" />
      <div className="flex py-10 mt-10 gap-40 sm:flex-col ">
        <div className="flex flex-col gap-8 justify-between border-l-2 border-[#03030c] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {courses.map((course, index) => (
            <div
              className="cursor-pointer"
              onClick={() => {
                setSelectedItemIndex(index);
              }}
            >
              <h1
                className={`text-xl px-5 py-3  ${
                  selectedItemIndex === index
                    ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#f4a0882d] py-3 rounded-r-lg"
                    : "text-secondary"
                }`}
              >
                {course.title}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-5 ml-15">
          <h1 className="text-tertiary text-xl font-semibold">
            {courses[selectedItemIndex].title}
          </h1>
          <p className="text-secondary">
          {courses[selectedItemIndex].description}
          </p>
        </div>
        <div className="flex items-center justify-center gap-10 sm:flex-col ">
          <img
            src={courses[selectedItemIndex].image}
            alt=""
            className="h-60 w-72 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Courses;
