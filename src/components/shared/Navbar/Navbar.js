import React, { useState } from 'react';
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';

const pages = [{ id: 1, page: 'All Data', path: '/' }, { id: 2, page: 'Get Form', path: 'create_data' }, { id: 3, page: 'Update Form', path: '/update_form' }];

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (path) => {
        setAnchorElNav(null);
        navigate(path);
    };

    return (
        <AppBar position="static" sx={{ bgcolor: '#fff', boxShadow: 'none', borderBottom: '1px solid #e7e4e4', px: { xs: 0, lg: 5 } }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box onClick={() => navigate('/')} component="img" src="https://inside.xpeedstudio.com/wp-content/uploads/2019/10/logo_v2-185x48.png" sx={{ display: { xs: 'none', lg: 'block', cursor: 'pointer' } }} />

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon sx={{ color: '#000' }} />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((item) => {
                                const { id, page, path } = item;
                                return (
                                    <Link key={id} to={path}>
                                        <MenuItem onClick={handleCloseNavMenu} sx={{ color: '#000' }}>
                                            <Typography textAlign="center">{page}</Typography>
                                        </MenuItem>
                                    </Link>
                                )
                            })}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 3 }}>
                    {pages.map((item) => {
                                const { id, page, path } = item;
                                return (
                                    <Button
                                    key={id}
                                    onClick={() => handleCloseNavMenu(path)}
                                    sx={{ my: 2, color: '#2a2929', display: 'block', mx: 1, textTransform: 'none', fontSize: '15px' }}
                                >
                                    {page}
                                </Button>
                                )
                            })}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
