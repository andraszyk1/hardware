import { createSlice } from "@reduxjs/toolkit"
import { fetchSystems } from "../thunks/fetchSystems";
const systemsSlice=createSlice({
    name:'systems',
    initialState:{
        isLoading:false,
        error:null,
        dataSystems:[],
        firstDataSystem:1
    },
    reducers:{
        getFirstDataSystem(state,action){
          state.firstDataSystem=state.dataSystems[0].id
        }
    },
    extraReducers(builder) {
        builder
          .addCase(fetchSystems.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(fetchSystems.fulfilled, (state, action) => {
            state.isLoading = false
            state.dataSystems=action.payload;
            state.firstDataSystem=action.payload[0].id;
            
          })
          .addCase(fetchSystems.rejected, (state, action) => {
            state.isLoading=true
            state.error = action.error.message
          })
      }
})
export const systemsReducer=systemsSlice.reducer;
export const {getSystems,getFirstDataSystem} = systemsSlice.actions;