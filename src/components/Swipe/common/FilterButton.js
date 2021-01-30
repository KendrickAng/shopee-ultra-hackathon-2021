import React from 'react';
import {Button} from "antd";
import { SmileFilled } from '@ant-design/icons';
import {useState} from "react";

const FilterButton = ({ category, filters, setFilters }) => {
    const [toggle, setToggle] = useState(true);
    const onClick = () => {
        setFilters({ ...filters, [category]: !Boolean(filters[category])})
        setToggle(!toggle);
    }
    const styles = {
        green: {
            border: '2px solid green',
            margin: '1em',
        },
        red: {
            border: '2px solid red',
            margin: '1em',
        }
    }

    return (
        <Button
            size="large"
            icon={<SmileFilled />}
            style={toggle ? styles.green : styles.red} onClick={onClick}
        >
            {category}
        </Button>
    )
}

export { FilterButton };