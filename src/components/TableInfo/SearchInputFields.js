import React from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { FiSearch } from "react-icons/fi";

const SearchInputFields = ({ column }) => {
    const { filterValue, setFilter } = column;

    return (
        <Box>
            <TextField className="bg-white" value={filterValue || ''} onChange={((e) => setFilter(e.target.value))} fullWidth InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <FiSearch />
                    </InputAdornment>
                )
            }} />
        </Box>
    );
};

export default SearchInputFields;