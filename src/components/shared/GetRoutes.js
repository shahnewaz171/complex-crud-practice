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
                { path: "create_data/:id", element: <GetForm /> },
                { path: "update_form", element: <h1>Update form</h1> },
            ],
        },
        { path: "*", element: <h1>Not found</h1> },
    ]);

    return element;
}

export default GetRoutes;