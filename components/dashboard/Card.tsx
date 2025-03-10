import React from "react";
import Heading3 from "../headings/Heading3";

const Card = ({ title, value, icon }) => {
  return (
    <div className="rounded-lg bg-gray-100 p-2">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="text-sm text-gray-600">{title}</h3>
      </div>

      <div className="flex justify-center rounded-lg bg-white p-5">
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default Card;
