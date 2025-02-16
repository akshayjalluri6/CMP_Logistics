// src/components/Dashboard.js
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import RideGrid from './RideGrid';
import AddForm from './AddForm';

const Dashboard = () => {
  return (
    <Box
      sx={{
        padding: '20px',
        maxWidth: 1200,
        margin: 'auto',
      }}
    >
      <Card
        variant="outlined"
        sx={{ mb: 3, py: 2, display: 'flex', justifyContent: 'space-between' }}
      >
        <CardContent>
          <Typography variant="h6">Active Rides</Typography>
          <Box sx={{ mt: 1 }}>
            <Button variant="contained" color="primary" sx={{ mr: 1 }}>
              Add Ride
            </Button>
            <Button variant="contained" color="secondary">
              Add Vehicle
            </Button>
          </Box>
        </CardContent>
      </Card>
      <RideGrid />
    </Box>
  );
};

export default Dashboard;