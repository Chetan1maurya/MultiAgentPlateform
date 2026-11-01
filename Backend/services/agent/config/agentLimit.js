import redis from "../../../shared/redis/redis.js"

const limits = {
    chat: 20,
    coding: 5,
    pdf: 3,
    ppt: 3,
    image: 3,
    search: 5
};

export const checkAgentLimit = async(userId, agent) => {
    const max = limits[agent] || limits["chat"]
    const key = `rate:${userId}:${agent}`
    const count = await redis.incr(key)
    if(count == 1){
        await redis.expire(key, 300)
    }
    const ttl = await redis.ttl(key)
    if(count > max){
        const minutes = Math.floor(ttl/60)
        const seconds = (ttl%60)
        const time = minutes > 0 ? ` ${minutes}m : ${seconds}s` : `${seconds}s`
        const error = new Error(`Rate limit exceeded for ${agent}.`);
        error.data = {
            status: 429,
            success: false,
            agent,
            limit: max,
            remainingTime: ttl,
            retryAfter: time,
            message: `You have reached the ${agent} limit (${max} requests/minute). Try again in ${time}.`
        }
        throw error
    }
    return {
        remaining: max - count,
        limit: max
    }

}