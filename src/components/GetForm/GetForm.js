import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Dialog, DialogContent, FormControl, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import useGlobalContext from '../../context/useGlobalContext';
import axios from 'axios';
import './GetForm.css';
import { ToastContainer } from 'react-toastify';

const GetForm = () => {
    const { ErrorMessages, alertMessage } = useGlobalContext();
    const [fieldInfo, setFieldInfo] = useState([]);
    const [fieldNames, setFieldNames] = useState([]);
    const [disable, setDisable] = useState(false);
    const [numberOfWork, setNumberOfWork] = useState(0);
    const [loading, setIsLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors }, control } = useForm({
        mode: "all",
        reValidateMode: 'onChange'
    });

    useEffect(() => {
        setIsLoading(true);
        axios.get('http://localhost/api/get_form.php')
            .then(res => {
                setIsLoading(false);
                const { data } = res?.data;
                if (data) {
                    const fieldsInfo = Object.values(data.fields[0]);
                    setFieldInfo(fieldsInfo);
                    const fieldName = Object.keys(data.fields[0]);
                    setFieldNames(fieldName);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.error(err);
            })
    }, []);

    useFieldArray({
        control,
        name: "user_hobby",
    });

    let rows = [];
    for (let i = 1; i <= numberOfWork; i++) {
        rows.push(i);
    }

    const onSubmit = (data) => {
        setDisable(true);
        console.log(data);
        axios.get('http://localhost/api/submit_form.php', data, {
            headers: {
                Accept: "application/json",
                "content-type": "application/json",
            },
        })
            .then(res => {
                setTimeout(() => {
                    console.log(res)
                    setDisable(false);
                    const { messages, status } = res.data;
                    if (status === 'success') {
                        alertMessage(messages?.join(', '), true);
                        reset();
                    }
                    else {
                        setDisable(false);
                        alertMessage(messages?.join(', '), false);
                    }
                }, 1);
            })
            .catch((err) => {
                setDisable(false);
                alertMessage('Something went wrong! Please try again later.', false);
            })
    }


    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: { sm: '100%', lg: '60%' }, m: '2.5rem auto' }}>
            <Box className="formInfo" sx={{ mx: 5 }}>
                <Typography component="h2" sx={{ mb: 2, fontSize: '26px', textAlign: 'center', fontWeight: 500 }}>
                    Get Form
                </Typography>
                {fieldInfo?.map((item, index) => {
                    const { title, type, required, validate, options, repeater_fields } = item;
                    const { ...html_attr } = item.html_attr;
                    const inputName = fieldNames[index];
                    delete html_attr.class;

                    const lengthInfo = validate?.split('|')[1];
                    const lengthTitle = lengthInfo?.split(':')?.[0];
                    const lengthNumber = lengthInfo?.split(':')?.[1];
                    const patternType = validate?.split("|")?.filter((item) => !item.includes(":"));
                    // console.log(item)

                    return (
                        <Box key={index + 1}>
                            {type !== 'hidden' ?
                                <Box className="input-item" sx={{ pt: 1, justifyContent: "unset !important" }}>
                                    <Typography component="div" sx={{ width: type === "radio" ? "16.6%" : type === 'repeater' ? '16.6%' : '20%', fontSize: '18px' }} >
                                        {title}:
                                    </Typography>
                                    {type === 'select' ?
                                        <FormControl fullWidth>
                                            <Select {...html_attr} className={item.html_attr?.class} {...register(`${inputName}`, { required: required ? 'This field is required' : '' })} defaultValue={item?.default || ''} >
                                                {options?.map((option, i) => {
                                                    const { key, label } = option;
                                                    return (
                                                        <MenuItem key={i + 1} value={key}>{label}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                            <ErrorMessages
                                                errors={errors}
                                                inputName={`${inputName}`}
                                            />
                                        </FormControl>
                                        :
                                        type === 'textarea' ?
                                            <Box sx={{ width: '100%' }}>
                                                <TextField {...html_attr} className={item.html_attr?.class} fullWidth {...register(`${inputName}`, { required: required ? 'This field is required' : '' })} defaultValue={item?.default || ''} />
                                                {required &&
                                                    <ErrorMessages errors={errors} inputName={`${inputName}`} />
                                                }
                                            </Box>
                                            :
                                            type === "radio" ?
                                                <FormControl sx={{ pt: .2 }}>
                                                    <RadioGroup row  {...html_attr} className={item.html_attr?.class} defaultValue={item?.default || ''} >
                                                        {options?.map((option, i) => {
                                                            const { key, label } = option;

                                                            return (
                                                                <FormControlLabel key={i + 1} {...register(`${inputName}`, { required: required ? 'This field is required' : '' })} value={key} control={<Radio />} label={label} sx={{ textTransform: 'none', ml: '0px' }} />
                                                            )
                                                        })}
                                                    </RadioGroup>
                                                    <ErrorMessages errors={errors} inputName={`${inputName}`} />
                                                </FormControl>
                                                :
                                                type === 'repeater' ?
                                                    <Box className="work-inputs">
                                                        <Grid container spacing={3}>
                                                            {rows?.map((num, inx) => {

                                                                return (
                                                                    <Grid key={inx + 1} item xs={4}>
                                                                        <Box sx={{ border: '1px solid #707070', padding: '15px', minHeight: '235px' }}>
                                                                            <Typography component="p" className="searchItem-title" sx={{ mb: 1 }}>
                                                                                Work {num}
                                                                            </Typography>
                                                                            {Object.values(repeater_fields)?.map((field, i) => {
                                                                                const { title, required: workReq, validate } = field;
                                                                                const keyValue = Object.keys(repeater_fields);

                                                                                return (
                                                                                    <Box key={i + 1} {...html_attr} className={item.html_attr?.class} sx={{ pt: 1 }}>
                                                                                        <Typography component="p" sx={{ fontSize: '14px', color: '#000' }}>
                                                                                            {title}:
                                                                                        </Typography>
                                                                                        <TextField fullWidth type={field?.type} {...register(`user_hobby.${inx}.${keyValue[i]}`,
                                                                                            {
                                                                                                required: workReq ? 'This field is required' : '',
                                                                                                pattern: {
                                                                                                    value: validate === 'only_letters' ? /^[A-Za-z ]+$/ : validate === 'only_letter_number' ? /[^A-Za-z0-9]+/ : '',
                                                                                                    message: validate === 'only_letters' ? 'Please input alphabet characters only' : validate === 'only_letter_number' ? 'Please input characters or numbers only' : ''

                                                                                                },
                                                                                                minLength: {
                                                                                                    value: lengthTitle === 'min' ? parseInt(lengthNumber) : '',
                                                                                                    message: lengthTitle === 'min' ? `Please input at least ${lengthNumber} characters` : ''
                                                                                                },
                                                                                                maxLength: {
                                                                                                    value: lengthTitle === 'max' ? parseInt(lengthNumber) : '',
                                                                                                    message: lengthTitle === 'max' ? `You cannot write more than ${lengthNumber} characters` : ''
                                                                                                }
                                                                                            })} sx={{ width: "90%", mr: '12px', mt: "4px" }} />
                                                                                        <ErrorMessages errors={errors}
                                                                                            inputName={`user_hobby.${inx}.${keyValue[i]}`} />
                                                                                    </Box>
                                                                                )
                                                                            })
                                                                            }
                                                                        </Box>
                                                                    </Grid>
                                                                )
                                                            })}
                                                            <Grid item xs={4}>
                                                                <Box onClick={() => setNumberOfWork(numberOfWork + 1)} className="addMore" sx={{ border: '1px solid #707070', padding: '8px', cursor: 'pointer', minHeight: "92%", '&:hover': { border: '1px dotted #000' } }}>
                                                                    <Typography component="p" sx={{ fontSize: '15px' }}>
                                                                        {numberOfWork >= 1 ? 'Add More' : 'Add'}
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                    :
                                                    <Box sx={{ width: '100%' }}>
                                                        <TextField type={type} {...html_attr} className={item.html_attr?.class} fullWidth
                                                            {...register(`${inputName}`,
                                                                {
                                                                    required: required ? 'This field is required' : '',
                                                                    pattern: {
                                                                        value: patternType?.[0] === 'only_letters' ? /^[A-Za-z ]+$/ : patternType?.[0] === 'email' ? /\S+@\S+\.\S+/ : '',
                                                                        message: patternType?.[0] === 'only_letters' ? 'Please input alphabet characters only' : patternType?.[0] === 'email' ? 'Please enter the valid email address' : ''
                                                                    }
                                                                })} defaultValue={item?.default || ''}
                                                        />
                                                        <ErrorMessages errors={errors} inputName={`${inputName}`} />
                                                    </Box>
                                    }
                                </Box> : ''
                            }
                        </Box>
                    )
                })}
                <Box className="input-item" sx={{ pt: 4, pl: '7.5rem', }}>
                    <Button disabled={disable} type="submit" value="submit_close" variant="contained" className={(disable ? "disable-color" : "")} sx={{ backgroundColor: "#5BBC2E !important", px: 3, py: .6, textTransform: 'none' }}>
                        {disable ?
                            <>
                                Submitting
                                <CircularProgress color="inherit" disableShrink className='disable-loader' />
                            </> : "Submit"
                        }
                    </Button>
                </Box>
            </Box>
            {
                <ToastContainer />
            }
        </Box >
    );
};

export default GetForm;