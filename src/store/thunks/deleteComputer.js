import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const deleteComputer=createAsyncThunk('deleteComputer',async (item)=>{
    await axios.post("https://192.168.60.112/it_hardware_system/api.php/deletecomputer",item);
    return item;
})
export {deleteComputer}