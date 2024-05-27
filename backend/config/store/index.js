const { createClient } = require('redis');

const connectStore = async () => {
    return new Promise(async(resolve, reject) => {
        try {
            const host = process.env.REDIS_HOST || 'localhost'
            const port = process.env.REDIS_PORT || 6379
            const config = {
                url: `redis://${host}:${port}`,
                password: process.env.REDIS_PASSWORD,
                username: process.env.REDIS_USERNAME
            }
            console.log(config);
            const client = await createClient(config);
            client.on('error', (err) => {
                console.error(`Redis Client Error`, err)
            })
            client.connect().then(async () => {
                console.log(`Redis Client connected OK`)
                resolve(client)
            })
        }
        catch (err) {
            console.log(`Error ${err.message}`);
            reject(err)
        }
    })
}

module.exports = { connectStore }