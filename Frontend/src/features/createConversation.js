import api from "../../utils/axios.js"

export const createConversation = async() => {
    try{
        const {data}  = await api.get("/api/chat/create-conversation", {withCredentials: true})
        console.log("Data from API Call", data)
        return data
    }catch(error){
        console.log(error)
        return []
    }
}
