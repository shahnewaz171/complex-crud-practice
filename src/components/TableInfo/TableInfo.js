/* eslint-disable array-callback-return */
import React from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import useGlobalContext from '../../context/useGlobalContext';
import { useFilters, useSortBy, useTable } from 'react-table/dist/react-table.development';
import './TableInfo.css';
import { useNavigate } from 'react-router-dom';

const TableInfo = () => {
    const { columns, rowsData, isLoading, setRowsData } = useGlobalContext();
    const data = rowsData;
    const navigate = useNavigate();

    const tableInstance = useTable({
        columns,
        data
    }, useFilters, useSortBy);

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
                    {/* Table List */}
                    <TableContainer {...getTableProps()} component={Paper} className="tableList" elevation={0}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                {headerGroups.map((headerGroup) => (
                                    <TableRow {...headerGroup.getHeaderGroupProps()} align="center">
                                        {headerGroup.headers.map(col => {
                                            const { sortable, hidden, searchable } = col;

                                            if (!hidden) {
                                                return (
                                                    sortable ?
                                                        <TableCell {...col.getHeaderProps(col.getSortByToggleProps())} align="center">
                                                            <Box className="col-title">
                                                                {col.render("title")}
                                                                <Typography component="span">
                                                                    {col.isSorted ? (col.isSortedDesc ? <TiArrowSortedDown /> : <TiArrowSortedUp />) : ''}
                                                                </Typography>
                                                            </Box>
                                                            {searchable ?
                                                                <Box>
                                                                    {col.canFilter ? col.render("Filter") : null}
                                                                </Box> : ''
                                                            }
                                                        </TableCell>
                                                        :
                                                        <TableCell {...col.getHeaderProps()} align="center">
                                                            <Box className="col-title">
                                                                {col.render("title")}
                                                                {col.isSorted ? (col.isSortedDesc ? <TiArrowSortedDown /> : <TiArrowSortedUp />) : ''}
                                                            </Box>
                                                            {searchable ?
                                                                <Box>
                                                                    {col.canFilter ? col.render("Filter") : null}
                                                                </Box> : ''
                                                            }
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
                                                const { column, row } = cell;

                                                return (
                                                    <TableCell {...cell.getCellProps()} align="center">
                                                        {column.id === 'id' ?
                                                            (<Typography onClick={() => navigate(`create_data/${row.original?.id}`)} component="span" sx={{ color: 'green', cursor: 'pointer', textDecoration: 'underline' }}>{cell.render("Cell")}</Typography>)
                                                            :
                                                            (cell.render("Cell"))
                                                        }
                                                    </TableCell>
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