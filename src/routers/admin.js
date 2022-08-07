
const express = require('express')
const admin = express.Router()
const adminController = require('./../controllers/admin')

admin
        .post('/loginadmin',  adminController.loginAdmin)
        .get('/:id_admin',  adminController.getUserByAdmin)
        .post('/',  adminController.createUser)
        .patch('/:id', adminController.updateUser)
        .delete('/:id', adminController.deleteUser)



module.exports = admin