import React from "react";
import { MdDelete, MdEdit, MdListAlt } from 'react-icons/md';

export default function TableBody({ columns, tableData, editRow, deleteRow, podgladRow, isLoading }) {

    function isJsonObject(strData) {
        try {
            JSON.parse(strData);
        } catch (e) {
            return false;
        }
        return true;
    }
    return (
        <tbody>
            {tableData.map((data,i) => {
                return (<tr key={i} >
                    { columns.map(({ accessor }) => {
                        if (accessor === 'akcje') {
                            return <td key={accessor}>
                                <MdListAlt className='wskaznik' onClick={() => podgladRow(data)} title='Podgląd' >Podgląd</MdListAlt>
                                <MdEdit className='wskaznik' onClick={() => editRow(data)} title='Edytuj' >Edytuj</MdEdit>
                                <MdDelete className='wskaznik' onClick={() => deleteRow(data)} title='Usuń' >Delete</MdDelete>
                            </td>
                        }
                        if (accessor === 'aplications') {
                            if (isJsonObject(data[accessor])) {
                                return <td key={accessor}>{
                                    JSON.parse(data[accessor]).map((item, i) => {
                                        return i === 0 ? item.label : ", " + item.label
                                    })}
                                </td>
                            }
                        }
                        else {
                            const tData = data[accessor] ? data[accessor] : "-";
                            return <td key={accessor}>{tData}</td>
                        }
                        return null;
        })}
            </tr>
            )
            })}
        </tbody>
    )
}
