
const express = require('express')
const alarmRouter = express.Router()
const alarmController = require('./../controllers/alarm')

alarmRouter
        .post('/',alarmController.createAlarm)
        .get('/:id',alarmController.alarmByUserId)
        .delete('/:id',alarmController.deleteAlarm)



module.exports = alarmRouter