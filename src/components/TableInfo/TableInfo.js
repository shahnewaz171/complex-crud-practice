/* eslint-disable array-callback-return */
import React from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import useGlobalContext from '../../context/useGlobalContext';
import { useFilters, useSortBy, useTable } from 'react-table/dist/react-table.development';
import './TableInfo.css';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

const TableInfo = () => {
    const { columns, rowsData, isLoading, setRowsData, alertMessage } = useGlobalContext();
    const data = rowsData;
    const navigate = useNavigate();

    const reorderData = (startIndex, endIndex) => {
        const newData = [...data];
        const [movedRow] = newData.splice(startIndex, 1);
        newData.splice(endIndex, 0, movedRow);
        setRowsData(newData);

        axios.post('http://localhost/api/reorder.php')
            .then(res => {
                const { messages, status } = res.data;
                status === 'success' ?
                    alertMessage(messages?.join(', '), true)
                    :    
                    alertMessage(messages?.join(', '), false);
            })
            .catch((err) => {
                alertMessage('Something went wrong! Please try again later.', false);
            })
    };

    const handleDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;
        reorderData(source.index, destination.index);
    }


    const tableInstance = useTable({
        columns,
        data,
        reorderData
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
                <Typography component="h3" sx={{ fontWeight: 500, fontSize: '26px', textAlign: 'center', mb: 4 }}>Table List</Typography>
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
                                                                <Typography component="span" sx={{ fontSize: '18px', fontWeight: 500 }}>
                                                                    {col.render("title")}
                                                                </Typography>
                                                                <Typography component="span" className="arrow-icons" sx={{ ml: 1, mt: '5px' }}>
                                                                    {col.isSorted ?
                                                                        (col.isSortedDesc ? <TiArrowSortedDown /> : <TiArrowSortedUp />) : ''}
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
                                                            <Typography component="span" sx={{ fontSize: '18px', fontWeight: 500 }}>
                                                                {col.render("title")}
                                                            </Typography>
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
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId="table-body">
                                    {(provided, snapshot) => (
                                        <TableBody  {...getTableBodyProps()} ref={provided.innerRef} {...provided.droppableProps} >
                                            {rows?.map((row) => {
                                                prepareRow(row);

                                                return (
                                                    <Draggable
                                                        draggableId={row.original?.id.toString()}
                                                        key={row.original.id}
                                                        index={row.index}
                                                    >
                                                        {(provided, snapshot) => (
                                                            < TableRow
                                                                {...row.getRowProps()}
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                sx={{ backgroundColor: snapshot.isDragging ? "#182f591f" : '' }}
                                                            >
                                                                {row.cells?.map((cell) => {
                                                                    const { column, row } = cell;

                                                                    return (
                                                                        <TableCell {...cell.getCellProps()} align="center">
                                                                            {column.id === 'id' ?
                                                                                (<Typography onClick={() => navigate(`create_data/${row.original?.id}`)} component="span" sx={{ color: '#0969da', cursor: 'pointer', textDecoration: 'underline' }}>{cell.render("Cell")}</Typography>)
                                                                                :
                                                                                (cell.render("Cell"))
                                                                            }
                                                                        </TableCell>
                                                                    )
                                                                })}
                                                            </TableRow>
                                                        )}
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </TableBody>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
            <ToastContainer />
        </>
    );
};

export default TableInfo;