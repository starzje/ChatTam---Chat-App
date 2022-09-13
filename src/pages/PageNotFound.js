import React from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-end h-screen pb-10 bg-center bg-cover bg-404-pattern">
      <h3 className="text-white text-[3rem] font-bold leading-none">
        404 ERROR!
      </h3>
      <p className="mt-2 text-xl font-light tracking-wider text-white">
        Looks like you're lost in space
      </p>
      <Link
        className="flex items-center justify-center gap-2 px-20 py-2 mt-5 text-center text-white transition duration-300 bg-primary-violet hover:bg-primary-hover rounded-xl "
        to="/">
        Go back Home
        <FaSignOutAlt />
      </Link>
    </div>
  );
};

export default PageNotFound;
