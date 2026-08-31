import MessageList from './MessageList.jsx'
import Nav from './Nav.jsx'
import Chatinput from './Chatinput.jsx'
import { useDispatch, useSelector } from 'react-redux'
import getMessages from '../features/getMessages.jsx'
import { setMessages } from '../redux/messagesSlice.js'
import { useEffect } from 'react'

const ChatArea = () => {
  const { selectedConversation } = useSelector((state) => state.conversation)
  const dispatch = useDispatch()

  useEffect(() => {
    const getMesg = async() => { 
      if(selectedConversation){
        const data = await getMessages(selectedConversation?._id)
        dispatch(setMessages(data))
      }
    }
    getMesg()
  },[dispatch,selectedConversation, selectedConversation?._id])

  return (
    <div className="flex-1 flex flex-col">
      <Nav />
      <MessageList />
      <Chatinput />
    </div>
  )
}

export default ChatArea

