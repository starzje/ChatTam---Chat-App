import { useState } from "react";
//firebase
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./../firebase";
//npm utility
import { MdSend } from "react-icons/md";
import { toast } from "react-toastify";

const SendMessage = ({ scroll, roomId }) => {
  const [input, setInput] = useState("");

  // send message to the chat
  const sendMessage = async (e) => {
    e.preventDefault();
    if (input === "") {
      toast.warn("Please enter a message");
      return;
    }
    // add message to the firestore database, rooms and messages collection
    const { uid, displayName } = auth.currentUser;
    await addDoc(collection(db, "rooms", roomId, "messages"), {
      name: displayName,
      message: input,
      timestamp: serverTimestamp(),
      uid: uid,
    });
    setInput("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`mt-auto pt-6 z-20 bg-hero-pattern bg-cover bg-bottom fixed bottom-0 w-full md:w-[65%] 2xl:w-[65.7%] pb-7 px-5 md:px-20`}>
      <form onSubmit={sendMessage} className="flex w-full text-xl ">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 text-base font-light text-white placeholder-white bg-transparent border border-white rounded-2xl border-opacity-30 h-14 placeholder-opacity-40 focus:outline-none"
          type="text"
          placeholder="Write a message..."
        />
        <button className="w-[10%] md:ml-0 ml-2">
          <MdSend className="w-full text-4xl hover:text-primary-hover text-primary-violet" />
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
