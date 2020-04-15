const express = require('express')

const showdata = require('./showdata')

const app = express()

app.set('view engine', 'pug')

app.use(express.static('public'))

app.get('/', (request, response) => response.render('index', { showdata }))

app.get('/seasons/:seasons', (request, response) => {
  const requestedSeason = parseInt(request.params.seasons)

  if (requestedSeason <= showdata.seasons.length) {
    const validSeason = showdata.seasons.find((seasons) => seasons.number === requestedSeason)

    return response.render('seasons', {
      title: showdata.title,
      seasons: validSeason
    })
  }
  else {
    return response.status(404).send('Season Does Not Exist')
  }
})

app.all('*', (request, response) => {
  return response.sendStatus(404)
})

app.listen(2319, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on 2319...')
})
