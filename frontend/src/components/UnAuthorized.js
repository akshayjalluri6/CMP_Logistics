// src/components/Unauthorized.js
import { Typography, Box } from '@mui/material';

const Unauthorized = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '80vh',
    }}
  >
    <Typography variant="h4" color="error">
      Unauthorized Access
    </Typography>
  </Box>
);

export default Unauthorized;