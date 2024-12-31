/* eslint-disable react/prop-types */

import { ArrowRightIcon } from "@heroicons/react/outline";

const FeatureCard = ({ title, icon }) => {
  return (
    <div className="max-w-5xl mx-auto py-5">
      <div className=" flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition">
        <div className="flex items-center ">
          <span className="text-2xl mr-3">{icon}</span>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>

        <ArrowRightIcon className="w-6 h-6" />
      </div>
    </div>
  );
};

export default FeatureCard;
