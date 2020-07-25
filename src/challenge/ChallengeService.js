const { default: Axios } = require("axios");
const { SESSION_BASE_URL } = require("../BaseUrls");

export async function verifyChallangeOnServer(challengeCode, challengeResponse) {
   let resp = await Axios.post(`${SESSION_BASE_URL}/validate-challenge`, {
       challengeCode, challengeResponse
   }) 
   return resp.data;
}