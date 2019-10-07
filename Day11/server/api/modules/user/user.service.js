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

  if (!data || !data.name || !data.email) {
    throw new Error("Missing input!");
  }

  if (!validateEmail(data.email)) {
    throw new Error("Email is not valid!");
  }

  return await repository.create(data);
};

const update = async function(id, data) {
  const existedRecord = await repository.findById(id);
  if (!existedRecord) {
    throw new Error("Entity not found!");
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

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

module.exports = {
  find: find,
  findById: findById,
  create: create,
  update: update,
  delete: deleteByID
};
