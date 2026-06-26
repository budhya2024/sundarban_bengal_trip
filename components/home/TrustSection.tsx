"use client";

import { UsersRound } from "lucide-react";
import {
  FaBus,
  FaBed,
  FaShip,
  FaUtensils,
  FaStar,
  FaUsers,
  FaShieldAlt,
} from "react-icons/fa";
import { GiLaurelsTrophy } from "react-icons/gi";

export default function TrustSection() {
  const features = [
    {
      icon: <FaBus size={32} />,
      title: "Pickup & Drop From Kolkata",
    },
    {
      icon: <FaBed size={32} />,
      title: "Premium Resort Stay",
    },
    {
      icon: <FaShip size={32} />,
      title: "Boat Safari & Sightseeing",
    },
    {
      icon: <FaUtensils size={32} />,
      title: "Delicious Bengali Meals",
    },
  ];

  const trust = [
    {
      icon: <FaStar size={30} />,
      title: "4.9/5",
      subtitle: "Google Rating",
    },
    {
      icon: <FaUsers size={30} />,
      title: "10,000+",
      subtitle: "Happy Guests",
    },
    {
      icon: <GiLaurelsTrophy size={34} />,
      title: "15+ Years",
      subtitle: "Experience",
    },
    {
      icon: <FaShieldAlt size={30} />,
      title: "100% Safe",
      subtitle: "& Secure",
    },
  ];

  return (
    <div className=" container -mt-24 z-20 relative mb-5">
      <div className="inline-flex items-center gap-4 rounded-t-md  bg-gradient-to-r from-[#002a13] to-[#03664d] px-5 pt-3 pb-5 l ">
        {/* Icon */}
        <div className="text-white">
          <UsersRound size={24} />
        </div>

        {/* Text */}
        <p className="text-sm md:text-lg font-semibold text-white">
          Join <span className="font-bold">10,000+</span> Happy travelers
        </p>

        {/* Avatars */}
        <div className="flex -space-x-3">
          <img
            src="https://i.pravatar.cc/100?img=11"
            alt="Traveler"
            className="h-10 w-10 rounded-full border-2 border-white object-cover"
          />

          <img
            src="https://i.pravatar.cc/100?img=47"
            alt="Traveler"
            className="h-10 w-10 rounded-full border-2 border-white object-cover"
          />

          <img
            src="https://i.pravatar.cc/100?img=68"
            alt="Traveler"
            className="h-10 w-10 rounded-full border-2 border-white object-cover"
          />

          {/* Badge */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-yellow-400 to-orange-500 text-sm font-bold text-white shadow-lg">
            10K+
          </div>
        </div>
      </div>
      {/* Features Card */}
      <div className="overflow-hidden rounded-md bg-white shadow-lg -mt-2 z-40 relative">
        <div className="grid  grid-cols-4">
          {features.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center px-1 sm:px-4 py-3 sm:py-7 text-center ${
                index !== features.length - 1 ? "border-r border-gray-200" : ""
              }`}
            >
              <div className="mb-2 md:mb-3 text-[#003c2f]">{item.icon}</div>

              <p className="text-xs sm:text-base md:text-lg text-[#1c1c1c] font-medium">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Section */}
      {/* <div className="rounded-md bg-[#f7f8ef] p-2 md:p-5  border">

                <div className="mb-2 md:mb-6 flex items-center justify-center gap-3">
                    <div className="relative h-[1px] w-10 bg-[#a7a74f] md:w-20">
                        <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#a7a74f]" />
                    </div>

                    <h2 className="text-center text-sm md:text-lg lg:text-xl font-bold text-[#003c2f]">
                        Why 10,000+ Travelers Trust Us?
                    </h2>

                    <div className="relative h-[1px] w-10 bg-[#a7a74f] md:w-20">
                        <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#a7a74f]" />
                    </div>
                </div>

       
                <div className="grid grid-cols-4">
                    {trust.map((item, index) => (
                        <div
                            key={index}
                            className={`px-1 py-1 md:py-4 text-center ${index !== trust.length - 1
                                ? "border-r border-gray-200"
                                : ""
                                }`}
                        >
                            <div className="mb-1 md:mb-3 flex justify-center text-[#003c2f]">
                                {item.icon}
                            </div>

                            <h3 className="text-sm  md:text-lg text-[#1c1c1c] font-bold">
                                {item.title}
                            </h3>

                            <p className="mt-0 md:mt-1 text-xs sm:text-base md:text-lg text-[#1c1c1c] font-medium">
                                {item.subtitle}
                            </p>
                        </div>
                    ))}
                </div>
            </div> */}
    </div>
  );
}
