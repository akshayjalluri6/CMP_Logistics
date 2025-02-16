// src/components/AddForm.js
import { TextField, Button, Box } from '@mui/material';
import { useAuth } from '../auth/AuthContext';
import { useState } from 'react';
import { createRide } from '../../services/api';

const AddForm = ({ onClose }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    client_name: '',
    duration: 0,
    vehicle_no: '',
    driver_id: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRide(formData);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 3,
      }}
    >
      <TextField
        label="Client Name"
        value={formData.client_name}
        onChange={(e) =>
          setFormData({ ...formData, client_name: e.target.value })
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Duration"
        value={formData.duration}
        onChange={(e) =>
          setFormData({ ...formData, duration: e.target.value })
        }
        fullWidth
        margin="normal"
      />
      {/* Add other fields */}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{ mt: 2 }}
      >
        Add Ride
      </Button>
      <Button variant="outlined" onClick={onClose} sx={{ mt: 1 }}>
        Cancel
      </Button>
    </Box>
  );
};

export default AddForm;