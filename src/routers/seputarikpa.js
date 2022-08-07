
const express = require('express')
const SeputarikpaRouter = express.Router()
const seputarikpaController = require('./../controllers/seputarIkpa')
const upload = require('../middlewares/upload')

SeputarikpaRouter

        .get('/',  seputarikpaController.getAllSeputarikpa)
        .get('/:id',  seputarikpaController.getContentById)
        .delete('/:id',  seputarikpaController.deleteContentById)
        .post('/',upload,seputarikpaController.createContent)



module.exports = SeputarikpaRouter