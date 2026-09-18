import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar.jsx";
import ChatArea from "../components/ChatArea.jsx";
import Artifact from "../components/Artifact.jsx";
import Welcome from "./Welcome.jsx";


const Home = () => {
    const { userData } = useSelector(state => state.user)
    return (
        <>
            {userData ? (
                <div className="h-screen flex bg-[#0d0f14] text-white overflow-hidden">
                    <Sidebar />
                    <ChatArea />
                    <Artifact />
                </div>
            ) : (
                <Welcome />
            )}
        </>
    );
}

export default Home