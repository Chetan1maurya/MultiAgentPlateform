import api from "../../utils/axios.js"

export const deleteConversation = async(id) => {
    try{
        await api.post("api/chat/delete-conversation", {id}, {withCredentials: true})
    }catch(error){
        console.log(error)
    }
}