import api from "../../utils/axios"


const logOut = async() => {
  try{
    const { data } = api.get("/api/auth/logout")
    console.log(data)
  }catch(error){
    console.log(error)
  }
}

export default logOut