import { SiStarship } from "react-icons/si";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { MdNotificationsActive } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import React from "react";

interface NavbarProps {
  toggleSidebar?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <div className="flex flex-row flex-nowrap justify-center items-center min-h-[60px] md:px-0 px-4">
      <div
        onClick={toggleSidebar}
        className="cursor-pointer bg-cerulean rounded-full text-white p-1 md:hidden"
      >
        <IoMenu className="text-xl" />
      </div>
      <div className="font-lobster md:basis-[20%] inline-flex justify-center items-center gap-2 w-full">
        <SiStarship className="text-cerulean text-2xl" />
        <p className="">App Presence</p>
      </div>
      <div className="md:basis-[60%] hidden md:flex">
        <div className="relative inline-flex gap-1 items-center w-full">
          <div
            onClick={toggleSidebar}
            className="cursor-pointer bg-cerulean rounded-full text-white p-1 invisible md:visible"
          >
            <IoMenu className="text-xl" />
          </div>
          <div className="inline-flex justify-center items-center w-full">
            <FiSearch className="text-2xl" />
            <input
              type={"search"}
              placeholder="Search"
              className={`text-base bg-transparent w-[90%] focus:outline-none focus:ring-0 border-0`}
            />
          </div>
          <MdNotificationsActive className="text-2xl text-frenchgray" />
        </div>
      </div>
      <div className="md:basis-[20%] hidden md:block">
        <div className="inline-flex justify-around w-full items-center cursor-pointer">
          <img
            className="h-8 w-8 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <div className="block text-center invisible md:visible">
            <p className="text-base">Hisbil Islami</p>
            <p className="text-sm text-frenchgray-900">@hisbil</p>
          </div>
          <IoIosArrowDropdownCircle className="invisible md:visible" />
        </div>
      </div>
      <img
        className="h-8 w-8 rounded-full ring-2 ring-white md:hidden cursor-pointer"
        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
    </div>
  );
};

export default Navbar;
