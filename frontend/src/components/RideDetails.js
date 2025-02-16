// src/components/RideDetails.js
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useAuth } from '../auth/AuthContext';
import { fetchRideDetails } from '../../services/api';

const RideDetails = ({ rideId }) => {
  const { user } = useAuth();
  const [ride, setRide] = useState(null);

  useEffect(() => {
    fetchRideDetails(rideId)
      .then((data) => setRide(data))
      .catch((error) => console.error(error));
  }, [rideId]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Ride Details
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Client Name: {ride?.client_name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Vehicle: {ride?.vehicle_no}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Driver: {ride?.driver_id}
        </Typography>
        <Button variant="contained" color="primary">
          Edit
        </Button>
      </CardContent>
    </Card>
  );
};

export default RideDetails;