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

const volumns = [
  {
    "variant_key": "volumn",
    // "variant_value": "100",
    "variant_value": "100ml"
  },
  {
    "variant_key": "volumn",
    // "variant_value": "300",
    "variant_value": "300ml"
  },
  {
    "variant_key": "volumn",
    // "variant_value": "500",
    "variant_value": "500ml"
  }
];

const weights = [
  {
    "variant_key": "weight",
    // "variant_value": "500",
    "variant_value": "500gr"
  },
  {
    "variant_key": "weight",
    // "variant_value": "700",
    "variant_value": "700gr"
  },
  {
    "variant_key": "weight",
    // "variant_value": "900",
    "variant_value": "900gr"
  }
];

const flavours = [
  {
    "variant_key": "flavour",
    // "variant_value": "vani",
    "variant_value": "Vani"
  },
  {
    "variant_key": "flavour",
    // "variant_value": "chocolate",
    "variant_value": "Chocolate"
  },
  {
    "variant_key": "flavour",
    // "variant_value": "strawberry",
    "variant_value": "Dâu"
  },
];

const instocks = [
  "1234",
  "125",
  "107",
  "99",
  "92",
  "7749"
]
const prices = ["150000", "200000", "300000", "100000", "500000"];
var content = "";
function createVariants() {
  const baseQuery = "INSERT INTO `vp__product_variant` (`id`, `uuid`, `product_uuid`, `variant`, `price`, `image`, `instock`, `active_status`) VALUES"
  for (productKey in products) {
    for (volumnKey in volumns) {
      for (weightKey in weights) {
        for (flavourKey in flavours) {
          var uuid = generateUUID();
          var variantArray = [];
          variantArray.push(volumns[volumnKey]);
          variantArray.push(weights[weightKey]);
          variantArray.push(flavours[flavourKey]);
          const price = prices[Math.floor(Math.random() * prices.length)];
          var variantArrayJson = JSON.stringify(variantArray);
          var instock = instocks[Math.floor(Math.random() * instocks.length)];
          const valueQuery = `(NULL, '${uuid}', '${products[productKey]}', '${variantArrayJson}', '${price}', '1568387304_5d7bb0e84a55d', '${instock}', 'on');`;
          query = baseQuery + valueQuery;
          content = content + query + "\n";
        }
      }
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
// console.log(generateUUID());
// console.log(generateUUID());
// console.log(generateUUID());
// console.log(generateUUID());
createVariants();
writeToOutput("query.txt", content);