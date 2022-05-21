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
                error: {
                    success: false,
                    message: "Network Error"
                }
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
                error: {
                    success: false,
                    message: "Network Error"
                }
            });
        }
    }
});
export const checkToken = createAsyncThunk('auth/checkToken', async (thunkAPI) => {
    try {
        const { data } = await axios.get('/auth/checktoken');
        return data;
    } catch (err) {
        if (err.response && err.response.data) {
            return thunkAPI.rejectWithValue({
                error: err.response.data,
                status: err.response.status,
            });
        } else {
            return thunkAPI.rejectWithValue({
                error: {
                    success: false,
                    message: "Network Error"
                }
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
        Logout: (state) => {
            state.isLoggedIn = false;
            state.user = {};
            state.error = {};
        },
        ClearError: (state) => {
            state.error.status = '';
            state.error.success = false;
            state.error.message = '';
        },
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.loading = true;
            state.formType = 'login';
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isLoggedIn = true;
            //set user to localStorege
            const { token, user } = action.payload;
            localStorage.setItem('authToken', token)
            localStorage.setItem('user', JSON.stringify(user));
        },
        [login.rejected]: (state, action) => {
            const { error, status } = action.payload;
            const addErrorStatus = { ...error, status };
            state.loading = false;
            state.error = addErrorStatus;
            state.isLoggedIn = false;
        },
        [register.pending]: (state) => {
            state.loading = true;
            state.formType = 'register';
        },
        [register.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isLoggedIn = true;
            //set user to localStorege
            const { token, user } = action.payload;
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));
        },
        [register.rejected]: (state, action) => {
            const { error, status } = action.payload;
            const addErrorStatus = { ...error, status };
            state.loading = false;
            state.error = addErrorStatus;
            state.isLoggedIn = false;
        },
        [checkToken.pending]: (state) => {
            state.loading = true;
        },
        [checkToken.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.loading = false;

        },
        [checkToken.rejected]: (state) => {
            state.loading = false;
            state.isLoggedIn = false;
            state.user = {};
        }
    }
})
const { reducer, actions } = authSlice;
export const { ClearError, Logout } = actions;
export default reducer;
