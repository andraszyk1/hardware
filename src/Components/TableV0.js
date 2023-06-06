import React from "react";

export default function TableV0({ data, config, keyFn }) {
    const renderedHeaders = config.map((column) => {
        if (column.sortValue) {
            return <th key={column.label}>{column.header}</th>
        }
        return <th key={column.label}>{column.label}</th>
    })
    const renderedRows = data.map((rowData) => {
        const renderedCells = config.map((column, index) => {
            return <td className="p-2" key={column.label}>{column.render(rowData)}</td>
        })
        return (
            <tr className="border-b" key={keyFn(rowData)}>
                {renderedCells}
            </tr>
        )
    })
    return (
        <table className="table-auto border-spacing-2">
            <thead>
                <tr className="border-b-2">
                    {renderedHeaders}

                </tr>
            </thead>
            <tbody>
                {renderedRows}
            </tbody>
        </table>
    )
}
