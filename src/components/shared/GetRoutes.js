import React from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import GetForm from '../GetForm/GetForm';
import TableInfo from '../TableInfo/TableInfo';

const GetRoutes = () => {

    let element = useRoutes([
        {
            path: "/",
            element: <Outlet />,
            children: [
                { index: true, element: <TableInfo /> },
                { path: "create_data", element: <GetForm /> },
                { path: "update_data/:id", element: <GetForm /> },
            ],
        },
        { path: "*", element: <h1>Not found</h1> },
    ]);

    return element;
}

export default GetRoutes;