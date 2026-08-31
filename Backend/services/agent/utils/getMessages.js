import axios from "axios"

export const getMessage = async(conversationId) => {
    try{
        const { data } = await axios.get(`${process.env.CHAT_SERVICE}/get-message/${conversationId}`) 
        return data
    }catch(error){
        console.log(error)
        return null
    }
}

