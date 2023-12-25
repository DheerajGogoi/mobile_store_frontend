import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialAuth = {
    user: JSON.parse(localStorage.getItem("mobile_store_auth")) || null,
    auth: JSON.parse(localStorage.getItem("mobile_store_auth")) ? true : false
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuth,
    reducers: {
        login(state, actions){
            state.auth = true;
            state.user = actions.payload.user;
            localStorage.setItem('mobile_store_auth', JSON.stringify(actions.payload.user));
            console.log(actions.payload.user);
        },
        logout(state, actions){
            state.auth = false;
            state.user = null;
            localStorage.removeItem("mobile_store_auth");
        }
    }
})

export const authActions = authSlice.actions;

const store = configureStore({
    reducer: {
        userAuth: authSlice.reducer,
    }
})

export default store;