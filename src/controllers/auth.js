const model = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const response = require("../helpers/response");

const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;
    const cekEmail = await model.users.findOne({ where: { username } });
    if (cekEmail !== null)
      return response(res, { status: 400, message: "username sudah terdaftar" });
      const body = req.body
      body.password = await bcrypt.hash(password, 10);
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
};

const login = async (req,res)=>{
  try {
    const {username,password} = req.body
    const result = await model.users.findOne({
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


module.exports = {  signUp,login };
