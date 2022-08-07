const express = require("express")
const authRouter = require("./auth.js")
const mainRouter = express.Router()
const seputarikpaRouter = require('./seputarikpa.js')
const superAdminRouter =require("./superAdmin")
const adminRouter = require('./admin')

mainRouter.use('/auth', authRouter)
mainRouter.use('/seputarikpa', seputarikpaRouter)
mainRouter.use('/superadmin',superAdminRouter)
mainRouter.use('/admin',adminRouter)


module.exports = mainRouter