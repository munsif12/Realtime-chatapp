import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios";
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        const { data } = await axios.post('/auth/login', user, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
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
export const register = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        const { data } = await axios.post('/auth/register', user, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
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

const authSlice = createSlice({
    name: "auth",
    initialState: {
        formType: "",
        isLoggedIn: false,
        user: {},
        error: {
            status: '',
            success: false,
            message: '',
        },
        loading: false,
    },
    reducers: {
        ClearError: (state, action) => {
            console.log('clearing error', action);
            state.error.status = '';
            state.error.success = false;
            state.error.message = '';
        },
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.loading = true;
            state.formType = 'login';
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isLoggedIn = true;
            //set user to localStorege
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        },
        [login.rejected]: (state, action) => {
            const { error, status } = action.payload;
            const addErrorStatus = { ...error, status };
            state.loading = false;
            state.error = addErrorStatus;
            state.isLoggedIn = false;
        },
        [register.pending]: (state, action) => {
            state.loading = true;
            state.formType = 'register';
        },
        [register.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isLoggedIn = true;
            //set user to localStorege
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        },
        [register.rejected]: (state, action) => {
            const { error, status } = action.payload;
            const addErrorStatus = { ...error, status };
            state.loading = false;
            state.error = addErrorStatus;
            state.isLoggedIn = false;
        }
    }
})
const { reducer, actions } = authSlice;
export const { ClearError } = actions;
export default reducer;