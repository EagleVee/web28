const fs = require('fs');
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

const variants = [
  {
    variantKey: "volumn",
    variantTitle: "Dung tích",
    variantValues: `["100ml", "300ml", "500ml"]`
  },
  {
    variantKey: "weight",
    variantTitle: "Trọng lượng",
    variantValues: `["500gr", "700gr", "900gr"]`
  },
  {
    variantKey: "flavour",
    variantTitle: "Mùi vị",
    variantValues: `["Vani", "Chocolate", "Dâu"]`
  }
];

var content = "";
function createVariants() {
  const baseQuery = "INSERT INTO `vp__variant` (`id`, `uuid`, `product_uuid`, `variant_key`, `variant_title`, `variant_values`, `active_status`) VALUES"
  for (product of products) {
    for (variant of variants) {
      var uuid = generateUUID();
      const valueQuery = `(NULL, '${uuid}', '${product}', '${variant.variantKey}', '${variant.variantTitle}', '${variant.variantValues}', 'on');`;
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