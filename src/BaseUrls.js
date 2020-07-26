let REGISTER_BASE_URL = `https://user-management-2bk3z24blq-ue.a.run.app`
let AUTH_GATEWAY_BASE_URL = `https://1yp08nwt9a.execute-api.us-east-1.amazonaws.com/Prod`
let GCF_BASE_URL = `https://us-central1-csci-5410-av.cloudfunctions.net`
let PRATHEEP_GCF_BASE_URL = `https://us-central1-testproject-277421.cloudfunctions.net`


let SESSION_BASE_URL = `${AUTH_GATEWAY_BASE_URL}/session`
let LOGIN_URL = `${AUTH_GATEWAY_BASE_URL}/login`
let LIST_FILES = `${GCF_BASE_URL}/listFiles`
let CREATE_SUB_URL = `${PRATHEEP_GCF_BASE_URL}/createSubscription`

export {
    REGISTER_BASE_URL, LIST_FILES,
    SESSION_BASE_URL, LOGIN_URL,
    GCF_BASE_URL, CREATE_SUB_URL
}