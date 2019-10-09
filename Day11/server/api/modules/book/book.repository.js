const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  title: String,
  category: String,
  description: String,
  author: String
});

const BookModel = mongoose.model("Book", BookSchema);

const find = async function(query) {
  if (query.limit && query.skip !== undefined) {
    const limit = Number(query.limit);
    const skip = Number(query.skip);
    delete query.limit;
    delete query.skip;
    return await BookModel.find(query)
      .limit(limit)
      .skip(skip);
  }
  return await BookModel.find(query);
};

const count = async function(query) {
  return await BookModel.count(query);
};

const findById = async function(id) {
  return await BookModel.findById(id);
};

const create = async function(data) {
  const newDocument = new BookModel(data);
  return await newDocument.save();
};
const update = async function(id, data) {
  return await BookModel.findByIdAndUpdate(
    id,
    {
      $set: data
    },
    { new: true }
  );
};

const deleteById = async function(id) {
  return await BookModel.findByIdAndDelete(id);
};

module.exports = {
  find: find,
  count: count,
  findById: findById,
  create: create,
  update: update,
  delete: deleteById
};
