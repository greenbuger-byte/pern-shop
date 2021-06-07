import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "react-bootstrap";

const Pages =observer( () => {
    const {device} = useContext(Context);
    const pageCount = Math.ceil(device.totalCount / device.limit);
    const pages = [];
    for (let i = 1; i<=pageCount; i++){
        pages.push(i);
    }
    return (
            <Pagination>
            {pages.map(p=><Pagination.Item key={p} active={p === device.page} onClick={()=>device.setPage(p)}>
                {p}
            </Pagination.Item>)}
        </Pagination>
    );
})

export default Pages;