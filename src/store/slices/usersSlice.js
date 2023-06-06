import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { addUser} from "../thunks/addUser";
import { deleteUser} from "../thunks/deleteUser";
import { updateUser} from "../thunks/updateUser";

const InitailDataUsersCount=localStorage.getItem('dataUsersCount') 
      ? localStorage.getItem('dataUsersCount')
      : '' 
const usersSlice=createSlice({
    name:'users',
    initialState:{
        isLoading:true,
        error:null,
        dataUsers:[],
        firstDataUser:1,
        dataUsersCount:InitailDataUsersCount,
        dataUser:[],
        search:"",
        sortField:"",
        sortOrder:"asc",
        rowsPerPage:10
    },
    reducers:{
        getDataUserById(state,action){
            state.dataUser=state.dataUsers.find(user => user.id === action.payload)
        },
        setRowsPerPage(state,action){
          state.rowsPerPage=action.payload;
        },
        searchUser(state,action){
            state.search=action.payload
        },
        sortUsers(state,action){
          state.sortField=action.payload.sortField;
          state.sortOrder=action.payload.sortOrder;
          if(action.payload.sortField){
              const sorted=[...state.dataUsers].sort((a,b)=>{
                  if(a[action.payload.sortField]===null) return 1;
                  if(b[action.payload.sortField]===null) return -1;
                  if(b[action.payload.sortField]===null && a[action.payload.sortField]===null) return 0;
  
                  return a[action.payload.sortField].toString().localeCompare(b[action.payload.sortField].toString(),{numeric:true})*(action.payload.sortOrder==="asc"?1:-1)
              })
              state.dataUsers=sorted;
          }
        }
    },
    extraReducers(builder){
        builder.addCase(fetchUsers.fulfilled,(state,action)=>{
                if(state.search===""){
                state.dataUsers=action.payload;
              
                }
                else{
               
                state.dataUsers=action.payload;
                state.dataUsers=state.dataUsers.filter(
                  u=>u.name.toLowerCase().includes(state.search.toLowerCase())||
                  u.surname.toLowerCase().includes(state.search.toLowerCase())
                  )
                }
                state.firstDataUser=action.payload[0].id;
                state.dataUsersCount=action.payload.length;
                state.isLoading=false;
                localStorage.setItem('dataUsersCount',JSON.stringify(state.dataUsersCount));
              
         
        })
        .addCase(addUser.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(addUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.dataUsers.push(action.payload);
            state.dataUsersCount=state.dataUsers.length
            localStorage.setItem('dataUsersCount',JSON.stringify(state.dataUsersCount))
            
          })
          .addCase(addUser.rejected, (state, action) => {
            state.isLoading=true
            state.error = action.error.message
          })
          .addCase(deleteUser.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(deleteUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.dataUsers=state.dataUsers.filter((user)=>{
              return user.id!==action.payload
            })
            state.dataUsersCount=state.dataUsers.length
            localStorage.setItem('dataUsersCount',JSON.stringify(state.dataUsersCount))
            
          })
          .addCase(deleteUser.rejected, (state, action) => {
            state.isLoading=true
            state.error = action.error.message
          })
          .addCase(updateUser.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false
            const index = state.dataUsers.findIndex(user => user.id === action.payload.id)
            if (index !== -1){
              state.dataUsers[index] = {
                ...state.dataUsers[index],
                ...action.payload,
              };
            }
            
           
            
          }
            
          )
          .addCase(updateUser.rejected, (state, action) => {
            state.isLoading=true
            state.error = action.error.message
          })
          
    }
})
export const usersReducer = usersSlice.reducer;
export const {getUsers,getDataUserById,searchUser,sortUsers,setRowsPerPage}=usersSlice.actions;
