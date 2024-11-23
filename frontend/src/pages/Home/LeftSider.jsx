import React from "react";

function LeftSider() {
  return (
    <div className="fixed left-0 bottom-0 px-10 sm:static">
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-3 sm:flex-row">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/Sudhakarahn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-linkedin-box-line text-secondary text-2xl"></i>
          </a>
          {/* GitHub */}
          <a
            href="https://github.com/SudhakaraAs2015"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-github-line text-secondary text-2xl"></i>
          </a>
          {/* Mail */}
          <a
            href="mailto:sudhakarahn29@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-mail-line text-secondary text-2xl"></i>
          </a>

          {/* Phone */}
          <a href="tel:+917338036120" target="_blank" rel="noopener noreferrer">
            <i className="ri-phone-line text-secondary text-2xl"></i>
          </a>
        </div>
        <div className="w-[1px] h-20 bg-secondary sm:bg-primary"></div>
      </div>
    </div>
  );
}

export default LeftSider;
