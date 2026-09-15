import { Code2, FileText, Globe, ImageIcon, MessageSquare, Mic, Paperclip, Presentation, Send, X, Zap } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import sendMessage from '../features/sendMessage.js'
import { addMessage, setArtifacts } from '../redux/messagesSlice.js'
import { addConversation, setConvTitle, setSelectedConversation } from '../redux/conversationSlice.js'
import { createConversation } from '../features/createConversation.js'
import { updateConversation } from '../features/updateConversation.js'
import { useRef } from 'react'

const Chatinput = () => {
  const [value, setValue] = useState("")
  const [selectedAgent, setSelectedAgent] = useState("Auto")
  const dispatch = useDispatch()
  const { selectedConversation } = useSelector((state) => state.conversation)
  const [selectedFile, setSelectedFile] = useState(null)
  const fileRef = useRef(null)

  const handleSendMessage = async() => {
    let conversation = selectedConversation
    if(!conversation){
      const conv = await createConversation()
      dispatch(setSelectedConversation(conv))
      dispatch(addConversation(conv))
      conversation = conv
    }
    if(conversation.title == "New Chat"){
      const payload = {
        id: conversation?._id,
        title: value.trim()
      }
      await updateConversation(payload)
      dispatch(setConvTitle({conversationId: conversation._id, title: value.trim()}))
    }

    const formData = new FormData()
    formData.append("prompt", value.trim())
    formData.append("conversationId", conversation?._id)
    formData.append("agent",selectedAgent.toLowerCase())
    formData.append("file",selectedFile)

    dispatch(addMessage({role: "user", content: value.trim()}))
    setValue("")
    const data = await sendMessage(formData)
    dispatch(setArtifacts(data?.artifacts || []))
    dispatch(addMessage({role: "assistant", content: data.answer, images: data.images }))
    console.log(data)
  }

  const agents = [
    {
      id: "auto",
      icon: Zap,
      label: "Auto"
    }, 
    {
      id: "chat",
      icon: MessageSquare,
      label: "Chat"
    }, 
    {
      id: "coding",
      icon: Code2,
      label: "Coding"
    }, 
    {
      id: "pdf",
      icon: FileText,
      label: "PDF"
    },
    {
      id: "ppt",
      icon: Presentation,
      label: "PPT"
    },
    {
      id: "vision",
      icon: ImageIcon,
      label: "Vision"
    },
    {
      id: "search",
      icon: Globe,
      label: "Search"
    }
  ]

  return (
    <div className="w-full overflow-hidden px-3 md:px-5 py-4 border-t border-white/6 bg-[#0d0f14]">
      <div className="flex flex-col gap-2 bg-white/3 border border-white/7 rounded-2xl px-4 pt-3.5 pb-3">
         <div className="flex w-[80%] gap-2 pr-2 flex-wrap">
            {agents.map((agent) => {
              const isActive = selectedAgent === agent.label
              const Icon  = agent.icon
              return (
                <div
                key={agent.id}
                onClick={() => setSelectedAgent(agent.label)}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border transition-all cursor-pointer
                ${isActive ? "bg-linear-to-br from-indigo-500 to-violet-600 text-white border-transparent shadow-[0_1px_8px_rgba(99, 102, 241, .35)]" : "bg-white/3 text-slate-400 border-white/6 hover:bg-white/7"}
                  `}>
                    <Icon size={14} className={isActive ? "text-white" : "text-slate-500"}/>
                     {agent.label}
                </div>
              )
            })}
         </div>
         
        {
          selectedFile && <div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-3 py-2">
              {
                selectedFile?.type === "application/pdf" ? <FileText size={16} className="text-red-400"/> : selectedFile?.type.startsWith("image/") && <img src={URL.createObjectURL(selectedFile)} className="h-10 w-10 rounded-xl object-cover mt-3"/>
              }
              <div>
              <p className="text-xs text-white">
                {selectedFile?.name}
              </p>
              <p className="text-[10px] text-slate-500">
                {Math.ceil(selectedFile.size)}KB
              </p>
            </div>
              <button className="ml-2" onClick={() => {setSelectedFile(null); fileRef.current.value = ""}}><X size={14} className="text-slate-500 hover:text-white"/></button>
            </div>
          </div>
        }

         <textarea placeholder="Ask Anything..." 
         onChange={(e) => setValue(e.target.value)}
         value={value}
         className="w-full bg-transparent outline-none resize-none text-[14px] text-slate-200 placeholder:text-slate-600 leading-relaxed scrollbar-none [&::-webkit-scrollbar]:hidden disabled:opacity-50 rows={3}"/>
         <div className="flex items-cenetr justify-between">
          <div className="flex items-center gap-1">
            <input type="file" accept='.pdf,image/*' hidden ref={fileRef} onChange={(e) => {
              const file = e.target.files[0]
              if(file){
                setSelectedFile(file)
              }
            }}/>
            <button className="flex items-center justify-center gap-8 h-8 w-8 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/5 border border-transparent hover:border-white/6 transition-all duration-150 bg-transparent cursor-pointer">
              <Paperclip size={16} onClick={() => fileRef.current.click()}/>
            </button>
            <button className="flex items-center justify-center gap-8 h-8 w-8 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/5 border border-transparent hover:border-white/6 transition-all duration-150 bg-transparent cursor-pointer">
              <Mic size={16} />
            </button>
          </div> 
          <button 
          disabled={!value}
          className={`flex items-center justify-center w-8 h-8 rounded-lg border-none cursor-pointer transition-all duration-150 ${value.trim() ? "bg-linear-to-br from-indigo-500 to-voilet-700 hover:opacity-90 text-white" : "bg-white/5 text-slate-600 cursor-not-allowed"}`} onClick={handleSendMessage}>
            <Send size={15} />
          </button>
         </div>
      </div>
    </div>
  )
}

export default Chatinput