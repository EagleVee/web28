const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const Error = require('./error.js');
const port = 3000;

app.get('/hello', function (request, response) {
  response.end(Error.MISSING_FIELD);
})

app.get('/api/user', function (request, response) {
  fs.readFile('./users.json', function (error, data) {
    if (error) throw error;
    else response.end(data);
  })
})

app.post('/api/user', bodyParser.json(), function (request, response) {
  const user = request.body;
  if (!user.id || !user.name || !user.password) {
    response.end(Error.MISSING_FIELD);
  } else {
    addUserToJson(user);
    response.end('SUCCESS');
  }
})
app.put('/api/user', bodyParser.json(), function (request, response) {
  const updateUsers = request.body;
  for (key in updateUsers) {
    editUserInJson(key, updateUsers[key]);
  }
  response.end('SUCCESS');
})
app.delete('/api/user', bodyParser.json(), function (request, response) {
  const { user_delete } = request.body;
  deteleUserInJson(user_delete);
  response.end('SUCCESS');
})
function addUserToJson(userObject) {
  fs.readFile('./users.json', function (error, data) {
    if (error) throw error;
    else {
      let objectData = JSON.parse(data.toString());
      const userIndex = getObjectLength(objectData) + 1;
      objectData[`user${userIndex}`] = userObject;
      jsonData = JSON.stringify(objectData, null, 4);
      writeToOutput('./users.json', jsonData);
    }
  })
}
function editUserInJson(userKey, userObject) {
  fs.readFile('./users.json', function (error, data) {
    if (error) throw error;
    else {
      let objectData = JSON.parse(data.toString());
      objectData[userKey] = userObject;
      jsonData = JSON.stringify(objectData, null, 4);
      writeToOutput('./users.json', jsonData);
    }
  })
}
function deteleUserInJson(user) {
  fs.readFile('./users.json', function (error, data) {
    if (error) throw error;
    else {
      let objectData = JSON.parse(data.toString());
      delete objectData[user];
      jsonData = JSON.stringify(objectData, null, 4);
      writeToOutput('./users.json', jsonData);
    }
  })
}
function getObjectLength(object) {
  let length = 0;
  for (key in object) {
    length = length + 1;
  }
  return length;
}
function writeToOutput(fileOutput, content) {
  var outputWriteStream = fs.createWriteStream(fileOutput);
  outputWriteStream.write(content);
}
var server = app.listen(port, function () {
  console.log(`Server run at localhost:${port}`);
})
