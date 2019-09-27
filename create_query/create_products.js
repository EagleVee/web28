const fs = require('fs');

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

const currentPrices = [
  "150000",
  "180000",
  "200000"
];

const originalPrices = [
  "200000",
  "250000",
  "300000"
];

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
  const baseQuery = "INSERT INTO `vp__product` (`id`, `uuid`, `title`, `description`, `image_main`, `current_price`, `original_price`, `brand_uuid`, `category_uuid`, `origin`, `active_status`) VALUES"
  for (let i = 0; i < 20; i++) {
    var uuid = generateUUID();
    var title = i + '' + titles[Math.floor(Math.random() * titles.length)];
    var image = images[Math.floor(Math.random() * images.length)];
    var currentPrice = currentPrices[Math.floor(Math.random() * currentPrices.length)];
    var originalPrice = originalPrices[Math.floor(Math.random() * originalPrices.length)];
    var brand = brands[Math.floor(Math.random() * brands.length)];
    var category = categories[Math.floor(Math.random() * categories.length)];
    var valueQuery = `(NULL, '${uuid}', '${title}', 'Description', '${image}', '${currentPrice}', '${originalPrice}', '${brand}', '${category}', 'Úc', 'on');`;
    query = baseQuery + valueQuery;
    content = content + query + "\n";
  }
}
function writeToOutput(fileOutput, content) {
  var outputWriteStream = fs.createWriteStream(fileOutput);
  outputWriteStream.write(content);
}
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
createVariants();
writeToOutput("query.txt", content);