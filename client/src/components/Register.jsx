import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '', email: '', password: '', passwordConfirmation: '', name: '', lastName: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/users/api/v1/signup', formData);
            localStorage.setItem('token', response.data.token);
            setErrorMessage('');
            navigate('/transactions')
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage(error.response.data.message);
            } else {
                console.error('Error registering', error);
            }
        }
    };

    return (
        <Container>
            <Typography variant="h4">Register</Typography>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField label="Username" name="username" value={formData.username} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Confirm Password" name="passwordConfirmation" type="password" value={formData.passwordConfirmation} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="First Name" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth margin="normal" />
                <Button type="submit" variant="contained" color="primary">Register</Button>
            </form>
        </Container>
    );
};

export default Register;