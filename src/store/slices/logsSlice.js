import { createSlice,current } from "@reduxjs/toolkit"
import { fetchLogs } from "../thunks/fetchLogs";
const initialFilters={tabela:'',nazwa:'',akcja:'',kto:''};
const logsSlice=createSlice({
    name:'logs',
    initialState:{
        isLoading:false,
        error:null,
        dataLogs:[],
        filteredData:[],
        filters:initialFilters,
        sortField:"",
        sortOrder:"asc",
        sliceData:[]
    },
    reducers:{
    filterRun(state,action){
        state.filters=action.payload
    },
    filtersClear(state,action){
      state.filters=initialFilters;
    },
    setPaginateSlice(state,action){
      state.sliceData=action.payload;
    },
    sortLogs(state,action){
      state.sortField=action.payload.sortField;
      state.sortOrder=action.payload.sortOrder;
      if(action.payload.sortField){
          const sorted=[...state.filteredData].sort((a,b)=>{
              if(a[action.payload.sortField]===null) return 1;
              if(b[action.payload.sortField]===null) return -1;
              if(b[action.payload.sortField]===null && a[action.payload.sortField]===null) return 0;

              return a[action.payload.sortField].toString().localeCompare(b[action.payload.sortField].toString(),{numeric:true})*(action.payload.sortOrder==="asc"?1:-1)
          })
          state.filteredData=sorted;
     
          
      }
    }
    },
    extraReducers(builder) {
        builder
          .addCase(fetchLogs.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(fetchLogs.fulfilled, (state, action) => {
            state.isLoading = false
            state.dataLogs=action.payload;
            const {tabela,akcja,nazwa,kto}=state.filters;
            console.log(current(state.filters))
            state.filteredData=action.payload;
            if(tabela!==''){
              state.filteredData=state.filteredData.filter(
                data=>data.tabela.includes(tabela)
            )
            }
            if(akcja!==''){
              state.filteredData=state.filteredData.filter(
                  data=>data.akcja.includes(akcja)
              )
              }
            if(nazwa!==''){
              state.filteredData=state.filteredData.filter(
                data=>data.co.includes(nazwa))
            }
            if(kto!==''){
              state.filteredData=state.filteredData.filter(
                data=>data.kto.includes(kto)
            )
         
            
              }})
          .addCase(fetchLogs.rejected, (state, action) => {
            state.isLoading=true
            state.error = action.error.message
          })
      }
})
export const logsReducer=logsSlice.reducer;
export const {getLogs,filterRun,filtersClear,sortLogs,setPaginateSlice} = logsSlice.actions;