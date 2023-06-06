import { configureStore } from '@reduxjs/toolkit';
import { computersReducer, getDataComputersCount, getDataComputerByUserId, selectAllComputers, searchComputer, getDataComputerById, sortComputers, closeToast } from './slices/computersSlice';
import { systemsReducer, getFirstDataSystem } from './slices/systemsSlice';
import { logsReducer, filterRun, filtersClear, sortLogs, setPaginateSlice } from './slices/logsSlice';
import { usersReducer, getDataUserById, searchUser, sortUsers } from './slices/usersSlice';
import { customTableReducer, setTableRowsPerPage } from './slices/customTableSlice';

const store = configureStore({
  reducer: {
    computers: computersReducer,
    systems: systemsReducer,
    users: usersReducer,
    logs: logsReducer,
    customTable: customTableReducer
  }
})

export default store;
export * from './thunks/fetchComputers'
export * from './thunks/fetchSystems'
export * from './thunks/fetchUsers'
export * from './thunks/addUser'
export * from './thunks/deleteUser'
export * from './thunks/updateUser'
export * from './thunks/addComputer'
export * from './thunks/deleteComputer'
export * from './thunks/updateComputer'
export * from './thunks/fetchLogs'
export {
  getDataComputersCount, getFirstDataSystem, getDataComputerByUserId, closeToast,
  selectAllComputers, getDataUserById, searchUser, searchComputer, getDataComputerById, sortComputers, filterRun, filtersClear, sortUsers, sortLogs, setPaginateSlice,setTableRowsPerPage
};
