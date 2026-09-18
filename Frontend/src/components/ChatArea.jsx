import MessageList from './MessageList.jsx'
import Nav from './Nav.jsx'
import Chatinput from './Chatinput.jsx'
import { useDispatch, useSelector } from 'react-redux'
import getMessages from '../features/getMessages.js'
import { setArtifacts, setMessages } from '../redux/messagesSlice.js'
import { useEffect, useRef } from 'react'

const ChatArea = () => {
  const { selectedConversation } = useSelector((state) => state.conversation)
  const newConversationRef = useRef(false);
  const dispatch = useDispatch()

  useEffect(() => {
    const getMesg = async () => {
      if (newConversationRef.current) {
        newConversationRef.current = false;
        return;
      }
      if (selectedConversation) {
        const data = await getMessages(selectedConversation?._id)
        console.log(data)

        dispatch(setMessages(data))

        const latestArtifactMessage = [...data].reverse().find(msg => msg.artifacts && msg.artifacts.length > 0)
        dispatch(setArtifacts(latestArtifactMessage?.artifacts || []))
      }
    }
    getMesg()
  }, [dispatch, selectedConversation, selectedConversation?._id])

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <Nav />
      <MessageList />
      <Chatinput newConversationRef={newConversationRef} />
    </div>
  )
}

export default ChatArea

