import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const fetchSystems=createAsyncThunk('fetchSystems',async ()=>{
    const response = await axios.get("https://192.168.60.112/it_hardware_system/api.php/systems");
    return response.data.systems;
})
export {fetchSystems}