import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Contact() {
  const { portfolioData } = useSelector((state) => state.root);
  const { contact } = portfolioData;



  return (
    <div className="mt-10">
      <SectionTitle title="Say Hello" />
      <div className="flex mt-20 sm:flex-col items-center justify-between">
        <div className="flex flex-col gap-3">
         <p className="text-secondary">{"{"}</p>
          {Object.keys(contact).map((key) => (
          key !== '_id' &&   <p>
              <span className="text-secondary">{key} : </span>
              <span className="text-secondary">{contact[key]}</span>
            </p>
          ))}
          <p className="text-secondary">{"}"}</p>
        </div>
        <div className="h-[400px]">
          <dotlottie-player
            src="https://lottie.host/b05f9600-17e0-4324-97bc-2f0d4470b279/gsbHxKusqv.json"
            background="transparent"
            speed="1"
            autoplay
          ></dotlottie-player>
        </div>
      </div>
    </div>
  );
}

export default Contact;
