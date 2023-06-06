import React,{useEffect, useState} from "react";

export default function Clock(){
    const [date,setDate]=useState("");
    const time=()=>{
        let newDate= new Date(),h,m,s;
        h=newDate.getHours();
        m=newDate.getUTCMinutes();
        s=newDate.getSeconds();
        if(m<10 && s <10){
            m="0"+m;
        }
        if(s <10){
        s="0"+s;
        }
        setDate(h+":"+m+":"+s);
        
    };

    useEffect(()=>{
        setInterval(time,1000);
    },[date])
  

    return(
        <>
           {date}
        </>
    )
}