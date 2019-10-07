const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book"
    }
  ],
  email: String
});

const UserModel = mongoose.model("User", UserSchema);

const find = async function(query) {
  return await UserModel.find(query);
};

const findById = async function(id) {
  return await UserModel.findById(id);
};

const create = async function(data) {
  const newDocument = new UserModel(data);
  return await newDocument.save();
};

const update = async function(id, data) {
  return await UserModel.findByIdAndUpdate(id, { $set: data }, { new: true });
};

const deleteById = async function(id) {
  return await UserModel.findByIdAndDelete(id);
};

module.exports = {
  find: find,
  findById: findById,
  create: create,
  update: update,
  delete: deleteById
};
