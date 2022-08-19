
const express = require('express')
const SeputarDjpbRouter = express.Router()
const seputarDjpbController = require('./../controllers/seputarDjpb')
const upload = require('../middlewares/upload')

SeputarDjpbRouter

        .get('/:id_admin',  seputarDjpbController.getAllSeputarikpa)
        .get('/getbyid/:id',  seputarDjpbController.getContentById)
        .patch('/:id',upload,  seputarDjpbController.updateContent)
        .delete('/:id',  seputarDjpbController.deleteContentById)
        .post('/',upload,seputarDjpbController.createContent)



module.exports = SeputarDjpbRouter