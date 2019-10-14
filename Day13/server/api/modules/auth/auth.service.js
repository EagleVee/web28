const userRepository = require("../user/user.repository");
const bcrypt = require("bcrypt");
const config = require("../../../config");

async function login(data) {
  if (!data.email || !data.password) {
    throw new Error("MISSING INPUT!");
  }
  const existedUser = await userRepository.findByEmail(data.email);
  if (!existedUser) {
    throw new Error("CANNOT FIND USER WITH THIS EMAIL!");
  }

  const result = await bcrypt.compare(data.password, existedUser.password);
  if (result) {
  } else {
    throw new Error("WRONG PASSWORD!");
  }
}

async function register(data) {
  console.log("data", data);
  if (!data.email || !data.password || !data.name) {
    throw new Error("MISSING INPUT!");
  }
  const existedUser = await userRepository.findByEmail(data.email);
  if (existedUser) {
    throw new Error("USER EXISTED!");
  }

  const newPassword = await bcrypt.hash(data.password, config.secret);
  return await userRepository.create({
    name: data.name,
    email: data.email,
    password: newPassword
  });
}

module.exports = {
  login: login,
  register: register
};
