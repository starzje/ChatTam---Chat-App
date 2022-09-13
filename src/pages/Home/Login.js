import { useEffect, useState } from "react";
//firebase
import { auth, signInWithEmailAndPassword, db } from "../../firebase";
import {
  query,
  collection,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
// redux and react-router-dom
import { login, selectUser } from "../../store/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
// utility npm
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import { motion } from "framer-motion";
//helpers
import {
  formPageLoadingAnimation,
  formModalAnimation,
} from "../../helpers/animations";
import { validateLoginForm } from "../../helpers/formValidation";
//components
import Form from "../../components/Form";
import Button from "../../components/Button";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // user info
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // redirect to chat if user logged in
  const { user } = useSelector(selectUser);
  useEffect(() => {
    if (user !== null) {
      navigate(`/chat`);
    }
  }, [user, navigate]);

  const setOnlineStatus = async (userID) => {
    const q = query(collection(db, "userInfo"), where("uid", "==", userID));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((docSnapShot) => {
      console.log(docSnapShot.data());
      try {
        updateDoc(doc(db, "userInfo", docSnapShot.id), {
          ...docSnapShot.data(),
          isOnline: true,
          lastTimeOnline: new Date().toLocaleString(),
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  // login user
  const loginToApp = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.warn("Please fill in all the fields");
      return;
    }
    const idToast = toast.loading("Logging in...");

    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        setOnlineStatus(userAuth.user.uid);
      })

      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            photoUrl: userAuth.user.photoURL,
          })
        );
        toast.dismiss(idToast);
      })

      .catch((err) => {
        toast.dismiss(idToast);
        validateLoginForm(err, toast);
      });
  };

  return (
    <motion.div
      variants={formPageLoadingAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* LOGIN MODAL*/}
      <motion.div
        variants={formModalAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
        className=" shadow-2xl min-w-[25em] ">
        <div className="bg-gradient-dark-r py-3 rounded-t-3xl w-full opacity-60 ">
          <h4 className="text-white  tracking-wide font-semibold text-center">
            #LOGIN
          </h4>
        </div>
        <div className="bg-[#141223] p-10 w-full rounded-b-3xl">
          {/* FORM */}
          <form onSubmit={loginToApp} className="flex flex-col">
            <Form
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
            {/* submit button */}
            <Button
              text="LOGIN"
              icon={<FaSignInAlt />}
              handleClick={loginToApp}
            />
          </form>
          {/* REGISTER LINK */}
          <div className="text-center mt-10">
            <span className="text-white ">Not a member? </span>
            <Link
              className="pl-1 text-primary-hover transition duration-300 hover:text-primary-violet "
              to="/register">
              register here
            </Link>
          </div>
          {/* HOMEPAEG LINK */}
          <div className="text-center mt-1">
            <span className="text-white ">Back to </span>
            <Link
              className="pl-1 text-primary-hover transition duration-300 hover:text-primary-violet"
              to="/">
              Homepage
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Login;
