import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchLogs=createAsyncThunk('fetchLogss',async ()=>{
    const response = await axios.get("https://192.168.60.112/it_hardware_system/api.php/logs");
    return response.data.logs;
    
})

export {fetchLogs}