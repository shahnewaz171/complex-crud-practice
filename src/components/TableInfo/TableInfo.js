import { Box, Grid, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { FiSearch } from "react-icons/fi";
import './TableInfo.css';
import { GlobalContext } from '../../App';
import useGlobalContext from '../../context/useGlobalContext';

const TableInfo = () => {
    const { columns, rows, isLoading, setRows } = useGlobalContext();
    const [order, setOrder] = useState('');
    const [colValue, setColValue] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const handleSorting = (col, index) => {
        setColValue(index);
        console.log(col)

        if (order === 'asc' || order === '') {
            const sorted = [...rows].sort((a, b) =>
                a[col] > b[col] ? 1 : -1
            );
            setRows(sorted);
            setOrder('dsc');
        }
        else if (order === 'dsc') {
            const sorted = [...rows].sort((a, b) =>
                a[col] < b[col] ? 1 : -1
            );
            setRows(sorted)
            setOrder('asc');
        }
    };

    // console.log(columns)

    return (
        <>
            <Box sx={{ m: 5 }}>
                <Typography component="h3" sx={{ fontWeight: 500, fontSize: '26px', textAlign: 'center', mb: 2 }}>Table List</Typography>
                <Box>
                    {/* Search Items */}
                    <Grid container spacing={3} className="search-inputs" sx={{ mb: 2 }}>
                        <Grid item xs={6} md={5} lg={3}>
                            <Typography variant="p" component="div" className="searchItem-title" >
                                Search by name
                            </Typography>
                            <TextField className="bg-white" onChange={((e) => setSearchValue(e.target.value))} fullWidth sx={{ padding: '1px 1px' }} InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <FiSearch />
                                    </InputAdornment>
                                )
                            }} />
                        </Grid>
                    </Grid>

                    {/* Table List */}
                    <TableContainer component={Paper} className="tableList" elevation={0}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {columns?.map((item, index) => {
                                        const { title, sortable } = item;
                                        const uniqueID = index + 1;

                                        const joinTitle = title.replace(/ /g, "").trim();
                                        // console.log(joinTitle);

                                        if (sortable) {
                                            return (
                                                <TableCell key={uniqueID} onClick={() => handleSorting('submisiondate', index)} align="left" className="pointer">
                                                    {title} {((order === 'asc') && (colValue === index)) ? <TiArrowSortedDown /> : ((order === 'dsc') && (colValue === index)) ? <TiArrowSortedUp /> : ''}
                                                </TableCell>
                                            )
                                        }
                                        else {
                                            return (
                                                <TableCell key={uniqueID} align="left">
                                                    {title}
                                                </TableCell>
                                            )
                                        }

                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows?.map((row, index) => (
                                    <TableRow
                                        key={index + 1}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row?.id}
                                        </TableCell>
                                        <TableCell align="left">{row?.name}</TableCell>
                                        <TableCell align="left">{row?.message}</TableCell>
                                        <TableCell align="left">{row?.created_at}</TableCell>
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