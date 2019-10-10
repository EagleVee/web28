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
  if (query.limit && query.skip !== undefined) {
    const limit = Number(query.limit);
    const skip = Number(query.skip);
    delete query.limit;
    delete query.skip;
    return await UserModel.find(query)
      .populate("books")
      .limit(limit)
      .skip(skip);
  } else {
    return await UserModel.find(query).populate("books");
  }
};

const count = async function(query) {
  return await UserModel.count(query);
};

const findById = async function(id) {
  return await UserModel.findById(id);
};

const findByEmail = async function(email) {
  return await UserModel.findOne({ email: email });
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
  count: count,
  findById: findById,
  findByEmail: findByEmail,
  create: create,
  update: update,
  delete: deleteById
};
