import { cloneDeep } from "lodash";
export default function removeLoggedinUserFromChat(chats) {
    let newChats = cloneDeep(chats);
    const loggedInUserId = JSON.parse(localStorage.getItem('user'));
    return newChats.map(chat => {
        if (chat.isGroupChat) return chat
        return {
            ...chat,
            users: chat.users.filter(user => user._id !== loggedInUserId._id)
        }
    })
}