const model = require('../models')
const response = require("../helpers/response")

const createAlarm = async (req,res)=>{
    try {
        const body = req.body
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
const alarmByUserId = async (req,res) => {
try {
    const {id} = req.params
    const result = await model.Alarm.findAll({where:{id_user:id}})
    return response(res,{
        status:200,
        message:"succes get",
        data:result
    })
} catch (error) {
    return response(res, {
    status: 500,
    message: "terjadi error",
    error,
  });
    }
}

const deleteAlarm = async (req,res) => {
    try {
        const {id} = req.params
        const result = await model.Alarm.destroy({where:{id}})
        console.log(result);
        if(result === 0) return response(res,{status:404,message:"not found"})
        return response(res,{
            status:200,
            message:"succes delete",
        })
    } catch (error) {
        return response(res, {
        status: 500,
        message: "terjadi error",
        error,
      });
        }
    }

module.exports = {createAlarm,alarmByUserId,deleteAlarm}