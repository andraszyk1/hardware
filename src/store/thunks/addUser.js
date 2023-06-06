import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const addUser=createAsyncThunk('addUser',async (user)=>{
    const response = await axios.post("https://192.168.60.112/it_hardware_system/api.php/adduser",user);
    console.log(response.data.user)
    return response.data.user;
})
export {addUser}