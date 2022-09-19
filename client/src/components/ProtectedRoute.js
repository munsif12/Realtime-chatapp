import React from 'react'
import { Navigate } from 'react-router-dom'
const ProtectedRoute = ({ children }) => {
    if (localStorage.getItem('authToken')) {
        return children
    } else {
        return <Navigate /* to={{ pathname: '/', state: { from: location } }} */ to={"/"} />
    }
}
export default ProtectedRoute;