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
  console.log("HASH", newPassword);
  return newPassword;
}

module.exports = {
  login: login,
  register: register
};
