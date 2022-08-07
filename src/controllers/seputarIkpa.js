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
      const result = await model.seputarikpa.create(newBody);
      return response(res, {
        data: result,
        status: 200,
        message: "mantapp",
      });
    }
    const result = await model.seputarikpa.create(body);
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
    const result = await model.seputarikpa.findAll()
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
};

const getContentById = async(req, res) => {
  try {
    const {id} = req.params
    const result = await model.seputarikpa.findOne({where:{id}})
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
    const result = await model.seputarikpa.destroy({where:{id}})
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

module.exports = { getAllSeputarikpa,createContent,getContentById,deleteContentById };
