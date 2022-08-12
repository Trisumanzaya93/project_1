
const express = require('express')
const SeputarikpaRouter = express.Router()
const seputarikpaController = require('./../controllers/seputarIkpa')
const upload = require('../middlewares/upload')

SeputarikpaRouter

        .get('/:id_admin',  seputarikpaController.getAllSeputarikpa)
        .get('/getbyid/:id',  seputarikpaController.getContentById)
        .delete('/:id',  seputarikpaController.deleteContentById)
        .post('/',upload,seputarikpaController.createContent)



module.exports = SeputarikpaRouter