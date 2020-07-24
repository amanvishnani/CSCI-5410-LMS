const axios = require("axios");
const xmlParser = require("xml2json");

async function callFunc() {
  let bucket_url = `https://storage.googleapis.com/chatmessages`;
  await axios
    .get(bucket_url)
    .then((bucket_res) => {
      let xmlData = bucket_res.data;
      let jsonStr = xmlParser.toJson(xmlData);
      let jsonObj = JSON.parse(jsonStr);
      let filesList = jsonObj["ListBucketResult"]["Contents"];

      if (filesList && Object.keys(filesList).length) {
        Object.values(filesList).forEach(async (value) => {
          let file_name = value["Key"];
          let file_url = bucket_url + "/" + file_name;
          await axios
            .get(file_url)
            .then((file_res) => {
              console.log(file_res.data);
            })
            .catch((file_err) => {
              console.log(file_err);
            });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

callFunc();

//https://console.cloud.google.com/storage/browser/chatmessages;tab=objects?forceOnBucketsSortingFiltering=false&project=testproject-277421
