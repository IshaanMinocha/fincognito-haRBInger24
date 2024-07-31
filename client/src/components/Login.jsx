import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/users/api/v1/login', { emailOrUsername, password });
            const {token} = response.data;
            localStorage.setItem('token', token);
            navigate('/transactions')
        } catch (error) {
            console.error('Error logging in', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4">Login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField label="Email or Username" value={emailOrUsername} onChange={(e) => setEmailOrUsername(e.target.value)} fullWidth margin="normal" />
                <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" />
                <Button type="submit" variant="contained" color="primary">Login</Button>
            </form>
        </Container>
    );
};

export default Login;
