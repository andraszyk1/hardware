import React,{useState,createContext, useEffect} from 'react';

const ZestawyContext=createContext();
function ZestawyProvider({children}){
const [showZestawModal,setShowZestawModal]=useState()

const allZestawy=[
    {id:1,title:"Zgloszenie 1",content:"Zawartosc 1 ",autor:"Autor 1"},
    {id:2,title:"Zgloszenie 2",content:"Zawartosc 2 ",autor:"Autor 2"},    
    {id:3,title:"Zgloszenie 2",content:"Zawartosc 2 ",autor:"Autor 2"},    
    {id:4,title:"Zgloszenie 2",content:"Zawartosc 2 ",autor:"Butor 2"},    
    {id:5,title:"Zgloszenie 2",content:"Zawartosc 2 ",autor:"Autor 2"},    
    {id:6,title:"Zgloszenie 2",content:"Zawartosc 2 ",autor:"Autor 2"},    
    {id:7,title:"Zgloszenie 2",content:"Zawartosc 2 ",autor:"Butor 2"},    
]
const [zestawy,setZestawy]=useState(allZestawy);

useEffect(()=>{
    console.log("useEffect w zgloszenia.js")
    setZestawy(allZestawy)
},[])

const getZestawById=(id)=>{
    //console.log(id)
    const zestaw=zestawy.filter((ticket)=>ticket.id===id)
    setZestawy(...zestaw)
    setShowZestawModal(true)
    
}

const closeZestawModal=()=>{
    setShowZestawModal(false)
    setZestawy(allZestawy)
}
const valueContext={
    zestawy,
    getZestawById,
    showZestawModal,
    closeZestawModal,

}

return (
<ZestawyContext.Provider  value={valueContext}>
    {children}
</ZestawyContext.Provider>
)
} 
export {ZestawyProvider};
export default ZestawyContext;