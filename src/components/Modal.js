import Backdrop from "./Backdrop";
import Avatar from "react-avatar";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { modalAnimation } from "../helpers/animations";

const Modal = ({ user, setOpenModal }) => {
  return (
    <Backdrop onClick={() => setOpenModal(false)}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={modalAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-[calc(100vw-2em)] h-[calc(100vh-15em)]  md:w-[35em] md:h-[18em] bg-gradient-to-r from-[#252e47] to-[#1c1c32] shadow-2xl  text-white  absolute left-0 right-0 top-0 bottom-0 my-auto mx-auto text-center z-50 rounded-3xl x">
        <IoClose
          className="cursor-pointer text-2xl absolute right-10 top-5"
          onClick={() => setOpenModal(false)}
        />
        <div className="justify-center items-center  flex md:flex-row flex-col gap-10 h-full  ">
          <Avatar
            src={user.image ? user.image : user.photoUrl}
            name={user.name ? user.name : user.displayName}
            size="150"
          />
          <div className="text-center md:text-left break-words  ">
            <p className="text-3xl font-bold break-words max-w-xs ">
              {user.name ? user.name : user.displayName}
            </p>
            <p>
              user id:{" "}
              <span className="font-light">
                #{user.uid.replace(/[^0-9]/g, "")}
              </span>
            </p>
            <p>{user.email}</p>
            {user.hasOwnProperty("isOnline") ? (
              <p>
                Last seen:{" "}
                <span
                  className={`${
                    user.isOnline ? "text-green-500" : "text-white"
                  }`}>
                  {user.isOnline ? "Currently online" : user.lastTimeOnline}
                </span>
              </p>
            ) : (
              ""
            )}
            {user.memberSince ? (
              <>
                <p className="mt-5 font-medium">member since:</p>
                <p className="font-light "> {user.memberSince}</p>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
