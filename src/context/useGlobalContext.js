import axios from 'axios';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import SearchInputFields from '../components/TableInfo/SearchInputFields/SearchInputFields';

const UserContext = createContext();


export const UserProvider = ({ children }) => {
    const [columns, setColumns] = useState([]);
    const [rowsData, setRowsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const toastId = useRef(null);

    const getUsers = async () => {
        setIsLoading(true);
        let colInfo = [];

        try {
            const res = await axios.get('http://localhost/api/list.php');
            const result = res.data?.data;
            if (result) {
                setIsLoading(false);
                let headersInfo = result.headers[0];

                for (let key in headersInfo) {
                    const data = { ...headersInfo[key], accessor: key, Filter: SearchInputFields };
                    colInfo.push(data);
                }
                setRowsData(result.rows);
            }
        }
        catch (e) {
            setIsLoading(false);
            console.error(e);
        }
        setColumns(colInfo);

    }

    useEffect(() => {
        getUsers();
    }, []);

    const alertMessage = (value, isSuccess) => {
        toast.dismiss(toastId.current);
        if(isSuccess){
            toast.success(value, {
                theme: "light",
                position: toast.POSITION.TOP_CENTER,
                autoClose: 5000
            });
        }
        else{
            toast.error(value, {
                theme: "light",
                position: toast.POSITION.TOP_CENTER,
                autoClose: 5000
            });
        }
    }

    return (
        <UserContext.Provider
            value={{
                columns,
                rowsData,
                setRowsData,
                isLoading,
                alertMessage
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(UserContext);
};

export default useGlobalContext;