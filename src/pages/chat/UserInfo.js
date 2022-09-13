import { db, auth } from "../../firebase";
import {
  doc,
  updateDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
// utiltiy npm
import Avatar from "react-avatar";
import { toast } from "react-toastify";
import { FaSignOutAlt } from "react-icons/fa";
import Button from "../../components/Button";

const UserInfo = ({ user, handleClickUser }) => {
  // change online status to false and update last time online, then sign user out
  const logoutOfApp = async () => {
    const idToast = toast.loading("Signing out...");
    const q = query(collection(db, "userInfo"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((docSnapShot) => {
      try {
        updateDoc(doc(db, "userInfo", docSnapShot.id), {
          ...docSnapShot.data(),
          isOnline: false,
          lastTimeOnline: new Date().toLocaleString(),
        }).then(() => {
          toast.dismiss(idToast);
          auth.signOut();
        });
      } catch (error) {
        console.log(error);
      }
    });
  };
  // if user is guest, just sign out
  const guestLogout = () => {
    auth.signOut();
  };

  return (
    <>
      {user.email === null || user.email === undefined ? (
        <>
          <div className="relative">
            <Avatar
              src={user.photoUrl ? user.photoUrl : ""}
              size={40}
              round="50%"
              maxInitials={2}
              name={user.displayName}
              textSizeRatio={1.5}
            />
          </div>
          <h2>
            Hello{" "}
            <span className="text-violet-400 font-semibold">
              {user.displayName}
            </span>{" "}
          </h2>
          <Button
            text="Logout"
            icon={<FaSignOutAlt />}
            handleClick={guestLogout}
          />
        </>
      ) : (
        <>
          <div
            onClick={() => handleClickUser(user)}
            className="relative cursor-pointer ">
            <Avatar
              src={user.photoUrl ? user.photoUrl : ""}
              size={40}
              round="50%"
              maxInitials={2}
              name={user.displayName}
              textSizeRatio={1.5}
            />
            <div className="bg-green-500 w-3 h-3 rounded-full absolute top-0 -right-0.5"></div>
          </div>
          <div>
            <p className="font-semibold ">{user.displayName}</p>
            <p className="font-light text-center">
              {/* just return numbers for ID */}#
              {user.uid.replace(/[^0-9]/g, "")}
            </p>
          </div>

          <Button
            text="Logout"
            icon={<FaSignOutAlt />}
            handleClick={logoutOfApp}
          />
        </>
      )}
    </>
  );
};

export default UserInfo;
