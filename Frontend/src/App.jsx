import { useEffect } from 'react'
import Home from './pages/Home.jsx'
import getCurrentUser from './features/getCurrentUser.js'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice.js'
import api from '../utils/axios.js'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const getUser = async() => {
      const Start = performance.now()
      const data = await getCurrentUser()
      dispatch(setUserData(data))
      console.log("Time to Fetch User", performance.now() - Start)
    }
    getUser()
  },[dispatch])
  useEffect(() => {
    const response = async() => {
      const start = performance.now()
      await api.get("/", {withCredentials: true})
      console.log("API is working")
      console.log("Time to Fetch API", performance.now() - start)
    }
    response()
  },[])

  
  return (
    <>
      <Home/>
    </>
  )
}

export default App