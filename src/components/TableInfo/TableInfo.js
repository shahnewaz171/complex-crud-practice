import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import './TableInfo.css';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const TableInfo = () => {
    const [data, setData] = useState(rows);
    const [order, setOrder] = useState('');

    const handleSorting = (col) => {
        if(order === 'asc' || order === ''){
            const sorted = [...data].sort((a, b) => 
                a[col] > b[col]  ? 1 : -1
            );
            setData(sorted)
            setOrder('dsc');
            // console.log(col);
            console.log(sorted)
        }
        else if(order === 'dsc'){
            const sorted = [...data].sort((a, b) => 
                a[col] <  b[col]  ? 1 : -1
            );
            setData(sorted)
            setOrder('asc');
            // console.log(col);
            console.log(sorted);
        }
    }

    return (
        <>
            <Box sx={{ m: 5 }}>
                <Typography component="h3" sx={{ fontWeight: 500, fontSize: '26px', textAlign: 'center' , mb: 2}}>Table List</Typography>
                <Box>
                    <TableContainer component={Paper} className="tableList" elevation={0}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow >
                                    <TableCell onClick={() => handleSorting('name')} className="pointer">
                                        Dessert (100g serving) {order === 'asc' ? <TiArrowSortedDown /> : order === 'dsc' ? <TiArrowSortedUp /> : ''}
                                    </TableCell>
                                    <TableCell onClick={() => handleSorting('calories')} align="left" >Calories</TableCell>
                                    <TableCell onClick={() => handleSorting('fat')} align="left">Fat&nbsp;(g)</TableCell>
                                    <TableCell onClick={() => handleSorting('carbs')} align="left">Carbs&nbsp;(g)</TableCell>
                                    <TableCell onClick={() => handleSorting('protein')} align="left">Protein&nbsp;(g)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.map((row) => (
                                    <TableRow
                                        key={row.name}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">{row.calories}</TableCell>
                                        <TableCell align="left">{row.fat}</TableCell>
                                        <TableCell align="left">{row.carbs}</TableCell>
                                        <TableCell align="left">{row.protein}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </>
    );
};

export default TableInfo;