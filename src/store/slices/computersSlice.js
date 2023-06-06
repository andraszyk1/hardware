import { createSlice } from "@reduxjs/toolkit";
import { fetchComputers} from "../thunks/fetchComputers";
import { addComputer} from "../thunks/addComputer";
import { deleteComputer} from "../thunks/deleteComputer";
import { updateComputer} from "../thunks/updateComputer";

const InitailDataComputersCount=localStorage.getItem('dataComputersCount') 
      ? localStorage.getItem('dataComputersCount')
      : '' 

const computersSlice=createSlice({
    name:'computers',
    initialState:{
        isLoading:true,
        error:null,
        dataComputers:[],
        dataComputersCount:InitailDataComputersCount,
        dataComputerByUserId:[],
        search:"",
        dataComputerById:null,
        sortField:"id",
        sortOrder:"asc",
        showToast:false,
        msgToast:"",
      
    },
    reducers:{
      closeToast(state,action){
        state.showToast=false;
      },
      getDataComputersCount(state,action){
        state.dataComputersCount=state.dataComputers.length
      },
      getDataComputerByUserId(state,action){
        state.dataComputerByUserId=state.dataComputers.find(computer => computer.user_id === action.payload)
      },
      getDataComputerById(state,action){
        state.dataComputerById=state.dataComputers.find(computer => computer.computer_id === action.payload)
      },
      searchComputer(state,action){
        state.search=action.payload
      },
      sortComputers(state,action){
        state.sortField=action.payload.sortField;
        state.sortOrder=action.payload.sortOrder;
        if(action.payload.sortField){
            const sorted=[...state.dataComputers].sort((a,b)=>{
                if(a[action.payload.sortField]===null) return 1;
                if(b[action.payload.sortField]===null) return -1;
                if(b[action.payload.sortField]===null && a[action.payload.sortField]===null) return 0;

                return a[action.payload.sortField].toString().localeCompare(b[action.payload.sortField].toString(),{numeric:true})*(action.payload.sortOrder==="asc"?1:-1)
            })
            state.dataComputers=sorted;
        }
      }
    },
    extraReducers(builder) {
        builder
          .addCase(fetchComputers.pending, (state, action) => {
            state.isLoading = true;
          })
          .addCase(fetchComputers.fulfilled, (state, action) => {
            if(action.payload===[]){
              return state;
            }else{
            if(state.search===""){
              state.dataComputers=action.payload;
            }else{
              state.dataComputers=action.payload;
              state.dataComputers=state.dataComputers.filter(
                (c)=>{return c.computerName.toLowerCase().includes(state.search.toLowerCase()) ||c.sn.toLowerCase().includes(state.search.toLowerCase())  }
                
                );
            }
            state.isLoading = false;
            state.dataComputersCount=action.payload.length;
            localStorage.setItem('dataComputersCount',JSON.stringify(state.dataComputersCount));
          }
          })
          .addCase(fetchComputers.rejected, (state, action) => {
            state.isLoading=true;
            state.error = action.error.message;
          })
          .addCase(addComputer.pending, (state, action) => {
            state.isLoading = true;
          })
          .addCase(addComputer.fulfilled, (state, action) => {
            if(action.payload.length===0){
              state.showToast=true;
              state.msgToast=`Kmputer nie został dodany - ponieważ nie wypełniłeś wszystkich pól !`;
              return state;
            }else{
            state.showToast=true;
            state.msgToast=`Dodałeś komputer ${action.payload.computerName}`;  
            state.isLoading = false;
            console.log(action.payload);
            state.dataComputers.push(action.payload);
            state.dataComputersCount=state.dataComputers.length;
            localStorage.setItem('dataComputersCount',JSON.stringify(state.dataComputersCount));
          }
          })
          .addCase(addComputer.rejected, (state, action) => {
            state.isLoading=true
            state.error = action.error.message
          })
          .addCase(deleteComputer.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(deleteComputer.fulfilled, (state, action) => {
            state.isLoading = false
          
            state.showToast=true;
            state.msgToast=`Usunołeś komputer ${action.payload.computerName}`;
            state.dataComputers=state.dataComputers.filter((computer)=>{
              return computer.computer_id!==action.payload.computer_id
            })
          
            state.dataComputersCount=state.dataComputers.length
            localStorage.setItem('dataComputersCount',JSON.stringify(state.dataComputersCount))
            
          })
          .addCase(deleteComputer.rejected, (state, action) => {
            state.isLoading=true
            state.error = action.error.message
          })
          .addCase(updateComputer.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(updateComputer.fulfilled, (state, action) => {
            state.isLoading = false
            console.log(action.payload)
            const index = state.dataComputers.findIndex(computer => computer.computer_id === action.payload.computer_id)
            if (index !== -1){
              state.showToast=true;
              state.msgToast=`Zaktualizowałes komputer ${action.payload.computerName}`;
              state.dataComputers[index] = {
                ...state.dataComputers[index],
                ...action.payload,
              };
            }
            
          }
            
          )
          .addCase(updateComputer.rejected, (state, action) => {
            state.isLoading=true
            state.error = action.error.message
          })
      }

})
export const selectAllComputers=state=>state.computers.dataComputers;
export const {getDataComputersCount,getDataComputerByUserId,searchComputer,getDataComputerById,sortComputers,closeToast} = computersSlice.actions;
export const computersReducer =computersSlice.reducer;