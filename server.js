const express = require('express')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const axios = require('axios').default
const envNunjucks = new nunjucks.Environment(new nunjucks.FileSystemLoader('templates'))


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
  axios
  .get(`https://api.alquran.cloud/surah/${req.params.surah}/ar.alafasy`)
  .then(response => {
    const {data} = response.data
    const surah = data

    res.render('detail.html', {
      pageTitle: surah.englishName,
      surah
    })
  })
  .catch(err => {
    console.error('ERR_RESPONSE', err)
    res.send('ERR')
  })
})

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

app.listen(9696, '0.0.0.0', () => console.log('server running on http://localhost:9696'))
