import { useState } from "react";
import { useChat } from "../hooks/useChat";
import { useSelector } from "react-redux";

export default function ChatInput() {
  const chat = useChat()
  const [message, setMessage] = useState("");
    const currentChatId = useSelector((state) => state.chat.currentChatId)

  const handelSubmit = (e) => {
    e.preventDefault()

    const trimmedMessage = message.trim()
    if(!trimmedMessage){
      return
    }
     chat.handelSendMessage({ message: trimmedMessage, chatId: currentChatId })
    setMessage("");
  };

  return (
    <div className="p-4">
      <div className="relative w-full bg-[#303030] border border-[#3D2517] text-white px-8 rounded-full shadow-lg shadow-amber-700/30">

        <form onSubmit={handelSubmit}>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message AI Assistant..."
            className="border-none text-white w-full outline-none resize-none input_area pt-5"
          />

          <button
            className="absolute right-8 top-3 bg-[#b54922] px-4 py-2 cursor-pointer rounded-lg text-white"
          >
            ➤
          </button>
        </form>

      </div>
    </div>
  );
}
