import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const deleteUser=createAsyncThunk('deleteUser',async (id)=>{
    await axios.post("https://192.168.60.112/it_hardware_system/api.php/deleteuser",{id});
    return id;
})
export {deleteUser}