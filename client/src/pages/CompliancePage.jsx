import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const mockComplianceChecks = [
  { id: 1, transactionId: 2, status: 'Pending', reasons: ['High-value transaction'] },
];

function CompliancePage() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Compliance Checks
      </Typography>
      <List>
        {mockComplianceChecks.map((check) => (
          <ListItem key={check.id}>
            <ListItemText
              primary={`Transaction ID: ${check.transactionId}`}
              secondary={`Status: ${check.status} - Reasons: ${check.reasons.join(', ')}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default CompliancePage;
