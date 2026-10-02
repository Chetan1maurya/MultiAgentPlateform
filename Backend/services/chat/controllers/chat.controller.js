import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const createConversation = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    const conversation = await Conversation.create({
      userId: userId,
    });
    return res.status(200).json(conversation);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Create conversation error ${error}` });
  }
};

export const getConversations = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    const conversations = await Conversation.find({
      userId: userId,
    })
      .sort({ updatedAt: -1 })
      .limit(20)
      .lean();

    return res.status(200).json(conversations);
  } catch (error) {
    return res.status(500).json({ message: `Get conversation error ${error}` });
  }
};

export const updateConversation = async (req, res) => {
  try {
    const { id, title } = req.body;
    const conversation = await Conversation.findByIdAndUpdate(id, {
      title,
    });
    return res.status(200).json(conversation);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Update conversation error ${error}` });
  }
};

export const deleteConversation = async (req, res) => {
  try {
    const id = req.body.id;
    await Conversation.findByIdAndDelete(id)
    await Message.deleteMany({
      conversationId: id
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: `Delete Converstion error ${error}` });
  }
}

export const saveMessage = async (req, res) => {
  try {
    const start = performance.now();
    const { conversationId, role, content, images, artifacts } = req.body;
    const message = await Message.create({
      conversationId,
      content,
      role,
      images,
      artifacts
    });
    const duration = performance.now() - start;
    console.log(
      `⏱️ MongoDB Message.create: ${duration.toFixed(2)} ms`
    );
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ message: `Save message error ${error}` });
  }
};

export const getMessages = async (req, res) => {
  try {
    const start = performance.now();

    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });

    const duration = performance.now() - start;

    console.log(
      `⏱️ MongoDB Message.find: ${duration.toFixed(2)} ms`
    );

    return res.status(200).json(messages);

  } catch (error) {
    return res.status(500).json({
      message: `Get message error ${error}`
    });
  }
};
