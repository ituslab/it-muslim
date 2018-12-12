const express = require('express')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const axios = require('axios').default
const envNunjucks = new nunjucks.Environment(new nunjucks.FileSystemLoader('templates'))
const redisClient = require('./services/redisservice')


const app = express()
envNunjucks.express(app)

app.use('/assets',
  express.static(__dirname + '/assets'),
  express.static(__dirname + '/node_modules/materialize-css/dist'),
)

app.use('/assets/js',
  express.static(__dirname + '/node_modules/jquery/dist')
)

app.use(bodyParser.urlencoded({
  extended:true
}))

app.get('/surah/:surah', (req, res) => {

  redisClient.get(`surah:${req.params.surah}`,(err,reply)=>{
      if(!reply) {
        axios
        .get(`https://api.alquran.cloud/surah/${req.params.surah}/ar.alafasy`)
        .then(response => {
          
          const {data} = response.data
          const surah = data

          redisClient.setex(`surah:${req.params.surah}`,3600 ,  JSON.stringify(surah) )
      
          res.render('detail.html', {
            pageTitle: surah.englishName,
            surah
          })
        })
        .catch(err => {
          console.error('ERR_RESPONSE', err)
          res.send('ERR')
        })
      } else {
          const parsedReply = JSON.parse(reply)
          res.render('detail.html',{
            pageTitle:parsedReply.englishName,
            surah:parsedReply
          })
      }
  })

})


app.get('/surah/slide/:surah_number',(req,res)=>{
    res.render('slide.html',{
        pageTitle:'Slide mode'
    })
})




// TODO caching
app.get('/', (req, res) => {
  axios.get('https://api.alquran.cloud/surah')
  .then(r => {
    const {data} = r.data
    res.render('index.html', {
      pageTitle:'Index Page',
      data
    })
  })
  .catch(err => {
    console.error('ERR_RESPONSE', err)
    re.send('ERR')
  })
})

app.listen(9696, () => console.log('server running on http://localhost:9696'))
