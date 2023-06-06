import {useState,useCallback} from "react";
import { useDispatch } from "react-redux";
function useThunk(thunk){
    const [isLoading,setIsLoading]=useState(false);
    const [isError,setIsError]=useState(null);
    const dispatch=useDispatch();
    const runThunk= useCallback( 
        (arg)=>{
        setIsLoading(true);
        dispatch(thunk(arg))
        .unwrap()
        .catch((error)=>setIsError(error))
        .finally(()=>setTimeout(()=>{setIsLoading(false)},700));
    },
    [dispatch,thunk]
    );
    return [runThunk,isLoading,isError];
}
export default useThunk;