
const express = require('express')
const authRouter = express.Router()
const authController = require('./../controllers/auth')

authRouter
        .post('/signup',  authController.signUp)
        .post('/login',  authController.login)
        .get("/getalluser",authController.getAllUserByAdmin)



module.exports = authRouter