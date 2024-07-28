import React from 'react';
import { Container, Typography } from '@mui/material';

function About() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        About
      </Typography>
      <Typography variant="body1">
        This project was developed by TwoWaySolutions for the HaRBInger hackathon 2024. It aims to balance privacy and regulatory requirements in the context of Central Bank Digital Currencies (CBDCs).
      </Typography>
    </Container>
  );
}

export default About;
