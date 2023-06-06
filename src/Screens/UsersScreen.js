import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Alert } from 'react-bootstrap';
import { MdAdd } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux'
import { fetchComputers, fetchUsers, searchUser, getDataComputerByUserId, getDataUserById, deleteUser, sortUsers } from '../store'
import useThunk from '../Hooks/useThunk';
import { TableCustom, RotateThing, UserFormEdit, UserFormAdd, UserInventoryShowModal } from '../Components';

export default function UsersScreen() {
  const [doFetchUsers, isLoadingUsers, isErrorUsers] = useThunk(fetchUsers);
  const [showUserAddModal, setUserAddModal] = useState(false);
  const [showUserEditModal, setUserEditModal] = useState(false);
  const [showInventoryShowModal, setShowInventoryShowModal] = useState(false);
  const { dataUsers, dataUser, search, sortField, sortOrder } = useSelector((state) => { return state.users });
  const { dataComputerByUserId } = useSelector((state) => { return state.computers });
  const dispatch = useDispatch();

  useEffect(() => {
    doFetchUsers()
  }, [dispatch, search])
  useEffect(() => {
    dispatch(fetchComputers())
  }, [dispatch])
  const handleComputerAdd = () => {
    setUserAddModal(true);

  }
  const handleCloseAddModal = () => {
    setUserAddModal(false);
  }
  const handleCloseEditModal = () => {
    setUserEditModal(false);
  }
  const handleCloseInventoryShowModal = () => {
    setShowInventoryShowModal(false)
  }
  const handleDelete = (item) => {
    alert("Czy napewno chcesz usunąć ten komputer ?")
    dispatch(deleteUser(parseInt(item.id)))

  }
  const handleEdit = (item) => {
    dispatch(getDataUserById(parseInt(item.id)))
    setUserEditModal(true);

  }
  const handlePodglad = (item) => {
    dispatch(getDataComputerByUserId(parseInt(item.id)))
    setShowInventoryShowModal(true)
  }
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    dispatch(searchUser(e.target.value))
    return;
  }
  const handleSort = (sortField, sortOrder) => {
    console.log(sortOrder, sortField)
    dispatch(sortUsers({ sortField, sortOrder }))
    return;
  }

  let content;
  if (isLoadingUsers) {
     content = <RotateThing/>
  } else if (isErrorUsers) {
    content = <Alert variant='danger'>Błąd podczas pobierania użytkowników</Alert>
  }
  else {
    const columns = [
      { label: "Id", accessor: "id", sortable: false },
      { label: "Name", accessor: "name", sortable: true },
      { label: "Login", accessor: "login", sortable: true },
      { label: "Rcp", accessor: "rcp", sortable: true },
      { label: "Dział", accessor: "dzial", sortable: true },
      { label: "Email", accessor: "email", sortable: true },
      { label: "Dodał", accessor: "owner", sortable: true },
      { label: "Data utworzenie", accessor: "created_at", sortable: true },
      { label: "Data aktualizacji", accessor: "updated_at", sortable: true },
      { label: "Akcje", accessor: "akcje", sortable: false }
    ]
    content =
      <TableCustom data={dataUsers} columns={columns} sortField={sortField} sortOrder={sortOrder} handleSort={handleSort} deleteRow={handleDelete} editRow={handleEdit} podgladRow={handlePodglad} />
  }
  return (
    <>
      {showUserAddModal && <UserFormAdd user={dataUser ? dataUser : {}} show={showUserAddModal} close={handleCloseAddModal} />}
      {showUserEditModal && <UserFormEdit user={dataUser ? dataUser : {}} show={showUserEditModal} close={handleCloseEditModal} />}
      {showInventoryShowModal && <UserInventoryShowModal userComputer={dataComputerByUserId ? dataComputerByUserId : {}} show={showInventoryShowModal} close={handleCloseInventoryShowModal} />}
      <Button variant='light' onClick={handleComputerAdd}><MdAdd />Dodaj Użytkownika</Button>

      <Container className='p-2'>

        <Form onSubmit={(e) => { e.preventDefault() }}>
          <Form.Control name="search" value={search} placeholder='Szukaj ...' onChange={handleSearch}></Form.Control></Form>
        {content}
      </Container>
    </>
  )
}

