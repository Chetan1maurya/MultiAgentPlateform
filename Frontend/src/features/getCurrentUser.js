import api from "../../utils/axios.js"

const getCurrentUser = async() => {
    try{
        const start = performance.now()
        const { data } = await api.get("/api/get-me", {withCredentials: true})
        console.log("API Timinig: ",performance.now() - start)
        return data
    }catch(error){
        console.log(`Error in getCurrentUser: ${error}`)
        return null
    }
}

export default getCurrentUser