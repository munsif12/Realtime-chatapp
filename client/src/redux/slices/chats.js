import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../../apiCalls";
import removeLoggedinUserFromChat from "../../helpers/removeLoggedinUserFromChat";

export const myChats = createAsyncThunk('chats/myChats', async (thunkAPI) => {
    try {
        const data = await callApi.apiMethod('getChats', 'GET');
        return data;
    } catch (err) {
        if (err.response && err.response.data) {
            return thunkAPI.rejectWithValue({
                error: err.response.data,
                status: err.response.status,
            });
        } else {
            return thunkAPI.rejectWithValue({
                error: "Network Error",
            });
        }
    }
});


const ChatsSlice = createSlice({
    name: "Chats",
    initialState: {
        loading: false,
        chats: [],
        currSelectedChat: {},
        error: {
            status: '',
            success: false,
            message: '',
        }
    },
    reducers: {
        selectedChat: (state, action) => {
            const { id } = action.payload;
            state.currSelectedChat = state.chats.find(chat => chat._id === id) || {};
        },
        setChats: (state, action) => {
            let data = removeLoggedinUserFromChat([action.payload.chat]);
            state.chats = [...data, ...state.chats];
        },
        updateSelectedUsers: (state, action) => {
            const users = action.payload.users;
            state.currSelectedChat.users = users;
        },
        chatsLogout: (state, action) => {
            state.loading = false;
            state.chats = [];
            state.currSelectedChat = {};
            state.error = {}
        }
    },
    extraReducers: {
        [myChats.pending]: (state) => {
            state.loading = true;
        },
        [myChats.fulfilled]: (state, action) => {
            state.loading = false;
            //remove logged in user from chats
            const chats = removeLoggedinUserFromChat(action.payload.chats);
            state.chats = chats
        },
        [myChats.rejected]: (state, action) => {
            const { error, status } = action.payload;
            const addErrorStatus = { ...error, status };
            state.loading = false;
            state.chats = [];
            state.error = addErrorStatus
        },
    }
})

const { reducer, actions } = ChatsSlice;
export const { selectedChat, setChats, updateSelectedUsers, chatsLogout } = actions;
export default reducer;