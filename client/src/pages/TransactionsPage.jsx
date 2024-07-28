import React from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const mockTransactions = [
  { id: 1, sender: 'Alice', receiver: 'Bob', amount: 500, timestamp: '2024-07-24', compliant: true },
  { id: 2, sender: 'Charlie', receiver: 'Dave', amount: 1500, timestamp: '2024-07-23', compliant: false },
];

function TransactionsPage() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Transactions
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Sender</TableCell>
              <TableCell>Receiver</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Compliant</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.sender}</TableCell>
                <TableCell>{transaction.receiver}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.timestamp}</TableCell>
                <TableCell>{transaction.compliant ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default TransactionsPage;
