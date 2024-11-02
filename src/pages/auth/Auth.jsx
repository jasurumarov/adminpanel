import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const Auth = () => {
    let isLogin = useSelector(state => state.auth.token) // localStorage.getItem("x-auth-token")
    return isLogin ? <Outlet /> : <Navigate replace to={'/register'} />
}

export default Auth