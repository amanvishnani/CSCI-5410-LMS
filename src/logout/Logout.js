import React from 'react'
import { Redirect } from 'react-router-dom'

export default function Logout() {
    localStorage.removeItem("loggedIn")
    localStorage.removeItem("userData")
    localStorage.removeItem("email")
    return (
        <Redirect to="/login"></Redirect>
    )
}
