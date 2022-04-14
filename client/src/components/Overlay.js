import React from 'react'

function Overlay({ setactiveTab }) {
    return (
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>Please login with your personal info</p>
                    <button className="ghost" id="signIn" onClick={() => setactiveTab('')}>Sign In</button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start your journey with us</p>
                    <button className="ghost" id="signUp" onClick={() => setactiveTab('right-panel-active')}>Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default Overlay