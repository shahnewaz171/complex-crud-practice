import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import Logo from '../../../images/404.png';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate(-1);
        }, 3000)
    }, [navigate]);

    return (
        <>
            <Box sx={{
                bgcolor: "#fff",
                borderRadius: "5px",
                minHeight: "80vh"
            }}>
                <Box sx={{
                    height: "60vh",
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <Box
                        component='img'
                        src={Logo}
                        sx={{ height: 1 }}
                    />
                </Box>
                    <Typography variant='h5' component='h5' sx={{ fontWeight: "bold", textAlign: "center", my: 2 }}>
                        Page not found!
                    </Typography>
            </Box>
        </>
    );
};

export default NotFound;