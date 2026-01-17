import { useEffect, useState, useRef } from "react";
import { FaPaperPlane, FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionsSlice";

export default function Chat() {
  const { targetUserId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userConnections = useSelector((state) => state.connections);
  const [newMessage, setNewMessage] = useState("");
  const [message, setMessage] = useState([]);
  const user = useSelector((state) => state.user);
  const messagesEndRef = useRef(null);
  const userId = user?._id;

  const selectedConnection = userConnections?.find(
    (connection) => connection.user._id === targetUserId
  );
  useEffect(() => {
    const loadConnectionsIfNeeded = async () => {
      try {
        // If redux already has data, don't fetch again
        if (userConnections && userConnections.length > 0) return;

        const res = await axios.get(BASE_URL + "/user/connections", {
          withCredentials: true,
        });

        dispatch(addConnections(res.data.data));
      } catch (error) {
        console.log(error);
      }
    };

    loadConnectionsIfNeeded();
  }, []);

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      //   console.log(chat.data);
      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text } = msg;
        return {
          timestamp: msg?.createdAt,
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
        };
      });
      setMessage(chatMessages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user?.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageRecived", ({ firstName, text }) => {
      //   console.log(firstName + ": " + text);
      setMessage((message) => [...message, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const sendMessage = () => {
    if (!newMessage?.trim()) return;
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  //   console.log(userConnections);
  const formatTime = (time) => {
    if (!time) return "";
    const date = new Date(time);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="relative flex flex-1 items-center justify-center bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10 overflow-hidden">
      {/* Chat Window */}
      {/* <div className="w-full max-w-2xl h-[75vh] bg-base-100 rounded-3xl shadow-2xl overflow-hidden flex flex-col "> */}
      <div
        className="
  w-full
  h-[85vh] sm:h-[75vh]
  max-w-full sm:max-w-2xl
  bg-base-100
  sm:rounded-3xl
  shadow-2xl
  overflow-hidden
  flex flex-col
"
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-4 bg-base-200 border-b border-indigo-400/25">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-circle btn-sm btn-ghost"
          >
            <FaArrowLeft />
          </button>

          <div className="flex items-center gap-3">
            <div className="avatar online">
              <div className="w-10 rounded-full">
                <img
                  src={
                    selectedConnection?.user.photoUrl ||
                    "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
                  }
                  alt={selectedConnection?.user.firstName}
                />
              </div>
            </div>
            <div>
              <h2 className="font-semibold text-lg">
                {selectedConnection?.user.firstName}{" "}
                {selectedConnection?.user.lastName}
              </h2>
              <p className="text-xs text-success">Online</p>
            </div>
          </div>
        </div>

        {/* Messages */}

        <div className="flex-1 overflow-y-auto px-4 py-3 bg-base-100 space-y-3">
          {message?.length === 0 && (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm">
              Start your conversation 👋
            </div>
          )}

          {message?.map((msg, index) => {
            const isMe = msg.firstName === user.firstName;

            return (
              <div
                key={index}
                className={`flex flex-col ${
                  isMe ? "items-end" : "items-start"
                }`}
              >
                {/* Sender name */}
                <span
                  className={`
          text-[10px]
          mb-1
          px-2
          text-gray-400
          ${isMe ? "text-right" : "text-left"}
        `}
                >
                  {isMe ? "You" : msg.firstName}
                </span>

                {/* Bubble + Time */}
                <div className={`chat ${isMe ? "chat-end" : "chat-start"}`}>
                  <div
                    className={`
            chat-bubble
            ${isMe ? "chat-bubble-primary" : "chat-bubble-secondary"}
            w-[78%]
            px-4 py-2
            leading-snug
            relative
          `}
                  >
                    {/* Message text */}
                    <p className="text-sm">{msg.text}</p>

                    {/* Time */}
                    <span
                      className={`
              block
              text-[9px]
              mt-1
              text-right
              opacity-70
              ${isMe ? "text-white/70" : "text-black/60"}
            `}
                    >
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Auto scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        {/* Input */}
        <div className="p-3 bg-base-200 border-t border-indigo-400/25">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Type a message..."
              className="input input-bordered w-full rounded-full"
            />
            <button
              className="btn btn-primary rounded-full px-4"
              onClick={sendMessage}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
