import {Button} from "antd";
import {useState} from "react";

const FilterButton = ({ category, filters, setFilters }) => {
    const [toggle, setToggle] = useState(false);
    const onClick = () => {
        setFilters({ ...filters, [category]: !Boolean(filters[category])})
        setToggle(!toggle);
    }

    return (
        <Button style={toggle ? {border: '2px solid green'} : {border: '2px solid red'}} onClick={onClick}>
            {category}
        </Button>
    )
}

export { FilterButton };