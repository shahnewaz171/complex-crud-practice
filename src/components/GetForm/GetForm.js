import React, { useState } from 'react';
import { Box, Button, FormControl, FormHelperText, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import './GetForm.css';

const GetForm = () => {
    const [disable, setDisable] = useState(false);
    const [value, setValue] = React.useState('false');
    const { register, handleSubmit, reset, formState: { errors }, control } = useForm({
        mode: "all",
        reValidateMode: 'onChange'
    });

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const onSubmit = (data) => {
        console.log(data);
    }


    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: { sm: '100%', lg: '60%' }, m: '2.5rem auto' }}>
            <Box className="formInfo" sx={{ mx: 5 }}>
                <Typography component="h2" sx={{ mb: 2, fontSize: '24px', textAlign: 'center', fontWeight: 500 }}>
                    Get Form
                </Typography>
                <Box className="input-item" sx={{ pt: 1 }}>
                    <Typography component="div" className="searchItem-title" >
                        Full Name:
                    </Typography>
                    <TextField fullWidth {...register("user_name", { required: "This field is required" })} error={Boolean(errors.user_name)} helperText={errors.user_name?.message} />
                </Box>
                <Box className="input-item">
                    <Typography component="div" className="searchItem-title" >
                        Email:
                    </Typography>
                    <TextField fullWidth {...register("user_email", { required: "This field is required" })} error={Boolean(errors.user_email)} helperText={errors.user_email?.message} />
                </Box>
                <Box className="input-item">
                    <Typography component="div" className="searchItem-title" >
                        Details:
                    </Typography>
                    <TextField fullWidth {...register("details", { required: "This field is required" })} error={Boolean(errors.details)} helperText={errors.details?.message} />
                </Box>
                <Box className="input-item">
                    <Typography component="div" className="searchItem-title " >
                        Gender:
                    </Typography>
                    <FormControl fullWidth error={Boolean(errors.user_gender)} >
                        <Controller
                            render={({ field }) => (
                                <Select {...field}  sx={{ border: "1px solid #707070" }} >
                                    <MenuItem value={''}>Select Gender</MenuItem>
                                    <MenuItem value={'male'}>Male</MenuItem>
                                    <MenuItem value={'female'}>Female</MenuItem>
                                    <MenuItem value={'other'}>None</MenuItem>
                                </Select>
                            )}
                            name="user_gender"
                            control={control}
                            defaultValue=''
                            rules={{
                                required: "This field is required"
                            }}
                        />
                        <FormHelperText>{errors.user_gender?.message}</FormHelperText>
                    </FormControl>
                </Box>
                <Box className="input-item" sx={{ pt: 2, pl: '7.5rem'}}>
                    <Button disabled={disable} type="submit" value="submit_close" variant="contained" className={(disable ? "disable-color" : "")} sx={{ backgroundColor: "#5BBC2E !important", px: 3, py: .5, textTransform: 'none' }}>
                        {disable ? "Submitting" : "Submit"}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default GetForm;