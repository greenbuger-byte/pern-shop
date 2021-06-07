import React from 'react';
import {Card, Row} from "react-bootstrap";

const BrandBar = ({brands, selectedBrand, setSelectedBrand}) => {
    return (
        <Row>
            {
                brands.map(brand=>{
                    return    <Card
                        style={{cursor: 'pointer'}}
                        className={'p-3 m-1'}
                        key={brand.id}
                        border = {brand.id === selectedBrand.id ? "danger" : 'light'}
                        onClick={()=>setSelectedBrand(brand)}
                    >
                        {brand.name}
                    </Card>
                })
            }
        </Row>
    );
}

export default BrandBar;