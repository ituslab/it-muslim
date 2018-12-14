const router = require('express').Router()
const redisClient = require('../services/redisservice')
const axios = require('axios').default

router.get('/id/:surah_number',(req,res)=>{
    
})

router.get('/arab/:surah_number',(req,res)=>{
    redisClient.get(`surah:${req.params.number}`,(err,reply)=>{
        if(!reply) {
            axios.get(`https://api.alquran.cloud/surah/${req.params.number}/ar.alafasy`)
                .then(r=>{

                })
                .catch(err=>{

                })
        } else {
            res.json({
                code:200,
                data:JSON.parse(reply)
            })
        }
    })
})



module.exports = router