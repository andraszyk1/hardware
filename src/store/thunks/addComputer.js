import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const addComputer=createAsyncThunk('addComputer',async (computer)=>{
    const response = await axios.post("https://192.168.60.112/it_hardware_system/api.php/addcomputer",computer);
    console.log(response.data)
    return response.data.computer;
})
export {addComputer}