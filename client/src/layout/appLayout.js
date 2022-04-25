import React from 'react'
import ChatSidebar from '../components/ChatSidebar'

function AppLayout({ children }) {

    return (
        <>
            <div className="chatContainer">
                <div className="chatappLayout flex">
                    <ChatSidebar />
                    <div className="chatView">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AppLayout