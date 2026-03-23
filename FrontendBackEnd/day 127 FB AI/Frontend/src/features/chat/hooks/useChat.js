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
  addMessages,
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
    dispatch(
      addNewMessage({
        chatId: chat._id,
        content: message,
        role: "user",
      }),
    );
    dispatch(
      addNewMessage({
        chatId: chat._id,
        content: aiMessage.content,
        role: aiMessage.role,
      }),
    );
    dispatch(setCurrentChatId(chat._id));
  }

  async function handleGetChats() {
    dispatch(setIsLoading(true));
    const data = await getChats();
    const { chats } = data;
    dispatch(
      setChats(
        chats.reduce((acc, chat) => {
          acc[chat._id] = {
            id: chat._id,
            title: chat.title,
            message: [],
            lastUpdate: chat.updatedAt,
          };
          return acc;
        }, {}),
      ),
    );
    dispatch(setIsLoading(false));
  }

  async function handleOpenChat(chatId){
    const data = await getMessage(chatId)
    const {messages} =data

    const formateMessage = messages.map(msg => ({
      content: msg.content,
      role:msg.role
    }))

    dispatch(addMessages({
      chatId,
      messages: formateMessage
    }))

    dispatch(setCurrentChatId(chatId))
  }
  return {
    initializeSocketConnection,
    handelSendMessage,
    handleGetChats,
    handleOpenChat
  };
};
