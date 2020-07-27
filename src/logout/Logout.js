import React from 'react'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'
import { LOGOUT_URL } from '../BaseUrls'

export default function Logout() {
    let userData = JSON.parse(localStorage.getItem("userData"));
    let token = userData.token
    localStorage.removeItem("loggedIn")
    localStorage.removeItem("userData")
    localStorage.removeItem("email")
    Axios.delete(`${LOGOUT_URL}`, {
        headers: {
            "Authorization": token
        }
    })
    return (
        <Redirect to="/login"></Redirect>
    )
}
