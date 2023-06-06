import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchComputers=createAsyncThunk('fetchComputers',async ()=>{
    const response = await axios.get("https://192.168.60.112/it_hardware_system/api.php/computers");

    return response.data.computers;
    
})

export {fetchComputers}