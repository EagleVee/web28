const fs = require('fs');
const products = [
  "122ec6f4-76cf-44aa-bdf1-df7fd7b71a2b",
  "222ec6f4-76cf-44aa-bdf1-df7fd7b71a2b",
  "322ec6f4-76cf-44aa-bdf1-df7fd7b71a2b",
  "422ec6f4-76cf-44aa-bdf1-df7fd7b71a2b",
  "522ec6f4-76cf-44aa-bdf1-df7fd7b71a2b",
  "622ec6f4-76cf-44aa-bdf1-df7fd7b71a2b",
  "40692043-0611-4da6-8d46-255d3b33ca06",
  "8e7dd732-97bc-4bca-be5c-453448cc0036",
  "4d92f734-085d-41f2-ae4e-58d48e08b91d",
  "e6cb56e2-2d89-49b4-b6d2-90edbff0eb72"
]

const variants = [
  {
    varientKey: "volumn",
    variantTitle: "Dung tích",
    variantValues: ["100ml", "300ml", "500ml"]
  },
  {
    variantKey: "weight",
    variantTitle: "Trọng lượng",
    variantValues: ["500gr", "700gr", "900gr"]
  },
  {
    variantKey: "flavour",
    variantTitle: "Mùi vị",
    variantValues: ["Vani", "Chocolate", "Dâu"]
  }
];

var content = "";
function createVariants() {
  const baseQuery = "INSERT INTO `vp__variants` (`id`, `uuid`, `product_uuid`, `variant_key`, `variant_title`, `variant_value`) VALUES"
  for (product of products) {
    for (variant of variants) {
      var uuid = generateUUID();
      const valueQuery = `(NULL, '${uuid}', '${products[productKey]}', '${variantArrayJson}', '${price}', '1568387304_5d7bb0e84a55d', 'on');`;
      query = baseQuery + valueQuery;
      content = content + query + "\n";
    }
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