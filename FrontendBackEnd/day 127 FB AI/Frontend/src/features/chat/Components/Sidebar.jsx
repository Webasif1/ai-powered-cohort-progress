import { useSelector } from "react-redux";
import { useChat } from '../hooks/useChat'

export default function Sidebar() {
  const chats = useSelector((state) => state.chat.chats)
  const chat = useChat()

  const openChat = (chatId)=>{
    chat.handleOpenChat(chatId)
  }

  return (
    <aside className="w-72 bg-[#1A0F08] border-r border-[#3D2517] flex flex-col p-4">

      {/* New Chat */}
      <button className="w-full py-3 rounded-xl bg-[#C95A32] text-white font-semibold mb-6">
        + New Chat
      </button>

      {/* Recent */}
      <p className="text-xs text-gray-500 mb-3">RECENT ACTIVITY</p>

      <div className="space-y-2 flex-1">
        {Object.values(chats).map((chat,idx) => {
          return <div key={idx} onClick={()=> openChat(chat.id)} className="p-2 hover:bg-[#2D1A0F] active:bg-[#2D1A0F] rounded-lg cursor-pointer">
            {chat.title}
          </div>
        })}
      </div>

      {/* Profile */}
      <div className="mt-auto text-sm text-gray-400">
        User Profile
      </div>
    </aside>
  );
}
