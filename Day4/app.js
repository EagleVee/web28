var argv = process.argv.slice(2);
var fs = require('fs');
if (argv && argv.length >= 2) {
  var fileInput = argv[0];
  var fileOutput = argv[1];
  readFileAsync(fileInput, function (error, data) {
    if (error) {
      throw error;
    } else {
      var objectData = convertDataToObject(data.toString());
      var outputContent = objectToString(objectData);
      writeToOutput(fileOutput, outputContent);
    }
  })
} else {
  console.log('ERROR');
}
function convertDataToObject(data) {
  var arrayData = data.split('\n');
  var objectData = {};
  arrayData.map(data => {
    var tempArray = data.split(' ');
    var key = tempArray[0];
    var value = Number(tempArray[1]);
    if (objectData[key]) {
      objectData[key] += value;
    } else {
      objectData = {
        ...objectData,
        [key]: value
      };
    }
  })
  return objectData;
}
function objectToString(object) {
  var output = '';
  for (var key in object) {
    output = output + [key] + ' ' + object[key] + '\n';
  }
  return output;
}
function writeToOutput(fileOutput, content) {
  var outputWriteStream = fs.createWriteStream(fileOutput);
  outputWriteStream.write(content);
}
function readFileAsync(fileName, callback) {
  fs.readFile(fileName, callback);
}