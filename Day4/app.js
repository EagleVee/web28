var argv = process.argv.slice(2);
var fs = require('fs');
if (argv && argv.length >= 2) {
  var fileInput = argv[0];
  var fileOutput = argv[1];
  readFileAsync(fileInput, function (error, data) {
    if (error) {
      throw error;
    } else {
      var objectData = convertToObject(data.toString());
      writeToOutput(fileOutput, objectData)
    }
  })
} else {
  console.log('ERROR');
}
function convertToObject (data) {
  var arrayData = data.split('\n');
  var objectData = {}
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
function writeToOutput (fileOutput, objectData) {
    var output = '';
    for (var key in objectData) {
      output = output + [key] + ' ' + objectData[key] + '\n';
    }
    var outputWriteStream = fs.createWriteStream(fileOutput);
    outputWriteStream.write(output);
}
function readFileAsync (fileName, callback) {
  fs.readFile(fileName, callback);
}