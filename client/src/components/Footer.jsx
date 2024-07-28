import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        Made with love by TwoWaySolutions - 2024
      </Typography>
    </Box>
  );
}

export default Footer;
