import { initializeSocketConnection } from "../service/chat.socket";
import {
  sendMessage,
  getChats,
  getMessage,
  deleteChat,
} from "../service/chat.api";
import {
  createNewChat,
  addNewMessage,
  setChats,
  setCurrentChatId,
  setIsLoading,
  setError,
} from "../chat.slice";
import { useDispatch } from "react-redux";

export const useChat = () => {
  const dispatch = useDispatch();

  async function handelSendMessage({ message, chatId }) {
    dispatch(setIsLoading(true));
    const data = await sendMessage({ message, chatId });
    const { chat, aiMessage } = data;
    dispatch(
      createNewChat({
        chatId: chat._id,
        title: chat.title,
      }),
    );
    dispatch(addNewMessage({
      chatId: chat._id,
      content: message,
      role: "user"
    }))
    dispatch(addNewMessage({
      chatId: chat._id,
      content: aiMessage.content,
      role: aiMessage.role
    }))
    dispatch(setCurrentChatId(chat._id));
  }
  return {
    initializeSocketConnection,
    handelSendMessage,
  };
};
