export function selectUserFilter(searchArray, searchKey) {
    if (!searchArray) return [];
    return searchArray.filter(chat => (
        chat.name.toLowerCase().includes(searchKey.toLowerCase()) ||
        chat.email.toLowerCase().includes(searchKey.toLowerCase())
    ))
}

export function homeChatsFilter(searchArray, searchLey) {
    if (!searchArray) return [];
    return searchArray
        .filter(chat => chat.isGroupChat ?
            chat.chatName.toLowerCase().includes(searchLey.toLowerCase()) :
            chat.users.some(user => user.name.toLowerCase().includes(searchLey.toLowerCase())))
}