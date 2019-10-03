const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/web28', { useNewUrlParser: true });

var UserModel = mongoose.model('Users', {
  id: Number,
  name: String,
  password: String
});
function getList(callback) {
  UserModel.find({}).exec(function (err, data) {
    callback(err, data);
  })
}
function addOne(user, callback) {
  var newUser = new UserModel(user);
  newUser.save(function (err, data) {
    callback(err, data);
  })
}
function updateOne(id, user, callback) {
  const { name, password } = user;
  UserModel.updateOne({ id: id }, { $set: { name: name, password: password } })
    .exec(function (err, data) {
      callback(err, data);
    });
}
function deleteOne(id, callback) {
  UserModel.deleteOne({ id: id }).exec(function (err, data) {
    callback(err, data);
  })
}

module.exports = {
  getList,
  addOne,
  updateOne,
  deleteOne
};