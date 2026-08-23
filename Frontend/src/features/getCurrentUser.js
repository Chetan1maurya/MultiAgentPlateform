import api from "../../utils/axios.js"

const getCurrentUser = async() => {
    try{
        const { data } = await api.get("/api/get-me", {withCredentials: true})
        return data
    }catch(error){
        console.log(`Error in getCurrentUser: ${error}`)
        return null
    }
}

export default getCurrentUser