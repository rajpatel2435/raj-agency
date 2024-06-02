import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState= {
    status: false,
    userData: null
};

const authSlices= createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action) =>{
            state.status =true;
            state.userData= action.payload.userData
        },
        logout: (state,action)=>{
            state.status= false;
            state.userData= null;
        }
    }
})
// export reducers
export default authSlices.reducer;
// export actions here
export const { login ,logout } = authSlices.actions;