import React from "react";

function SectionTitle({ title}) {
  return (
    <div className="flex justify-center gap-10 items-center">
      <h1 className="text-xl font-semibold text-tertiary ">{title}</h1>
      <div className="w-10 h-[1px] bg-secondary"></div>
    </div>
    
  );
}

export default SectionTitle;
