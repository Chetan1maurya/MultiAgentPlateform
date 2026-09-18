import express from 'express'
import { createConversation, getConversations, getMessages, saveMessage, updateConversation, deleteConversation } from '../controllers/chat.controller.js'

const router = express.Router()

router.get("/create-conversation", createConversation)
router.get("/get-conversation", getConversations)
router.post("/update-conversation", updateConversation)
router.post("/delete-conversation", deleteConversation)
router.post("/save-messages", saveMessage)
router.get("/get-message/:conversationId", getMessages)

export default router