import redis from '../../../shared/redis/redis.js'
import { getMessages } from '../utils/getMessages.js'

export const getMemory = async (conversationId) => {

    const key = `messages-${conversationId}`;

    let start = performance.now();

    const cached = await redis.get(key);
    
    console.log(
        "⏱️ Redis GET:",
        (performance.now() - start).toFixed(2),
        "ms"
    );

    if (cached) {
        start = performance.now();

        const messages = JSON.parse(cached);

        console.log(
            "⏱️ JSON.parse:",
            (performance.now() - start).toFixed(2),
            "ms"
        );

        return messages;
    }

    console.log("⚠️ Redis cache MISS");

    start = performance.now();

    const messages = await getMessages(conversationId);

    console.log(
        "⏱️ getMessage:",
        (performance.now() - start).toFixed(2),
        "ms"
    );

    start = performance.now();

    await redis.set(
        key,
        JSON.stringify(messages),
        "EX",
        24 * 60 * 60
    );

    console.log(
        "⏱️ Redis SET:",
        (performance.now() - start).toFixed(2),
        "ms"
    );

    return messages;
};

// export const addMessage = async (conversationId, role, content) => {
//     const key = `messages-${conversationId}`
//     const rawMessages = await redis.get(key)
//     let messages = rawMessages ? JSON.parse(rawMessages) : []
//     messages.push({ role, content })
//     if (messages.length > 20) {
//         messages.shift()
//     }
//     await redis.set(key, JSON.stringify(messages), "EX", 24 * 60 * 60)
// }

export const addMessage = async (
    conversationId,
    role,
    content
) => {
    const key = `messages-${conversationId}`;

    // Get current Redis conversation
    const cached = await redis.get(key);

    let messages = cached
        ? JSON.parse(cached)
        : [];

    // Add new message
    messages.push({
        role,
        content,
    });

    // Keep only latest 20 messages
    messages = messages.slice(-20);

    // Save back to Redis
    await redis.set(
        key,
        JSON.stringify(messages),
        "EX",
        24 * 60 * 60
    );

    return messages;
};
