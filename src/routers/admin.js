
const express = require('express')
const admin = express.Router()
const adminController = require('./../controllers/admin')
const notifController = require("../controllers/notif")

admin
        .post('/loginadmin',  adminController.loginAdmin)
        .post('/notif',  notifController.notifSend)
        .post('/notifalluser',  notifController.notifSendAllUser)
        .post('/notifallAlarm',  notifController.notifAllAlarm)
        .get('/:id_admin',  adminController.getUserByAdmin)
        .post('/',  adminController.createUser)
        .patch('/:id', adminController.updateUser)
        .delete('/:id', adminController.deleteUser)



module.exports = admin