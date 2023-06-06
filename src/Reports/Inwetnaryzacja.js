import { saveAs } from "file-saver";
import React from "react";
import * as XLSX from "xlsx";
import { Button } from "react-bootstrap";
export const Inwentaryzacja=({ apiData, fileName })=> {
    const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, fileName + fileExtension);
  };

  return (
    <Button variant="light" size="sm" onClick={(e) => exportToCSV(apiData, fileName)}>Export xlsx</Button>
  );
}