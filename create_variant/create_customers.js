const fs = require('fs');
var content = "";
function createVariants() {
  const baseQuery = "INSERT INTO `vp__customer` (`id`, `uuid`, `title`, `email`, `password`, `password_length`, `fb_id`, `otp`, `otp_expired_at`, `google_id`, `address`, `avatar`, `phone`, `active_status`, `is_approved`) VALUES"
  for (let i = 0; i < 20; i++) {
    var uuid = generateUUID();
    const valueQuery = `(NULL, '${uuid}', 'User ${i}', 'trancavoi.${i}@gmail.com', '$2y$10$gl8A9kapsDfgPMgH2TpgDub.jHvZ.rqhltzqFRxEtcmkaBjN8cXZW', '6', NULL, NULL, NULL, NULL, 'Hanoi', '', '0123456789', 'on', 'off');`;
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
