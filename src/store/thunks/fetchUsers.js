import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const fetchUsers=createAsyncThunk('fetchUsers',async ()=>{
    const response = await axios.get("https://192.168.60.112/it_hardware_system/api.php/users/");
    return response.data.users;
})
export {fetchUsers}