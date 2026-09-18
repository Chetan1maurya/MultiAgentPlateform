import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
    name: "message",
    initialState: {
        messages: [],
        artifacts: [],
        isLoading: false
    },
    reducers:{
        setMessages: (state, action) => {
            state.messages = action.payload
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload)
        },
        setArtifacts: (state, action) => {
            state.artifacts = action.payload
        },
        clearMessages: (state) => {
            state.messages = [];
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        }
    }
})

export const { setMessages, addMessage, setArtifacts, setLoading, clearMessages } = messagesSlice.actions
export default messagesSlice.reducer