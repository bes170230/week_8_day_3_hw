import React, {useState} from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import { CarForm } from '../../components';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1, minWidth: 130 },
  {
    field: 'name',
    headerName: 'Car',
    width: 150,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'mileage',
    headerName: 'Mileage',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'make',
    headerName: 'Make',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'model',
    headerName: 'Model',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'year',
    headerName: 'Year',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'color',
    headerName: 'Color',
    type: 'number',
    width: 110,
    editable: true,
  },
  
];

interface gridData {
  data: {
    id?:string;
  }
}

export const DataTable = () => {
 let { carData, getData } = useGetData();
 let [open, setOpen] = useState(false);
 let [gridData, setData] = useState<GridSelectionModel>([])

 let handleOpen = () => {
   setOpen(true);
 }

 let handleClose = () => {
  setOpen(false);
}

let deleteData = async () => {
  await serverCalls.delete(`${gridData[0]}`)
  getData();
}

console.log(gridData) // A list of IDs from checked rows

  return (
      <div style={{ height: 400, width: '100%' }}>
          <h2>Cars In Inventory</h2>
        <DataGrid
          rows={carData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={newSelectionModel => setData(newSelectionModel)}
          {...carData}
        />
        <Button onClick={handleOpen} color='primary'>Update</Button>
        <Button onClick={deleteData} color='warning'>Delete</Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
          <DialogTitle id='form-dialog-title'>Update a Car</DialogTitle>
          <DialogContent>
            <DialogContentText>Updating Car ID: {gridData[0]}</DialogContentText>
          <CarForm id={`${gridData[0]}`} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }