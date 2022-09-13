import { useEffect, useState } from "react";
//firebase
import { auth, signInAnonymously, updateProfile } from "../../firebase";
// redux and react-router-dom
import { login, selectUser } from "../../store/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
//npm utils
import { toast } from "react-toastify";
import { FaUserPlus, FaSignInAlt, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
//helpers
import {
  fadeInAnimation,
  buttonAnimation,
  imageAnimation,
  exitAnimationHero,
} from "../../helpers/animations";

const Homepage = () => {
  const [userRegistered, setUserRegistered] = useState(false);
  const { user } = useSelector(selectUser);
  const navigate = useNavigate();

  //if user is logged in, redirect to chat
  useEffect(() => {
    if (user !== null) {
      navigate(`/chat`);
    }
  }, [user, userRegistered, navigate]);

  const dispatch = useDispatch();
  const handleGuestLogin = (e) => {
    const idToast = toast.loading("Logging in as guest...");
    e.preventDefault();
    // Sign in annonymously as guest
    signInAnonymously(auth)
      .then((userAuth) => {
        setUserRegistered(true);
        toast.dismiss(idToast);
        updateProfile(userAuth.user, {
          displayName: "Guest" + Math.floor(Math.random() * 1000),
          photoURL: "./assets/guestProfile.jpg",
        });

        dispatch(
          login({
            uid: userAuth.user.uid,
            displayName: "Guest" + Math.floor(Math.random() * 1000),
            photoUrl: "./assets/guestProfile.jpg",
          })
        );
      })
      .catch((err) => {
        toast.dismiss(idToast);
        alert(err);
      });
  };

  return (
    <motion.div
      variants={exitAnimationHero}
      exit="exit"
      className="overflow-hidden">
      <header className="container flex items-center justify-start">
        <h2 className="pt-8 text-xl font-semibold text-white ">ChatTam.</h2>
      </header>
      {/* hero */}
      <main className="container flex flex-col items-center justify-between mt-10 2xl:mt-24 lg:mt-7 md:flex-row">
        {/* left side */}
        <motion.section
          variants={fadeInAnimation}
          initial="hidden"
          animate="visible"
          className="w-full md:w-1/2 ">
          <h1 className=" max-w-full lg:max-w-md 2xl:max-w-full text-3xl lg:text-4xl 2xl:text-[3rem] font-semibold text-center md:text-left text-white leading-[3rem] 2xl:leading-[4.5rem] lg:leading-[3.5rem] mb-5">
            The only chat app you will ever need...
          </h1>
          <p className="text-xl text-center text-white md:text-left font-extralight 2xl:text-3xl lg:text-xl">
            Make an account and start chatting today!
          </p>
          <div className="mt-10 2xl:max-w-xl lg:max-w-[22em]">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.5,
                ease: "easeInOut",
              }}
              className="flex mb-5 gap-7 2xl:mb-7">
              <Link className="btn-purple" to="../login">
                Login <FaSignInAlt />
              </Link>
              <Link className="btn-purple" to="../register">
                Register
                <FaUserPlus />
              </Link>
            </motion.div>
            <motion.button
              variants={buttonAnimation}
              initial="hidden"
              animate="visible"
              className="btn-dark "
              type="submit"
              onClick={handleGuestLogin}>
              Login as guest
              <FaUserCircle />
            </motion.button>
          </div>
        </motion.section>
        {/* right side */}
        <motion.section
          variants={imageAnimation}
          initial="hidden"
          animate="visible"
          className="mt-20 md:mt-0">
          <img
            loading="lazy"
            className="object-cover"
            src="./assets/hero.png"
            alt="chat screen"
          />
        </motion.section>
      </main>
    </motion.div>
  );
};

export default Homepage;
