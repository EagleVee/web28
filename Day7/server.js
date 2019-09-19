const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const Error = require('./error.js');
const port = 3000;
const Users = require('./models/users.js');

app.get('/api/user', function (request, response) {
  Users.getList(function (err, data) {
    if (err) console.log(err);
    else {
      const jsonData = JSON.stringify(data, null, 4);
      response.end(jsonData);
    }
  })
})

app.post('/api/user', bodyParser.json(), function (request, response) {
  const user = request.body;
  if (!user.id || !user.name || !user.password) {
    response.end(Error.MISSING_FIELD);
  } else {
    Users.addOne(user, function (err, data) {
      if (err) console.log(err);
      else response.end(data);
    })
  }
})
app.put('/api/user/:id', bodyParser.json(), function (request, response) {
  const user = request.body;
  const id = request.params.id;
  Users.updateOne(id, user, function (err, data) {
    if (err) console.log(err);
    else response.end(data);
  })
})
app.delete('/api/user/:id', function (request, response) {
  const id = request.params.id;
  Users.deleteOne(id, function (err, data) {
    if (err) console.log(err);
    else response.end(data);
  })
})
var server = app.listen(port, function () {
  console.log(`Server run at localhost:${port}`);
})
