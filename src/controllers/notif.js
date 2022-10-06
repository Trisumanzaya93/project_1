const admin = require("firebase-admin");
const key = require("../../private/pais-8b1c5-firebase-adminsdk-zuwqs-b8209e6c35");
const model = require("../models/index");
// const ServiceResponse = require("../helper/ServiceResponse");
// const models = require("../models/firebase");

// FIREBASE
admin.initializeApp({
  credential: admin.credential.cert(key),
});
const message = admin.messaging();

const notifSend = async (req,res) => {
    const {body} = req
    try {
         const result = await model.users.findOne({where:{id:body.id}})
         if (result.length===0) return res.status(404).json({pesan:"id tidak ditemukan"})
         const token = result.id_android
         
         const data = await model.Alarm.findOne({where:{id:body.idAlarm}})
        const result1 = await message.send({
            token: token,
            notification: {
                title: body.title,
                body: body.message,
            },
            data:{
                title:data.title,
                description:data.description,
                date:`${data.timer}`
            }
        })
        return res.status(200).json({
                  pesan: "notification sent",
                  token,
                  result1
                });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
                  pesan: "firebase-server",
                  error,
                });
    }
}

const notifAllAlarm = async (req,res) => {
    const {body} = req
    try {
         const result = await model.users.findAll({where:{id_admin:body.id}})
         await Promise.all(
             result.map( async(item)=>{
                 const token = item.id_android
                if(token){
                    return await message.send({
                        token: token,
                        notification: {
                            title: body.title,
                            body: body.message,
                        },
                        data:{
                                    title:body.title,
                                    description:body.message,
                                    date:`${body.date}`
                                }
                    })
                }
            }))
        return res.status(200).json({
                  pesan: "notification all alarm sent",
                });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
                  pesan: "firebase-server",
                  error,
                });
    }
}

const notifSendAllUser = async (req,res) => {
    const {body} = req
    try {
         const result = await model.users.findAll({where:{id_admin:body.id}})
         if (result.length===0) return res.status(404).json({pesan:"id tidak ditemukan"})
         await Promise.all(
         result.map( async(item)=>{
             const token = item.id_android
             if(token){
                 return await message.send({
                     token: token,
                     notification: {
                         title: body.title,
                         body: body.message,
                     },
                     data:{}
                 })
             }
         }))
        return res.status(200).json({
                  pesan: "notification sent",
                //   token
                });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
                  pesan: "firebase-server",
                  error,
                });
    }
}

module.exports={notifSend, notifSendAllUser,notifAllAlarm}