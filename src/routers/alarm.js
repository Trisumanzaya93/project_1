
const express = require('express')
const alarmRouter = express.Router()
const alarmController = require('./../controllers/alarm')

alarmRouter
        .post('/',alarmController.createAlarm)



module.exports = alarmRouter