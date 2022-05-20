import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, FormControl, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import useGlobalContext from '../../context/useGlobalContext';
import axios from 'axios';
import './GetForm.css';

const GetForm = () => {
    const { ErrorMessages } = useGlobalContext();
    const [fieldInfo, setFieldInfo] = useState([]);
    const [fieldNames, setFieldNames] = useState([]);
    const [disable, setDisable] = useState(false);
    const [value, setValue] = React.useState('false');
    const [numberOfWork, setNumberOfWork] = useState(1);
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
                }
            })
            .catch((err) => {
                console.error(err);
            })
    }, []);

    useFieldArray({
        control,
        name: "fields",
    });

    let rows = [];
    for (let i = 1; i <= numberOfWork; i++) {
        rows.push(i);
    }
    // console.log(rows)

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
                    const { title, type, required, value, validate, options, repeater_fields } = item;
                    const { ...html_attr } = item.html_attr;
                    const inputName = fieldNames[index];
                    delete html_attr.class;
                    // console.log(Object.values(repeater_fields))
                    // console.log(fieldNames[index]);
                    // console.log(item)
                    return (
                        <Box key={index + 1}>
                            {type !== 'hidden' ?
                                <Box className="input-item" sx={{ pt: 1, justifyContent: "unset !important" }}>
                                    <Typography component="div" className="searchItem-title" sx={{ width: type === "radio" ? "16.6%" : type === 'repeater' ? '16.6%' : '20%' }} >
                                        {title}:
                                    </Typography>
                                    {type === 'select' ?
                                        <FormControl fullWidth>
                                            <Controller
                                                render={({ field }) => (
                                                    <Select {...field} {...html_attr} className={item.html_attr?.class} >
                                                        {options?.map((option, i) => {
                                                            const { key, label } = option;
                                                            return (
                                                                <MenuItem key={i + 1} value={key}>{label}</MenuItem>
                                                            )
                                                        })}
                                                    </Select>
                                                )}
                                                name={item?.default}
                                                control={control}
                                                defaultValue={item?.default || ''}
                                                {...register(`${inputName}`, { required: "This is required." })}
                                            />
                                            <ErrorMessages
                                                errors={errors}
                                                inputName={`${inputName}`}
                                            />
                                        </FormControl>
                                        :
                                        type === 'textarea' ?
                                            <Box sx={{ width: '100%' }}>
                                                <TextField multiline rows={2} className={item.html_attr?.class} {...html_attr} fullWidth {...register(`${fieldNames[index]}`, { required: "This field is required" })} defaultValue={item?.default || ''} />
                                                <ErrorMessages errors={errors} inputName={`${fieldNames[index]}`} />
                                            </Box>
                                            :
                                            type === "radio" ?
                                                <FormControl sx={{ pt: .2 }}>
                                                    <Controller
                                                        render={({ field }) => (
                                                            <RadioGroup row {...field} >
                                                                <FormControlLabel value="true" control={<Radio />} label="Yes" sx={{ textTransform: 'none', ml: '0px' }} />
                                                                <FormControlLabel value="false" control={<Radio />} label="No" sx={{ textTransform: 'none', ml: '0px' }} />
                                                            </RadioGroup>
                                                        )}
                                                        control={control}
                                                        defaultValue={item?.default || ''}
                                                        {...register(`${inputName}`, { required: "This is required." })}
                                                    />
                                                    <ErrorMessages errors={errors} inputName={`${inputName}`} />
                                                </FormControl>
                                                :
                                                type === 'repeater' ?
                                                    <Box className="work-inputs">
                                                        <Grid container spacing={3}>
                                                            {rows?.map((num, inx) => {

                                                                return (
                                                                    <Grid key={inx + 1} item xs={4}>
                                                                        <Box sx={{ border: '1px solid #707070', padding: '15px', minHeight: '180px' }}>
                                                                            <Typography component="p" className="searchItem-title" sx={{ mb: 1 }}>
                                                                                Work {num}
                                                                            </Typography>
                                                                            {Object.values(repeater_fields)?.map((field, i) => {
                                                                                const { title, required, validate } = field;
                                                                                const keyValue = Object.keys(repeater_fields);

                                                                                return (
                                                                                    <Box key={i + 1} sx={{ pt: 1 }}>
                                                                                        <Typography component="p" sx={{ fontSize: '14px', color: '#000' }}>
                                                                                            {title}:
                                                                                        </Typography>
                                                                                        <TextField fullWidth type={field?.type} {...register(`fields.${inx}.${keyValue[i]}`, { required: "This field is required" })} sx={{ width: "90%", mr: '12px', mt: "4px" }} />
                                                                                        <ErrorMessages errors={errors}
                                                                                            inputName={`fields.${inx}.${keyValue[i]}`} />
                                                                                    </Box>
                                                                                )
                                                                            })
                                                                            }
                                                                        </Box>
                                                                    </Grid>
                                                                )
                                                            })}
                                                            <Grid item xs={4}>
                                                                <Box onClick={() => setNumberOfWork(numberOfWork + 1)} className="addMore" sx={{ border: '1px solid #707070', padding: '8px', cursor: 'pointer', minHeight: "92%" }}>
                                                                    <Typography component="p" sx={{ fontSize: '15px' }}>
                                                                        Add More
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                    :
                                                    <Box sx={{ width: '100%' }}>
                                                        <TextField type={type} {...html_attr} className={item.html_attr?.class} fullWidth {...register(`${inputName}`, { required: "This field is required" })} defaultValue={item?.default || ''} />
                                                        <ErrorMessages errors={errors}  inputName={`${inputName}`} />
                                                    </Box>
                                    }
                                </Box> : ''
                            }
                        </Box>
                    )
                })}
                <Box className="input-item" sx={{ pt: 2, pl: '7.5rem' }}>
                    <Button disabled={disable} type="submit" value="submit_close" variant="contained" className={(disable ? "disable-color" : "")} sx={{ backgroundColor: "#5BBC2E !important", px: 3, py: .6, textTransform: 'none' }}>
                        {disable ? "Submitting" : "Submit"}
                    </Button>
                </Box>
            </Box>
        </Box >
    );
};

export default GetForm;