import React from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import GetForm from '../GetForm/GetForm';
import TableInfo from '../TableInfo/TableInfo';
import NotFound from './NotFound/NotFound';

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
        { path: "*", element: <NotFound /> },
    ]);

    return element;
}

export default GetRoutes;