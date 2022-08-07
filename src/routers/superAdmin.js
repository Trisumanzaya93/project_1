
const express = require('express')
const superAdmin = express.Router()
const superAdminController = require('./../controllers/superAdmin')

superAdmin
        .post('/createadmin',  superAdminController.createAdmin)
        .get("/",superAdminController.getAdmin)
        .patch('/:id', superAdminController.updateAdmin)
        .delete('/:id', superAdminController.deleteAdmin)



module.exports = superAdmin