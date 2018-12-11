const redis = require('redis')
const client = redis.createClient({
    host:'muslim-redis',
    port:6379,
    db:0
})

module.exports = client