import { useEffect, useState, useRef } from "react";
//firebase
import { db } from "../firebase";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
// react-router-dom
import { useParams } from "react-router-dom";
// components
import Message from "../components/Message";
import SendMessage from "../components/SendMessage";

function DynamicChatPage() {
  const scroll = useRef(null);
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState([""]);

  // get user images from DB
  useEffect(() => {
    const q = query(collection(db, "userInfo"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let image = [];
      querySnapshot.forEach((doc) => {
        image.push({ ...doc.data(), id: doc.id });
      });
      setImage(image);
    });
    return () => unsubscribe();
  }, []);

  // get all messages from id param url and display them only in that url
  useEffect(() => {
    if (id) {
      const msgColl = query(
        collection(db, "rooms", id, "messages"),
        orderBy("timestamp")
      );
      onSnapshot(msgColl, (querySnapshot) => {
        setMessages(querySnapshot.docs.map((msg) => msg.data()));
      });
    } else {
      // if no room is selected, display messages in "public-room" collection
      const msgColl = query(
        collection(db, "rooms", "public-room", "messages"),
        orderBy("timestamp")
      );
      onSnapshot(msgColl, (querySnapshot) => {
        setMessages(querySnapshot.docs.map((msg) => msg.data()));
      });
    }
  }, [id]);

  return (
    <div className="flex flex-col h-screen overflow-auto bg-center bg-no-repeat bg-cover bg-hero-pattern">
      <div className="relative z-10 flex flex-col mb-20 overflow-ellipsis">
        <div className="w-full p-10 bg-gradient-to-r from-[#111826] to-[#1e1232] bg-opacity-70">
          <h2 className="text-[#4E7AA8] text-center md:text-left uppercase font-semibold text-4xl">
            #{id ? id : "public-room"}
          </h2>
        </div>
        <div className="flex flex-col p-3 mt-1">
          {messages &&
            messages.map((message, index) => (
              <Message key={index} message={message} image={image} />
            ))}
        </div>
      </div>
      <span ref={scroll}> </span>
      <SendMessage scroll={scroll} roomId={id ? id : "public-room"} />
    </div>
  );
}

export default DynamicChatPage;
