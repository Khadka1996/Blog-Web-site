'use client'
import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Grid, IconButton, InputAdornment, Checkbox, FormControlLabel } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    showPassword: false,
    acceptTerms: false,
  });

  const handleChange = (e) => {
    if (e && e.target) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleTogglePassword = () => {
    setFormData((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, textAlign: "center", mt: 5 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            name="username"
            value={formData.username}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            name="password"
            type={formData.showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword}>
                    {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={<Checkbox name="acceptTerms" checked={formData.acceptTerms} onChange={(e) => setFormData((prev) => ({ ...prev, acceptTerms: e.target.checked }))} />}
            label="I accept the Terms and Conditions"
            sx={{ mb: 2, display: "block" }}
          />
          <Button 
  type="submit" 
  variant="contained" 
  fullWidth 
  sx={{ 
    mb: 2, 
    backgroundColor: '#52aa4d', 
    '&:hover': { 
      backgroundColor: '#499740' 
    }
  }}
>
  Login
</Button>

        </form>
        <Typography variant="body2">
          Already have an account? <a href="/login">Login here</a>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
