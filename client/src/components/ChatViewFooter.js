import React from 'react'
import { Input } from '@vechaiui/react'
import { MdSend } from "react-icons/md";
function ChatFooter() {
    return (
        <div className="footerWriteNewMessage">
            <div className="footerWriteNewMessage__input">
                <Input type="text" placeholder="Write new message" />
            </div>
            <div className="footerWriteNewMessage__send">
                <MdSend />
            </div>
        </div>
    )
}

export default ChatFooter