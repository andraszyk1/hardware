import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Pagination, Form, Row, Col } from "react-bootstrap";
import { setTableRowsPerPage } from "../store"
import { TableHeader, TableBody } from "../Components";
import { Inwentaryzacja } from "../Reports/Inwetnaryzacja";

export default function TableCustom({
    data, columns, sortField, sortOrder, handleSort, deleteRow, editRow, podgladRow,isLoading
/* rowsPerPage,handleSetRowsPerPage*/ }) {
    const dispatch = useDispatch();
    const { rowsPerPage } = useSelector((state) => { return state.customTable });
    const localDate = new Date().toLocaleDateString('en-GB');
    const fileName = "Raport_" + localDate;
    const [currentPage, setCurrentPage] = useState(0);
    const [countPages, setCountPages] = useState(Math.ceil(data.length / rowsPerPage));
    const [sliceData, setSliceData] = useState([]);
    const [showMore, setShowMore] = useState(0);
    const [range] = useState(parseInt(4));

    useEffect(() => {
        // console.log('useEffect')
        if
            (currentPage === 0) setSliceData(data.slice(0, rowsPerPage))
        else
            setSliceData(data.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage))
    },
        [currentPage, rowsPerPage, sortField, sortOrder, showMore])

    const handleChangeCurrentPage = (page) => {
        console.log(page)
        setCurrentPage(page);
    }
    const handleChangeRowsPerPage = (e) => {
        const newRowsPerPage = parseInt(e.target.value);
        const newCountPages = Math.ceil(data.length / newRowsPerPage);
        e.preventDefault();
        dispatch(setTableRowsPerPage(newRowsPerPage));
        if (newCountPages < countPages) {
            setCurrentPage(0);
        }
        setCountPages(newCountPages);
    }
    const handlePrev = () => {
        if (currentPage > range)
            setCurrentPage(currentPage - 1);
    }

    const itemsPagination = Array(countPages).fill("").map((_, i) => {
        return <Pagination.Item style={{ color: "green" }} key={i}
            active={i === currentPage} onClick={() => { handleChangeCurrentPage(i) }}>
            {i + 1}</Pagination.Item>
    });
    return (<>
        {/* {console.log(currentPage,rowsPerPage,countPages,sliceData)} */}
        <Table responsive striped bordered hover size="sm">
            <TableHeader columns={columns} sortField={sortField} sortOrder={sortOrder} handleSorting={handleSort} isLoading={isLoading} />
            <TableBody columns={columns} tableData={sliceData}
                podgladRow={podgladRow}
                editRow={editRow}
                deleteRow={deleteRow}
                isLoading={isLoading}
            />
        </Table>
        <Row>
            <Col sm={1}>
                <Form.Select size="sm" aria-label="Default select example" onChange={handleChangeRowsPerPage} >
                    <option value="" disabled>Ilość</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </Form.Select>
            </Col>
            <Col>
                <Pagination style={{ font: "black" }} size="sm">
                    <Pagination.First onClick={() => setCurrentPage(0)} />
                    <Pagination.Prev onClick={() => handlePrev()} />
                    <Pagination.Ellipsis onClick={showMore >= range ? () => setShowMore(s => s -= range) : null} />
                    {itemsPagination.slice(showMore, showMore + range)}
                    <Pagination.Ellipsis onClick={showMore < (countPages - range) ? () => setShowMore(s => s += range) : null} />
                    <Pagination.Next onClick={currentPage < countPages - 1 ? () => setCurrentPage(currentPage + 1) : null} />
                    <Pagination.Last onClick={() => setCurrentPage(countPages - 1)} />
                </Pagination>
            </Col>
            <Col sm={1}>
                <Inwentaryzacja apiData={data} fileName={fileName} />
            </Col>
        </Row>
    </>
    )
}
