import { createSlice } from "@reduxjs/toolkit";
const customTableSlice = createSlice({
    name: 'customTable',
    initialState: {
        rowsPerPage: 10
    },
    reducers: {
        setTableRowsPerPage(state, action) {
            state.rowsPerPage = action.payload;
        }
    }
})
export const {setTableRowsPerPage} = customTableSlice.actions;
export const customTableReducer =customTableSlice.reducer;