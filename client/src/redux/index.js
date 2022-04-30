import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/auth'
import chatsReducer from './slices/chats'
import usersReducer from './slices/users'

const store = configureStore({
    reducer: {
        auth: authReducer,
        chats: chatsReducer,
        users: usersReducer,
    }
})

export default store;