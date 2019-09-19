const fs = require('fs');
const products = [
  "122ec6f4-76cf-44aa-bdf1-df7fd7b71a2b",
  "222ec6f4-76cf-44aa-bdf1-df7fd7b71a2b",
  "322ec6f4-76cf-44aa-bdf1-df7fd7b71a2b",
  "422ec6f4-76cf-44aa-bdf1-df7fd7b71a2b",
  "522ec6f4-76cf-44aa-bdf1-df7fd7b71a2b",
  "622ec6f4-76cf-44aa-bdf1-df7fd7b71a2b"
]

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

const prices = ["150000", "200000", "300000", "100000", "500000"];
var content = "";
function createVariants() {
  const baseQuery = "INSERT INTO `vp__product_variants` (`id`, `uuid`, `product_uuid`, `variant`, `price`, `image`, `active_status`) VALUES"
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
          const valueQuery = `(NULL, '${uuid}', '${products[productKey]}', '${variantArrayJson}', '${price}', '1568387304_5d7bb0e84a55d', 'on');`;
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