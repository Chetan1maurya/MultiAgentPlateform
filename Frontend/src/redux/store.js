import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice.js"
import conversationReducer from "./conversationSlice.js"

export default configureStore({
  reducer: {
    user: userReducer,
    conversation: conversationReducer
  }
})
