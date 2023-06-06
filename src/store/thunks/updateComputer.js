import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const updateComputer=createAsyncThunk('updateComputer',async (computer)=>{
    const response = await axios.post("https://192.168.60.112/it_hardware_system/api.php/updatecomputer/",computer);
    console.log(response.data)
    
    return response.data.computer;
})
export {updateComputer}