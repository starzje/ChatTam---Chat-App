import { useEffect, useState, useRef } from "react";
//firebase
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  storage,
  db,
} from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
// redux and react router
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../store/features/userSlice";
// utility npm
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";
//helpers
import {
  formPageLoadingAnimation,
  formModalAnimation,
} from "../../helpers/animations";
import {
  validateRegistrationForm,
  validateUsernameInput,
  validateUsernameLength,
} from "../../helpers/formValidation";
// components
import Form from "../../components/Form";
import Button from "../../components/Button";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorFeedback = useRef(null);

  // user info
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // user image
  const [image, setimage] = useState("");
  const [previewImage, setpreviewImage] = useState("./assets/guestProfile.jpg");
  const onImageChange = (img) => {
    setimage(img);
    setpreviewImage(URL.createObjectURL(img));
  };

  // redirect to chat if user logged in
  const { user } = useSelector(selectUser);
  useEffect(() => {
    if (user !== null) {
      navigate(`/chat`);
    }
  }, [user, navigate]);

  // add user data
  const saveUserInformationToDB = async (url) => {
    const { uid } = auth.currentUser;
    if (url === null || url === undefined) {
      url = "";
    }
    await addDoc(collection(db, "userInfo"), {
      name: name,
      uid,
      image: url,
      isOnline: true,
      memberSince: new Date().toLocaleString(),
      lastTimeOnline: new Date().toLocaleString(),
    });
  };
  const metadata = { contentType: "image/jpeg " };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || password === "" || email === "") {
      validateUsernameInput(errorFeedback, toast);
      return;
    } else if (name.length < 3 || name.length > 20) {
      validateUsernameLength(errorFeedback, toast);
      return;
    }
    const idToast = toast.loading("Creating user...");
    // if image exists, upload image to firebase storage and pass the URL to handleRegister function, else pass empty string
    if (image) {
      const storageRef = ref(storage, `userimages/${uuidv4()}`);
      const uploadTask = uploadBytesResumable(storageRef, image, metadata);
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
            handleRegister(idToast, URL);
          });
        }
      );
    } else {
      handleRegister(idToast);
    }
  };

  // create user in firebase auth and add information to redux user slice
  const handleRegister = (idToast, url) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        saveUserInformationToDB(url, idToast);
        updateProfile(userAuth.user, {
          displayName: name,
          photoURL: url,
        }).then(
          dispatch(
            login({
              email: userAuth.user.email,
              uid: userAuth.user.uid,
              displayName: name,
              photoUrl: url,
            })
          )
        );
      })
      .catch((err) => {
        toast.dismiss(idToast);
        validateRegistrationForm(err, errorFeedback, toast);
      });
  };

  return (
    <motion.div
      variants={formPageLoadingAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center justify-center min-h-screen overflow-hidden scroll">
      <motion.div
        variants={formModalAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
        className=" shadow-2xl min-w-[27em]">
        <div className="w-full py-3 bg-gradient-dark-r rounded-t-3xl opacity-60 ">
          <h4 className="font-semibold tracking-wide text-center text-white">
            #REGISTER
          </h4>
        </div>
        <div className="bg-[#141223]  px-10 pt-7 pb-6 w-full rounded-b-3xl">
          <div className="flex items-center justify-center ">
            <img
              src={previewImage}
              alt="Avatar"
              className="hidden w-16 h-16 rounded-full md:block "
            />
          </div>
          {/* REGISTER FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col px-5 md:px-0">
            {/* username */}
            <label className="input-label" htmlFor="username">
              Username
            </label>
            <input
              title="Must be between 3-14 characters"
              className="input-field "
              placeholder="john doe"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Form
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
            {/* error */}
            <div
              className="mb-2 ml-1 text-left text-red-500"
              ref={errorFeedback}></div>
            {/* Upload image */}
            <label className="w-full mb-4   transition duration-300 flex-col items-center px-4 py-2 bg-[#2D2A46] text-white rounded-full shadow-lg tracking-wide uppercase cursor-pointer hover:bg-primary-hover hover:text-white hidden md:flex">
              <div className="flex items-center justify-center gap-5">
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="text-base leading-normal ">
                  Upload profile image
                </span>
              </div>
              <input
                type="file"
                className="hidden"
                onChange={(e) => onImageChange(e.target.files[0])}
              />
            </label>

            {/* submit button */}
            <Button
              text="Register"
              icon={<FaUserPlus />}
              handleClick={handleSubmit}
            />
          </form>

          {/* LOGIN LINK */}
          <div className="mt-5 text-center">
            <span className="text-white">Already a member? </span>
            <Link
              className="pl-2 transition duration-300 text-primary-hover hover:text-primary-violet"
              to="/login">
              {" "}
              Go to Login
            </Link>
          </div>
          {/* HOMEPAE LINK */}
          <div className="mt-1 text-center">
            <span className="text-white ">Back to </span>
            <Link
              className="pl-1 transition duration-300 text-primary-hover hover:text-primary-violet"
              to="/">
              Homepage
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Register;
