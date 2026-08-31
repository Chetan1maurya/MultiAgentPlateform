import api from '../../utils/axios'

const getMessages = async(id) => {
  try{
    const { data } = await api.get(`/api/chat/get-message/${id}`)
    return data
  }catch(error){
    console.log(error)
    return []
  }
}

export default getMessages