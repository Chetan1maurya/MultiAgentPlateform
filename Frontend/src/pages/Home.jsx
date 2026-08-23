import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../../utils/firebase.js"
import api from "../../utils/axios.js"
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import Sidebar from "../components/Sidebar.jsx";
import ChatArea from "../components/ChatArea.jsx";
import Artifact from "../components/Artifact.jsx";


const Home = () => {
    const { userData } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const handleLogin = async(token) => {
        try{
          const { data } = await api.post("/api/auth/login", {token}, {withCredentials: true})
          dispatch(setUserData(data))
          console.log("Line 10 ", data)
        }catch(error){
          console.log(error)
        }
    }
    const googleLogin = async() => {
        const data = await signInWithPopup(auth, googleProvider)
        const token = await data.user.getIdToken()
        console.log("Line 18 ", token)
        await handleLogin(token)
        console.log("Line 20 ",data)
    }
  return (
    <div className="h-screen flex bg-[#0d0f14] text-white overflow-hidden">
        <Sidebar />
        <ChatArea />
        <Artifact />
        {!userData && 
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur">
                <div className="w-85 bg-[#13151c] border border-white/8 rounded-2xl p-7 flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[17px] font-semibold text-slate-100 tracking-tight">Welcome to CortexAI</h2>
                        <p className="text-[13px] text-slate-500">Please login to continue using the app.</p>
                    </div>
                    <button onClick={googleLogin} className="w-full flex items-center justify-center gap-3 py-2.75 rounded-xl text-sm font-medium text-black bg-white hover:bg-gray-200 active:from-indigo-600 active:to-violet-800 border transition-all duration-150 cursor-pointer border-none ">
                        <FcGoogle size={20} className="text-white"/>
                        Continue with Google
                    </button>
                </div>
            </div>
        }
    </div>
  )
}
 
export default Home