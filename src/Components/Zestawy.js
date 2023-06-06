import React, {useContext} from "react";
import {Container,Table} from 'react-bootstrap';
import ZestawyContext from "../Contexts/zestawy";
import ZestawModal from "./ZestawModal";

import SortableTable from "./SortableTable";
function Zestawy(){
    const {zestawy,getZestawById,showZestawModal,closeZestawModal} = useContext(ZestawyContext);

    const data=[
        {name:'Orange',color:'bg-emerald-500',score:2},
        {name:'Apple',color:'bg-red-500',score:3},
        {name:'Banana',color:'bg-amber-500',score:1},
        {name:'Dynia',color:'bg-emerald-500,',score:5},
    ]
    const config =[
        {
            label:"Name",
            render:(fruit) => fruit.name,
            sortValue:(fruit)=>fruit.name
        },
        {
            label:"Color",
            render:(fruit) => <div className={`p-3 m-2 ${fruit.color}`}></div>
        },
        {
            label:"Score",
            render:(fruit) => fruit.score,
            sortValue:(fruit)=>fruit.score
        },
    ]
    const keyFn=fruit=>fruit.name    //console.log(zestawy)
return(
    <>
    <SortableTable data={data} config={config} keyFn={keyFn}/>
<Container>
   
{(showZestawModal) && <ZestawModal show={showZestawModal} closeZestawModal={closeZestawModal} zestaw={zestawy}/>}
            
           
            <Table  bordered hover size="sm">
            <thead>
            </thead>    
            <tbody>
 
            {(zestawy) && !showZestawModal ? zestawy.map((zestaw,index)=>{
                return <tr key={index}>
                    <td>{zestaw.id}</td>
                    <td>{zestaw.content}</td>
                    <td>{zestaw.autor}</td>
                    <td><button value={zestaw.id} onClick={()=>getZestawById(zestaw.id)}>Edytuj</button></td>
                </tr>
            }) :<tr></tr> }
             </tbody>
            </Table>
       
        </Container>
        </>
    )


}


export default Zestawy;