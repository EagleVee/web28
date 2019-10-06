const repository = require("./user.repository");

const find = async function(query) {
  return await repository.find(query);
};

const findById = async function(id) {
  return await repository.findById(id);
};

const create = async function(data) {
  if (!data || !data.name || !data.email) {
    throw new Error("Missing input!");
  }

  return await repository.create(data);
};

const update = async function(id, data) {
  const existedRecord = await repository.findById(id);
  if (!existedRecord) {
    throw new Error("Entity not found!");
  }
  if (!data || !data.name || !data.email) {
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
