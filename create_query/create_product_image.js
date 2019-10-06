const fs = require("fs");
const products = [
  "4f6fd444-847e-44cc-90fb-aa8859d3a39b",
  "1cda9002-3eff-4829-a3b3-799f14095079",
  "8b1fb21b-4038-4eb1-abbd-8ca9823b61c6",
  "9966bf5b-8fda-4786-95c2-0abe13c11864",
  "e3e1a458-1860-467b-9eee-e7b33634ab55",
  "622ec6f4-76cf-44aa-bdf1-df7fd7b71a2b",
  "fc1c7d0a-8af5-4522-a5dd-5c954aa55dd7",
  "dc8dea1d-5a9f-4ef9-a8f1-e49732cf3ec0",
  "12b366cf-0def-4f87-af89-f332e5df594e",
  "58d9c7bd-d96a-4e99-ac78-2bb09d6b4766"
];
const images = [
  "1568387438_5d7bb16eae9b9",
  "1568387304_5d7bb0e84a55d",
  "1568446880_5d7c99a06e24c",
  "1568446258_5d7c973296445",
  "1568444087_5d7c8eb7086e2",
  "1568444171_5d7c8f0b481e3"
];

const titles = [
  "Sữa Blackmores Follow On Formula Úc",
  "Sữa Kid Essentials Nestle Úc",
  "Sữa Alpha Nestle Úc"
];

const currentPrices = ["150000", "180000", "200000"];

const originalPrices = ["200000", "250000", "300000"];

const brands = [
  "7030b208-25fa-416c-9b47-8c0c20c7340e",
  "bf954f36-f71b-450d-90fe-30978574835f",
  "89de0489-b3f4-40c9-b2cd-af5b1d2ef9dc",
  "d43853dd-5c6d-4aef-8ddc-a367f2f9541f",
  "4432e7f3-5c93-4dfe-916e-839e46696220",
  "922ec6f4-76cf-44aa-bdf1-df7fd7b71a2b"
];

const categories = [
  "ll2ec6f4-76cf-44aa-abs1-df7fd7b71a2b",
  "777ec6f4-76cf-44aa-bas1-df7fd7b71a2b",
  "ll2ec6f4-76cf-44aa-bas1-df7fd7b71a2b",
  "ll2ec6f4-76cf-44aa-bas1-df7fd7b71a2b",
  "ll2ec6f4-76cf-44aa-bas1-df7fd7b71a2b"
];

var content = "";
function createVariants() {
  const baseQuery =
    "INSERT INTO `vp__product_image` (`id`, `uuid`, `product_uuid`, `image_key`, `active_status`) VALUES";
  for (key in products) {
    var uuid = generateUUID();
    var productUUID = products[key];
    var imageKey1 = images[Math.floor(Math.random() * images.length)];
    var imageKey2 = images[Math.floor(Math.random() * images.length)];
    var imageKey3 = images[Math.floor(Math.random() * images.length)];
    var valueQuery1 = `(NULL, '${uuid}', '${productUUID}', '${imageKey1}', 'on');`;
    var valueQuery2 = `(NULL, '${uuid}', '${productUUID}', '${imageKey2}', 'on');`;
    var valueQuery3 = `(NULL, '${uuid}', '${productUUID}', '${imageKey3}', 'on');`;
    var query1 = baseQuery + valueQuery1;
    var query2 = baseQuery + valueQuery2;
    var query3 = baseQuery + valueQuery3;
    content = content + query1 + "\n";
    content = content + query2 + "\n";
    content = content + query3 + "\n";
  }
}
function writeToOutput(fileOutput, content) {
  var outputWriteStream = fs.createWriteStream(fileOutput);
  outputWriteStream.write(content);
}
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
createVariants();
writeToOutput("query.txt", content);
