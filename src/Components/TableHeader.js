import React from "react";
import {FaArrowAltCircleDown,FaArrowAltCircleUp} from 'react-icons/fa';
import { nanoid } from "@reduxjs/toolkit";
export default  function TableHeader({columns,handleSorting,sortField,sortOrder,isLoading}){

    const handleSortingChange=(accessor)=>{
        console.log(accessor);
        const newSortOrder=accessor===sortField && sortOrder ==="asc" ? "desc" : "asc";
        handleSorting(accessor,newSortOrder); 
    }
    return (

        <thead>
            <tr key={nanoid(1)}>
                {columns.map(({label,accessor,sortable})=>{
                    const iconSort=sortable ?
                        sortField===accessor && sortOrder ==="asc"
                        ? <FaArrowAltCircleUp/>
                        :sortField===accessor && sortOrder ==="desc"
                        ? <FaArrowAltCircleDown/>
                        : <FaArrowAltCircleUp/>
                        :"";
                   
                    return <th 
                    key={accessor} 
                    onClick={sortable ? ()=>handleSortingChange(accessor) : null}>
                    {label} {iconSort}
                    </th>
                })}
            </tr>
        </thead>
    )
}
