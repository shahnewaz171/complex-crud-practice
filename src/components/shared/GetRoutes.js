import React from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import TableInfo from '../TableInfo/TableInfo';

const GetRoutes = () => {

    let element = useRoutes([
        {
            path: "/",
            element: <Outlet />,
            children: [
                { index: true, element: <TableInfo /> },
                { path: "create_data/:id", element: <h1>Create form</h1> },
                { path: "update_form", element: <h1>Update form</h1> },
            ],
        },
        { path: "*", element: <h1>Not found</h1> },
    ]);

    return element;
}

export default GetRoutes;