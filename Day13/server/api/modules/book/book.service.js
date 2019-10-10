const repository = require("./book.repository");

const find = async function(query) {
  const data = await repository.find(query);
  const total = await repository.count(query);
  return {
    data: data,
    total: total
  };
};

const findById = async function(id) {
  return await repository.findById(id);
};

const create = async function(data) {
  if (!data || !data.title || !data.author) {
    throw new Error("Missing input!");
  }

  return await repository.create(data);
};

const update = async function(id, data) {
  const existedRecord = await repository.findById(id);
  if (!existedRecord) {
    throw new Error("Entity not found!");
  }
  if (!data || !data.title || !data.author) {
    throw new Error("Missing input!");
  }

  return await repository.update(id, data);
};

const deleteByID = async function(id) {
  const existedRecord = await repository.findById(id);
  if (!existedRecord) {
    throw new Error("Entity not found!");
  }

  return await repository.delete(id);
};

module.exports = {
  find: find,
  findById: findById,
  create: create,
  update: update,
  delete: deleteByID
};
