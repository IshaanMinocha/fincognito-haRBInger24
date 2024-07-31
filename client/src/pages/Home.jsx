import React from 'react';
import { Container, Typography } from '@mui/material';
import Cards from '../components/Cards'
function Home() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to the CBDC Solution
      </Typography>
      <Typography variant="body1">
        This is a project to ensure transaction anonymity in token-based CBDC transactions while maintaining financial system integrity and compliance with AML, CFT, and fraudulent mitigation compliances.
      </Typography>
      <Cards/>
    </Container>
  );
}

export default Home;
