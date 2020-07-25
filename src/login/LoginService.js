const { default: Axios } = require("axios");
const { LOGIN_URL } = require("../BaseUrls");

export async function login(emailId, password) {
    let resp = await Axios.post(LOGIN_URL, {
        emailId,
        password
    })
    return resp.data;
}

