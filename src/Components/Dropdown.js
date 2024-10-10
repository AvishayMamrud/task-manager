import { useState } from "react";

function Dropdown({ options, onSelect }) {
    const [selectedValue, setSelectedValue] = useState('');
    
    function sortingChangeHandler(e){
        setSelectedValue(e.target.value)
        onSelect(e.target.value)
    }

   return (
        <>
            <p style={{margin: 0, marginTop: '1rem'}}>OrderBy:</p>
            <select
                value={selectedValue}
                onChange={sortingChangeHandler}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </>
    );
}

export default Dropdown;