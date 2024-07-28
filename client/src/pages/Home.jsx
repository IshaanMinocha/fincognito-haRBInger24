import React from 'react';
import { Container, Typography } from '@mui/material';

function Home() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to the CBDC Solution
      </Typography>
      <Typography variant="body1">
        This is a project to ensure transaction anonymity in token-based CBDC transactions while maintaining financial system integrity and compliance with AML, CFT, and fraudulent mitigation compliances.
      </Typography>
    </Container>
  );
}

export default Home;
