import api from "../../utils/axios"


const logOut = async() => {
  try{
      api.get("/api/auth/logout")
  }catch(error){
    console.log(error)
  }
}

export default logOut