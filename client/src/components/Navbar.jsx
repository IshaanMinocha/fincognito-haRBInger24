import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

function Navbar() {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Transactions', path: '/transactions' },
    { text: 'Compliance', path: '/compliance' },
    { text: 'About', path: '/about' },
    { text: 'Transfer Money', path: '/transact' },
    { text: 'Login', path: '/login' },
    { text: 'Register', path: '/register' },
  ];

  const drawerList = (
    <Box onClick={handleDrawerToggle} sx={{ width: 250 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CBDC Solution
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          {menuItems.map((item) => (
            <Button
              key={item.text}
              color="inherit"
              component={Link}
              to={item.path}
            >
              {item.text}
            </Button>
          ))}
        </Box>
      </Toolbar>
      <Drawer
        anchor="left"
        open={open}
        onClose={handleDrawerToggle}
        sx={{ display: { md: 'none' } }}
      >
        {drawerList}
      </Drawer>
    </AppBar>
  );
}

export default Navbar;