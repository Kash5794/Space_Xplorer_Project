const express = require('express')
const router = express.Router()

const {apod,apodByDate,marsWeather,page} = require('../controller/API')


router.get('/apod', apod)
router.get('/marsWeather', marsWeather)
router.post('/apod/date',apodByDate)
router.get('/',page)
router.get('/weather',page)
router.get('/about',page)




module.exports =router