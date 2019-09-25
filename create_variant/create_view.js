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
];

const customers = [
  "a7cdd55f-ec94-4d1e-841e-540dda17aee6",
  "a7cdd55f-ec94-4d1e-841e-510dda17aee5",
  "3a91b390-a813-4cd3-9093-02e5e5d273f4",
  "f624ba6a-9b69-4261-86a2-419bb00e72e7",
  "d79aa4f2-1cbd-4d31-916c-f8625be7b4d4",
  "0445649e-2102-4cac-9d29-8e51a08e6900",
  "eefe856d-2157-4428-9cc5-3603aed13a33",
  "4917259f-09c3-41f0-b3e4-d89d4aeb257f",
  "2a9a51bd-13b9-42b5-b0e5-68ebd80b4087",
  "48564bc5-34ca-4e17-a6d5-fd889d219931",
  "45a59bf9-7085-4106-9d64-a9d6e69801be",
  "4e199a24-db94-409e-8ca9-8061cfde7825",
  "b84ab3c4-75d0-4d4e-87cb-222a4edf6557",
  "81cda33a-dcb4-4cad-abd8-fb746370ae9c",
  "ff01e6cc-09c7-410e-914a-c3525167ebc6",
  "9a264333-9da3-46bc-b2e8-3c9de61f40f1",
  "f29f8237-fce4-477f-bcbe-4652f53345a9",
  "b94deb25-b0ee-4481-8f6e-1976fd323d09",
  "2834dc94-dace-43f6-a599-d246dbab4b1b",
  "6d51bb68-3a90-43ec-b030-6a70ffc0545a",
  "f97950b1-bdee-408a-a031-ddfc16bc46d6",
  "613034bb-ff7b-4a16-8e1c-eebd385bc3aa",
  "6403658d-ca1c-4c39-a8f0-d15bbde11148",
  "978c8075-7299-421b-acf4-b282562095ed"
]
var content = "";
function createVariants() {
  const baseQuery = "INSERT INTO `vp__view` (`id`, `uuid`, `object_type`, `object_uuid`, `customer_uuid`, `active_status`) VALUES ";
  for (product of products) {
    for (customer of customers) {
      var uuid = generateUUID();
      const valueQuery = `(NULL, '${uuid}', 'product', '${product}', '${customer}', 'on');`;
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