import React from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const PageNotFound = () => {
  return (
    <div className="bg-404-pattern bg-cover bg-center flex justify-end items-center h-screen flex-col  pb-10">
      <h3 className="text-white text-[3rem] font-bold leading-none">
        404 ERROR!
      </h3>
      <p className="text-white font-light tracking-wider mt-2 text-xl">
        Looks like you're lost in space
      </p>
      <Link
        className="bg-primary-violet mt-5 flex justify-center items-center gap-2 text-white text-center hover:bg-primary-hover py-2 px-20 rounded-xl transition duration-300 "
        to="/">
        Go back Home
        <FaSignOutAlt />
      </Link>
    </div>
  );
};

export default PageNotFound;
