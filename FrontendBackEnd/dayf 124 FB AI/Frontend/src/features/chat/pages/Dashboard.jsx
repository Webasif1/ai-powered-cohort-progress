import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import Sidebar from '../Components/Sidebar'
import ChatArea from '../Components/ChatArea'

const Dashboard = () => {
  const chat = useChat()

  useEffect(() => {
    chat.initializeSocketConnection();
    chat.handleGetChats()
  }, [])
  return (
    <div className="flex h-screen bg-[#24130a] text-gray-200 overflow-hidden">
      <Sidebar />
      <ChatArea />
      <ChatArea />
    </div>
  )
}

export default Dashboard
