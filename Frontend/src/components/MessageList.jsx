import { useSelector } from 'react-redux'
import MessageBubble from './MessageBubble.jsx'

const MessageList = () => {
  const { selectedConversation } = useSelector((state) => state.conversation)
  const { messages } = useSelector((state) => state.message)
  console.log(messages)
  return (
    <div className="flex-1 overflow-auto px-6 py-6 space-y-5 scrollbar-none [&::-webkit-scrollbar]:hidden">
      {
        messages.length == 0 || !selectedConversation ? (
          <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
              <div className="flex flex-col gap-1.5">
                  <h1 className="text-[20px] font-semibold text-slate-200 tracking-tight">CortexAI</h1>
                  <p className="text-[15px] font-semibold text-slate-400 tracking-tight">How can I help you?</p>
                  <p className="text-[13px] text-slate-600 max-w-65 leading-relaxed">Ask me anything -- code, ideas, explanations, or just a quick question.</p>
              </div>
              <div>
                {["Write a Instagram Clone", "Explain Indexes", "Build a dashboard"].map((s, id) => (
                  <button key={id} className="text-[12px] text-slate-400 bg-white/4 border border-white/7 px-3 py-1.5 rounded-lg hover:bg-white/8 hover:text-slate-200 transition-colors duration-150 cursor-pointer m-1">
                    {s}
                  </button>
                ))}
              </div>
          </div>
        ) : <div className="space-y-5">
          {messages.map((msg,i) => (
            <div key={i}>
              <MessageBubble role={msg?.role} content={msg?.content} images={msg?.images || []}/>
            </div>
          ))}

        </div>
      }
    </div>
  )
}

export default MessageList