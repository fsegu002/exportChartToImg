
const router = require('express').Router()
const generateImageCtrl = require('./controllers/generateImageController').generateImage
router.post('/generate-image', generateImageCtrl)

module.exports = router