import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, TextField, Typography } from '@mui/material';
import { jwtDecode } from "jwt-decode";

const Transaction = ({ token }) => {
  const [amount, setAmount] = useState('');
  const [receiverId, setReceiverId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const token = localStorage.getItem('token')
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      await axios.post('http://localhost:3000/transaction-old/transaction', { senderId: userId, receiverId, amount }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Transaction successful');
    } catch (error) {
      console.error('Error making transaction', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Make a Transaction</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Wallet Address" value={receiverId} onChange={(e) => setReceiverId(e.target.value)} fullWidth margin="normal" />
        <TextField label="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} fullWidth margin="normal" />
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
    </Container>
  );
};

export default Transaction;
