import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../../apiCalls";

export const getUsers = createAsyncThunk('getUsers', async (thunkAPI) => {
    try {
        const data = await callApi.apiMethod('getUsers', 'GET');
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


const usrsSlice = createSlice({
    name: "Users",
    initialState: {
        loading: false,
        users: [],
        error: {
            status: '',
            success: false,
            message: '',
        }
    },
    reducers: {
        selectedChat: (state, action) => {
            const { id } = action.payload;
            state.currSelectedChat = state.users.find(chat => chat._id === id) || {};
        }
    },
    extraReducers: {
        [getUsers.pending]: (state) => {
            state.loading = true;
        },
        [getUsers.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = action.payload.users;
        },
        [getUsers.rejected]: (state, action) => {
            const { error, status } = action.payload;
            const addErrorStatus = { ...error, status };
            state.loading = false;
            state.users = [];
            state.error = addErrorStatus
        },
    }
})

const { reducer, actions } = usrsSlice;
export const { selectedChat } = actions;
export default reducer;