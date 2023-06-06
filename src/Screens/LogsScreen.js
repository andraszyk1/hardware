import React,{ useEffect }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

import { fetchLogs, filterRun, filtersClear, sortLogs } from "../store";
import useThunk from "../Hooks/useThunk";
import { TableCustom, RotateThing } from "../Components";
export default function LogsScreen() {
    const { filters, filteredData, sortField, sortOrder } = useSelector(state => state.logs);
    const [doFetchLogs, isLoadingLogs, isErrorLogs] = useThunk(fetchLogs);

    const dispatch = useDispatch();
    useEffect(() => {
        doFetchLogs()
    }, [dispatch, filters])
    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        dispatch(filterRun({ ...filters, [name]: value }))
    }
    const handleSort = (sortField, sortOrder) => {
        console.log(sortOrder, sortField);
        dispatch(sortLogs({ sortField, sortOrder }));
        return;
    }

    let content, contentFilters;
    if (isLoadingLogs) {
        content = <RotateThing/>
    }
    else if (isErrorLogs) {
        content = <div>Error...</div>
    } else {
        const columns = [
            { label: "Id", accessor: "id", sortable: false },
            { label: "Tablea", accessor: "tabela", sortable: true },
            { label: "Id tabeli", accessor: "id_tabeli", sortable: true },
            { label: "Akcja", accessor: "akcja", sortable: true },
            { label: "Co", accessor: "co", sortable: true },
            { label: "Kto", accessor: "kto", sortable: true },
            { label: "Czas", accessor: "czas", sortable: true },
        ]
        content =
            <TableCustom data={filteredData} columns={columns} sortOrder={sortOrder}
                sortField={sortField} handleSort={handleSort}
            />
    }
    const tabele = filteredData.map(data => data.tabela)
    let unikalne_tabele = [...new Set(tabele)]
    const akcje = filteredData.map(data => data.akcja)
    let unikalne_akcje = [...new Set(akcje)]
    const ktosie = filteredData.map(data => data.kto)
    let unikalne_ktosie = [...new Set(ktosie)]

    const cosie = filteredData.map(data => data.co)
    let unikalne_cosie = [...new Set(cosie)]
    contentFilters = <>

        <Col>
            <Form.Label>Tabela</Form.Label>
            <Form.Select onChange={handleChange} name="tabela" value={filters.tabela}>
                <option key="k" value="">Wszystkie</option>
                {unikalne_tabele.map((t, i) => {
                    return <option key={i}>{t}</option>
                })}
            </Form.Select>
        </Col>
        <Col>
            <Form.Label>Nazwa</Form.Label>
            <Form.Select onChange={handleChange} name="nazwa" value={filters.nazwa} placeholder="Nazwa">
                <option key="k" value="" selected>Wszystkie</option>
                {unikalne_cosie.map((t, i) => {
                    return <option key={i}>{t}</option>
                })}
            </Form.Select>
        </Col>
        <Col>
            <Form.Label>Akcja</Form.Label>
            <Form.Select onChange={handleChange} name="akcja" value={filters.akcja}>
                <option key="k" value="">Wszystkie</option>
                {unikalne_akcje.map((t, i) => {
                    return <option key={i}>{t}</option>
                })}
            </Form.Select>
        </Col>
        <Col>
            <Form.Label>Kto zmieniał</Form.Label>
            <Form.Select onChange={handleChange} name="kto" value={filters.kto}>
                <option key="k" value="">Wszystkie</option>
                {unikalne_ktosie.map((t, i) => {
                    return <option key={i}>{t}</option>
                })}
            </Form.Select>
        </Col>
        <Col>


            <Button onClick={() => dispatch(filtersClear())} variant="dark" size="sm">Czyść filtry</Button>

        </Col>

    </>
    return (
        <Container>

            <Row>

                {contentFilters}
            </Row>
            <Row>
                {content}
            </Row>
        </Container>
    )
}