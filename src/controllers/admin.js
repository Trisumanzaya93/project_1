const model = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const response = require("../helpers/response");

const createUser = async(req,res)=>{
    try {
        const { username, password } = req.body;
        const cekEmail = await model.users.findOne({ where: { username } });
        if (cekEmail !== null)
          return response(res, { status: 400, message: "username sudah terdaftar" });
          const body = req.body
          body.password = await bcrypt.hash(password, 10);
          console.log(body);
          const result = await model.users.create(body)
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

const updateUser = async (req,res)=>{
  try {
    const {id} = req.params
    const cekId = await model.users.findOne({where:{id}})
    if(cekId===null){
      return response(res,{status:404,message:"id tidak ditemukan"})
    }
    const body = req.body
    body.password = await bcrypt.hash(body.password, 10);
    const result = await model.users.update(body,{where:{id}})
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

const deleteUser = async (req,res)=>{
  try{
  const {id} = req.params
    const cekId = await model.users.findOne({where:{id}})
    console.log(cekId);
    if(cekId===null){
      return response(res,{status:404,message:"id tidak ditemukan"})
    }
    const result = await model.users.destroy({where:{id}})
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

const getUserByAdmin = async (req,res)=>{
  try {
    const {id_admin}= req.params 
    const result = await model.users.findAll({where:{id_admin}})
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

const loginAdmin = async (req,res)=>{
  try {
    const {user_name,password} = req.body
    const result = await model.Admins.findOne({
      where: {
          user_name,
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
      username: result.user_name,
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

module.exports ={createUser,updateUser,deleteUser,getUserByAdmin,loginAdmin}