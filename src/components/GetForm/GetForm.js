import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, FormControl, FormControlLabel, FormHelperText, Grid, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Editor } from "@tinymce/tinymce-react";
import axios from 'axios';
import './GetForm.css';

const GetForm = () => {
    const [fieldInfo, setFieldInfo] = useState([]);
    const [fieldNames, setFieldNames] = useState([]);
    const [disable, setDisable] = useState(false);
    const [value, setValue] = React.useState('false');
    const { register, handleSubmit, reset, formState: { errors }, control } = useForm({
        mode: "all",
        reValidateMode: 'onChange'
    });
    const editorRefDetails = useRef(null);

    useEffect(() => {
        axios.post('http://localhost/api/get_form.php')
            .then(res => {
                const { data } = res?.data;
                if (data) {
                    const fieldsInfo = Object.values(data.fields[0]);
                    setFieldInfo(fieldsInfo);
                    const fieldName = Object.keys(data.fields[0]);
                    setFieldNames(fieldName);
                    console.log()

                }
            })
            .catch((err) => {
                console.error(err);
            })
    }, [])

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
                {fieldInfo?.map((item, index) => {
                    const { title, type, required, value, validate, html_attr, options, repeater_fields } = item;
                    // console.log(Object.values(repeater_fields))
                    // console.log(item);
                    console.log(fieldNames[index])
                    return (
                        <Box key={index + 1}>
                            {type !== 'hidden' ?
                                <Box className="input-item" sx={{ pt: 1, justifyContent: "unset !important" }}>
                                    <Typography component="div" className="searchItem-title" sx={{ width: type === "radio" ? "16.6%" : type === 'repeater' ? '16.6%' : '20%' }} >
                                        {title}:
                                    </Typography>
                                    {type === 'select' ?
                                        <FormControl fullWidth error={Boolean(errors.user_gender)} >
                                            <Controller
                                                render={({ field }) => (
                                                    <Select {...field} >
                                                        <MenuItem value={''}>Select Gender</MenuItem>
                                                        <MenuItem value={'male'}>Male</MenuItem>
                                                        <MenuItem value={'female'}>Female</MenuItem>
                                                        <MenuItem value={'other'}>None</MenuItem>
                                                    </Select>
                                                )}
                                                name={fieldNames[index]}
                                                control={control}
                                                defaultValue=''
                                                rules={{
                                                    required: "This field is required"
                                                }}
                                            />
                                            <FormHelperText>{errors.user_gender?.message}</FormHelperText>
                                        </FormControl>
                                        :
                                        type === 'textarea' ?
                                            <TextField multiline rows={2} fullWidth {...register(fieldNames[index], { required: "This field is required" })} error={Boolean(errors.user_name)} helperText={errors.user_name?.message} />
                                            :
                                            type === "radio" ?
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                                    name={fieldNames[index]}
                                                    sx={{ pt: .2 }}
                                                >
                                                    <FormControlLabel value="true" control={<Radio />} label="Yes" sx={{ textTransform: 'none', ml: '0px' }} />
                                                    <FormControlLabel value="false" control={<Radio />} label="No" sx={{ textTransform: 'none', ml: '0px' }} />
                                                </RadioGroup>
                                                :
                                                type === 'repeater' ?
                                                    <Box className="work-inputs">
                                                        <Grid container spacing={3}>
                                                            {[1]?.map(item => {
                                                                return (
                                                                    <Grid key={item} item xs={4}>
                                                                        <Box sx={{ border: '1px solid #707070', padding: '8px', height: '170px' }}>
                                                                            <Typography component="p" className="searchItem-title" sx={{ mb: 1 }}>
                                                                                Work 1
                                                                            </Typography>
                                                                            {Object.values(repeater_fields)?.map((item, index) => {
                                                                                return (
                                                                                    <Box key={index + 1}>
                                                                                        <Typography component="p" sx={{ fontSize: '14px', color: '#000' }}>
                                                                                            Designation:
                                                                                        </Typography>
                                                                                        <TextField fullWidth type={type} {...register(fieldNames[index], { required: "This field is required" })} error={Boolean(errors.user_name)} helperText={errors.user_name?.message} sx={{ width: "90%", mr: '12px', mb: "15px" }} />
                                                                                    </Box>
                                                                                )
                                                                            })
                                                                            }
                                                                        </Box>
                                                                    </Grid>
                                                                )
                                                            })}
                                                            <Grid item xs={4}>
                                                                <Box className="addMore" sx={{ border: '1px solid #707070', padding: '8px', cursor: 'pointer', height: '170px' }}>
                                                                    <Typography component="p" sx={{ fontSize: '15px' }}>
                                                                        Add More
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                    :
                                                    <TextField type={type} fullWidth {...register(fieldNames[index], { required: "This field is required" })} error={Boolean(errors.user_name)} helperText={errors.user_name?.message} />
                                    }
                                </Box> : ''
                            }
                        </Box>
                    )
                })}
                <Box className="input-item" sx={{ pt: 2, pl: '7.5rem' }}>
                    <Button disabled={disable} type="submit" value="submit_close" variant="contained" className={(disable ? "disable-color" : "")} sx={{ backgroundColor: "#5BBC2E !important", px: 3, py: .5, textTransform: 'none' }}>
                        {disable ? "Submitting" : "Submit"}
                    </Button>
                </Box>
            </Box>
        </Box >
    );
};

export default GetForm;