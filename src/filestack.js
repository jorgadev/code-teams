import * as filestack from "filestack-js";

const apikey = "AIeqJgP3HRYCK8H4ADahBz";
const client = filestack.init("apikey");

client
  .upload(files, { onProgress }, {}, token)
  .then((res) => {
    console.log("success: ", res);
  })
  .catch((err) => {
    console.log(err);
  });
