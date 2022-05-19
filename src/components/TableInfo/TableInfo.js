/* eslint-disable array-callback-return */
import { Box, Grid, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { FiSearch } from "react-icons/fi";
import './TableInfo.css';
import { GlobalContext } from '../../App';
import useGlobalContext from '../../context/useGlobalContext';
import { useSortBy, useTable } from 'react-table/dist/react-table.development';

const TableInfo = () => {
    const { columns, rowsData, isLoading, setRowsData } = useGlobalContext();
    const [searchValue, setSearchValue] = useState('');
    const data = rowsData;

    const tableInstance = useTable({
        columns,
        data
    }, useSortBy);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

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
                    <TableContainer {...getTableProps()} component={Paper} className="tableList" elevation={0}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                {headerGroups.map((headerGroup) => (
                                    <TableRow {...headerGroup.getHeaderGroupProps()} align="left">
                                        {headerGroup.headers.map(col => {
                                            const { sortable, hidden } = col;
                                            console.log(col)
                                            if (!hidden) {
                                                return (
                                                    sortable ?
                                                        <TableCell {...col.getHeaderProps(col.getSortByToggleProps())} align="left">
                                                            {col.render("title")}
                                                            {col.isSorted ? (col.isSortedDesc ? <TiArrowSortedDown /> : <TiArrowSortedUp />) : ''}
                                                        </TableCell>
                                                        :
                                                        <TableCell {...col.getHeaderProps()} align="left">
                                                            {col.render("title")}
                                                            {col.isSorted ? (col.isSortedDesc ? <TiArrowSortedDown /> : <TiArrowSortedUp />) : ''}
                                                        </TableCell>
                                                )
                                            }
                                        })}
                                    </TableRow>
                                ))}
                            </TableHead>
                            <TableBody {...getTableBodyProps()}>
                                {rows?.map((row, index) => {
                                    prepareRow(row);
                                    return (
                                        < TableRow {...row.getRowProps()}>
                                            {row.cells?.map((cell) => {
                                                return (
                                                    <TableCell {...cell.getCellProps()} align="left">{cell.render("Cell")}</TableCell>
                                                )
                                            })}
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </>
    );
};

export default TableInfo;