// src/components/RideGrid.js
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useAuth } from '../auth/AuthContext';
import { fetchRides } from '../../services/api';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'client_name', headerName: 'Client', width: 150 },
  { field: 'vehicle_no', headerName: 'Vehicle', width: 130 },
  { field: 'driver_id', headerName: 'Driver', width: 130 },
  { field: 'start_time', headerName: 'Start Time', width: 150 },
  { field: 'status', headerName: 'Status', width: 100 },
];

const RideGrid = () => {
  const { user } = useAuth();
  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetchRides()
      .then((data) => setRides(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div
      style={{
        height: 'calc(100vh - 200px)',
        width: '100%',
        maxWidth: 1200,
        margin: 'auto',
      }}
    >
      <h2>Active Rides</h2>
      <DataGrid
        rows={rides}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default RideGrid;