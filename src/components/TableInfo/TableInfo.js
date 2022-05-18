import { Box, Grid, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { FiSearch } from "react-icons/fi";
import './TableInfo.css';
import { GlobalContext } from '../../App';
import axios from 'axios';

const TableInfo = () => {
    const [order, setOrder] = useState('');
    const [tableHeads, setTableHeads] = useState([]);
    const [tableRows, setTableRows] = useState([]);
    const [colValue, setColValue] = useState('');
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        axios.get('http://localhost/api/list.php')
            .then(res => {
                if (res.data) {
                    const result = res.data?.data;
                    setTableHeads(result.headers);
                    setTableRows(result.rows);
                }
            })
            .catch(err => {
                console.log(err.response);
            })
    }, []);

    const handleSorting = (col) => {
        setColValue(col);

        if (order === 'asc' || order === '') {
            const sorted = [...tableRows].sort((a, b) =>
                a[col] > b[col] ? 1 : -1
            );
            setTableRows(sorted)
            setOrder('dsc');
        }
        else if (order === 'dsc') {
            const sorted = [...tableRows].sort((a, b) =>
                a[col] < b[col] ? 1 : -1
            );
            setTableRows(sorted)
            setOrder('asc');
        }
    };

    // console.log(tableHeads)
    // console.log(tableRows)

    return (
        <>
            <Box sx={{ m: 5 }}>
                <Typography component="h3" sx={{ fontWeight: 500, fontSize: '26px', textAlign: 'center', mb: 2 }}>Table List</Typography>
                <Box>
                    {/* Search Items */}
                        {tableHeads?.map((item, index) => {
                             const { created_at, id, message, name } = item;
                            console.log(item)
                            return (
                                <Grid  container spacing={3} className="search-inputs" sx={{ mb: 2 }}>
                                    <Grid key={item} item xs={6} md={5} lg={3}>
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
                            )
                        })}

                    {/* Table List */}
                    <TableContainer component={Paper} className="tableList" elevation={0}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {tableHeads?.map((item, index) => {
                                        const { created_at, id, message, name } = item;

                                        return (
                                            <>
                                                {!id?.hidden ?
                                                    id?.sortable ?
                                                    <TableCell onClick={() => handleSorting('id')} align="left" className="pointer">
                                                        {id.title} {((order === 'asc') && (colValue === 'id')) ? <TiArrowSortedDown /> : ((order === 'dsc') && (colValue === 'id')) ? <TiArrowSortedUp /> : ''}
                                                    </TableCell> 
                                                    :
                                                    <TableCell align="left">
                                                        {id.title}
                                                    </TableCell>
                                                    : ''
                                                }
                                                {!name?.hidden ?
                                                    name?.sortable ?
                                                    <TableCell onClick={() => handleSorting('name')} align="left" className="pointer">
                                                        {name.title} {((order === 'asc') && (colValue === 'name')) ? <TiArrowSortedDown /> : ((order === 'dsc') && (colValue === 'name')) ? <TiArrowSortedUp /> : ''}
                                                    </TableCell> 
                                                    :
                                                    <TableCell align="left">
                                                        {name.title}
                                                     </TableCell>
                                                    : ''
                                                }
                                                {!message?.hidden ?
                                                    message?.sortable ?
                                                    <TableCell onClick={() =>  handleSorting('message')} align="left" className="pointer">
                                                        {message.title} {((order === 'asc') && (colValue === 'message')) ? <TiArrowSortedDown /> : ((order === 'dsc') && (colValue === 'message')) ? <TiArrowSortedUp /> : ''}
                                                    </TableCell> 
                                                    :
                                                    <TableCell align="left">
                                                        {message.title}
                                                    </TableCell> 
                                                    : ''
                                                }
                                                {!created_at?.hidden ?
                                                    created_at?.sortable ?
                                                    <TableCell onClick={() => handleSorting('created_at')} align="left" className="pointer">
                                                        {created_at.title} {((order === 'asc') && (colValue === 'created_at')) ? <TiArrowSortedDown /> : ((order === 'dsc') && (colValue === 'created_at')) ? <TiArrowSortedUp /> : ''}
                                                    </TableCell>
                                                    :
                                                    <TableCell align="left">
                                                        {created_at.title}
                                                    </TableCell> 
                                                     : ''
                                                }
                                            </>
                                        )
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableRows?.map((row) => (
                                    <TableRow
                                        key={row.id}
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