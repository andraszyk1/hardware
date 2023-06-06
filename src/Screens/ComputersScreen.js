import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Container, Form } from 'react-bootstrap';
import { MdAdd } from 'react-icons/md';
import { fetchComputers, deleteComputer, searchComputer, sortComputers, updateComputer, addComputer, closeToast } from '../store';
import useThunk from '../Hooks/useThunk';
import { ProtokolKomputer } from '../Reports/ProtokolKomputer';
import { TableCustom, CustomToast, ComputerFormEdit, ComputerFormAdd, RotateThing} from '../Components';
export default function ComputersScreen() {
    const [doFetchComputers, isLoadingComputers, isErrorComputers] = useThunk(fetchComputers);
    const [doUpdateComputer, isLoadingUpdateComputer, isErrorUpdaterComputer] = useThunk(updateComputer);
    const [doAddComputer, isLoadingAddComputer, isErrorAddComputer] = useThunk(addComputer);
    const [doDeleteComputer, isLoadingDeleteComputer, isErrorDeleteComputer] = useThunk(deleteComputer);
    const [showComputerAddModal, setComputerAddModal] = useState(false);
    const [showComputerEditModal, setComputerEditModal] = useState(false);
    const [computer, setComputer] = useState();
    const { dataComputers, search, sortField, sortOrder, showToast, msgToast } = useSelector((state) => { return state.computers });

    const dispatch = useDispatch();
    useEffect(() => {
        doFetchComputers();
    }, [dispatch, search])

    const handleComputerAdd = () => {
        setComputerAddModal(true);
    }

    const handleCloseAddModal = () => {
        setComputerAddModal(false);
    }
    const handleCloseEditModal = () => {
        setComputerEditModal(false);
    }
    const handleDelete = (item) => {
        console.log(item)
        doDeleteComputer(item);
    }
    const handleEdit = (item) => {
        setComputerEditModal(true);
        setComputer(item)
    }
    const handleSearch = (e) => {
        dispatch(searchComputer(e.target.value))
        return;
    }
    const handleSort = (sortField, sortOrder) => {
        console.log(sortOrder, sortField)
        dispatch(sortComputers({ sortField, sortOrder }))
        return;
    }

    const handleEditSubmit = (item) => {
        doUpdateComputer(item);
    }
    const handleAddSubmit = (item) => {
        doAddComputer(item);
    }
    const handleCloseToast = () => {
        dispatch(closeToast());
    }

    let content;
    if (isLoadingComputers || isLoadingUpdateComputer || isLoadingAddComputer || isLoadingDeleteComputer) {
        content = <RotateThing/>
    }
    else if (isErrorComputers || isErrorUpdaterComputer || isErrorAddComputer || isErrorDeleteComputer) {
        content = <div>Error...</div>
    } else {
        const columns = [
            { label: "Id", accessor: "computer_id", sortable: false },
            { label: "Name", accessor: "computerName", sortable: true },
            { label: "Login", accessor: "userName", sortable: true },
            { label: "Typ", accessor: "typ", sortable: true },
            { label: "SN", accessor: "sn", sortable: true },
            { label: "System", accessor: "systemName", sortable: true },
            { label: "Dodał", accessor: "owner", sortable: true },
            { label: "Aplikacje", accessor: "aplications", sortable: false },
            { label: "Data utworzenie", accessor: "created_at", sortable: true },
            { label: "Data aktualizacji", accessor: "updated_at", sortable: true },
            { label: "Akcje", accessor: "akcje", sortable: false }
        ]
        content =
            <TableCustom data={dataComputers} columns={columns} sortField={sortField} sortOrder={sortOrder} handleSort={handleSort} deleteRow={handleDelete} editRow={handleEdit} podgladRow={ProtokolKomputer}/>
    }

    return (
        <>
            {showToast && <CustomToast showToast={showToast} msg={msgToast} closeToast={handleCloseToast} />}
            {showComputerAddModal && <ComputerFormAdd show={showComputerAddModal} close={handleCloseAddModal} handleAddSubmit={handleAddSubmit} />}
            {showComputerEditModal && <ComputerFormEdit computer={computer} show={showComputerEditModal} close={handleCloseEditModal} handleEditSubmit={handleEditSubmit} />}

            <Button variant='light' onClick={handleComputerAdd}><MdAdd />Dodaj Sprzęt</Button>

            <Container className='p-2'>
                <Form onSubmit={(e) => { e.preventDefault() }}>
                    <Form.Control name="search" value={search} placeholder='Szukaj ...' onChange={handleSearch}></Form.Control></Form>
                {content}
            </Container>
        </>
    )
}

