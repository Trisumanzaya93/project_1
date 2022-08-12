const model = require('../models')
const response = require("../helpers/response")

const createAlarm = async (req,res)=>{
    try {
        const body = req.body
        body.timer =Number(body.timer)  
        const result = await model.Alarm.create(body)
        return response(res, {
            data:result,
            status: 200,
            message: "success create alarm",
          });
    } catch (error) {
        return response(res, {
            status: 500,
            message: "terjadi error",
            error,
          });
    }
}

module.exports = {createAlarm}