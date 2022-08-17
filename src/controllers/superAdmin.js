const model = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const response = require("../helpers/response");

const createAdmin = async (req, res) => {
  try {
    const { user_name, password } = req.body;
    const cekEmail = await model.Admins.findOne({ where: { user_name } });

    if (cekEmail !== null)
      return response(res, { status: 400, message: "username admin sudah terdaftar" });
      const body = req.body
      body.password = await bcrypt.hash(password, 10);
      const result = await model.Admins.create(body)
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
const updateAdmin =async (req,res)=>{
  try {
    const {id} = req.params
    const cekId = await model.Admins.findOne({where:{id}})
    if(cekId===null){
      return response(res,{status:404,message:"id tidak ditemukan"})
    }
    const body = req.body
    if(body.password){
      body.password = await bcrypt.hash(body.password, 10);
    }
    const result = await model.Admins.update(body,{where:{id}})
    return response(res,{
      status:200,
      message:"oke lahh",
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

const deleteAdmin =async (req,res)=>{
  try {
    const {id} = req.params
    const cekId = await model.Admins.findOne({where:{id}})
    console.log(cekId);
    if(cekId===null){
      return response(res,{status:404,message:"id tidak ditemukan"})
    }
    const result = await model.Admins.destroy({where:{id}})
    return response(res,{
      status:200,
      message:"success delete",
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

const loginAdmin = async (req,res)=>{
  try {
    const {username,password} = req.body
    const result = await model.Admin.findOne({
      where: {
          username,
      },
  });
  if (result===null)
      return response(res, {
          status: 401,
          message: "username atau password salah",
      });

  const isValid = await bcrypt.compare(password, result.password);
  if (!isValid)
      return response(res, {
          status: 401,
          message: "username atau password salah",
      });
  const payload = {
      id: result.id,
      username: result.username,
  };
  const jwtOptions = {
      expiresIn: "10h",
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, jwtOptions);
    return response(res, {
      data: token,
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

const getAdmin = async (req,res)=>{
  try {
    const result = await model.Admins.findAll()
    return response(res,{
      status:200,
      message:"success",
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


module.exports = {  createAdmin,loginAdmin,updateAdmin,deleteAdmin,getAdmin };
