const model = require('../models')
const response = require("../helpers/response")

const createContent =async(req,res)=>{
  try {
    const image = req.file;
    const body = req.body;
    if(image){
      const newBody = {
        ...body,
        image: image.path,
      };
      const result = await model.seputardjbp.create(newBody);
      return response(res, {
        data: result,
        status: 200,
        message: "mantapp",
      });
    }
    const result = await model.seputardjbp.create(body);
    return response(res, {
      data: result,
      status: 200,
      message: "mantapp",
    });
  } catch (error) {
    console.log(error);
    return response(res, {
      status: 500,
      message: "terjadi error",
      error,
    });
  }
}

const getAllSeputarikpa = async(req, res) => {
  try {
    const {id_admin} =req.params
    const result = await model.seputardjbp.findAll({where:{id_admin}})
    return response(res, {
      data: result,
      status: 200,
      message: "mantapp",
    });
  } catch (error) {
    console.log(error);
    return response(res, {
      status: 500,
      message: "terjadi error",
      error,
    });
  }
};

const getContentById = async(req, res) => {
  try {
    const {id} = req.params
    const result = await model.seputardjbp.findOne({where:{id}})
    if(result===null) return response(res,{status:404,message:"data tidak ada"})
    return response(res, {
      data: result,
      status: 200,
      message: "mantapp",
    });
  } catch (error) {
    return response(res, {
      status: 500,
      message: "terjadi error",
      error,
    });
  }
}

const deleteContentById = async(req, res) => {
  try {
    const {id} = req.params
    const result = await model.seputardjbp.destroy({where:{id}})
    return response(res, {
      data: result,
      status: 200,
      message: "data terhapus",
    });
  } catch (error) {
    return response(res, {
      status: 500,
      message: "terjadi error",
      error,
    });
  }
}
const updateContent =async(req,res)=>{
  try {
    const {id} = req.params
    let body = req.body;
    const image = req.file;

    
    const cekId = await model.seputardjbp.findOne({where:{id}})
    if(cekId===null){
      return response(res,{status:404,message:"id tidak ditemukan"})
    }
    if(image){
      body = {
        ...body,
        image: image.path,
      };}
      const result = await model.seputardjbp.update(body,{where:{id}})

      return response(res, {
        data: result,
        status: 200,
        message: "update berhasil",
      });
    
  } catch (error) {
    console.log(error);
    return response(res, {
      status: 500,
      message: "terjadi error",
      error,
    });
  }
}

module.exports = { getAllSeputarikpa,createContent,getContentById,deleteContentById, updateContent };
