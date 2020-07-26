import Axios from "axios";
import { REGISTER_BASE_URL, CREATE_SUB_URL } from "../BaseUrls";

async function getOrgs() {
    let orgs = await Axios.get(`${REGISTER_BASE_URL}/orgs`)
    return orgs.data;
}

async function getEmailAvailibility(emailId) {
    if(!emailId) return;
    let emailAvailibility = await Axios.get(`${REGISTER_BASE_URL}/check-email-availability/${emailId}`)
    return emailAvailibility.data;
}

async function registerUser(state) {
    let data = {
        "emailId": state.email,
        "firstName": state.firstName,
        "lastName": state.lastName,
        "password": state.password,
        "orgId": state.institution,
        "securityQuestion": state.securityQue,
        "securityAnswer": state.securityAns
    }
    // console.log(data)
    let userResp = await Axios.post(`${REGISTER_BASE_URL}/register`, data)
    return userResp.data;
}

function createSubscription(userId, orgId, orgName) {
    return Axios.post(`${CREATE_SUB_URL}`, {
        userId, orgId, orgName
    })
}

export {
    getOrgs,
    getEmailAvailibility,
    registerUser, createSubscription
}