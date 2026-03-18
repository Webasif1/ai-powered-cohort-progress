import ChatHeader from "./ChatHeader";
import Message from "./Message";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";

export default function ChatArea() {
  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)
  console.log(chats)
  console.log(currentChatId)
  const messages = chats[currentChatId]?.message || [];


  return (
    <div className="flex-1 flex flex-col mx-auto max-w-1/2">

      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 chat_area">
        {messages.map((msg, id) => {
          return <Message
          key={id}
            type={msg.role}
            text={msg.content}
          />
        })}

      </div>

      <ChatInput />

    </div>
  );
}
