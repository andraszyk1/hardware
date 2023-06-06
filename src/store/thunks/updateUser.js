import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const updateUser=createAsyncThunk('updateUser',async (user)=>{
    const response = await axios.post("https://192.168.60.112/it_hardware_system/api.php/updateuser/",user);
    return response.data.user;
})
export {updateUser}