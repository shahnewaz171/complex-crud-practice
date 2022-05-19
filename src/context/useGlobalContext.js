import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();


export const UserProvider = ({ children }) => {
    const [columns, setColumns] = useState([]);
    const [rowsData, setRowsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
                    if (!headersInfo[key].hidden) {
                        const data = { ...headersInfo[key], accessor: key };
                        console.log(data)
                        colInfo.push(data);
                    }
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

    return (
        <UserContext.Provider
            value={{
                columns,
                rowsData,
                setRowsData,
                isLoading
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