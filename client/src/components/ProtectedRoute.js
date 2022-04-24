import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const ProtectedRoute = ({ children }) => {
    const { loading, isLoggedIn, error } = useSelector(state => state.auth)
    if (loading) {
        return <div style={{ color: 'black' }}>Loading...</div>
    }
    if (error.status === (401 || 500)) {
        return <Navigate to={"/"} />
    }
    if (localStorage.getItem('authToken') && isLoggedIn) {
        return children
    } else {
        return <Navigate /* to={{ pathname: '/', state: { from: location } }} */ to={"/"} />
    }

}
export default ProtectedRoute;