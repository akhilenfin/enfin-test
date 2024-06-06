import React, { memo, useEffect } from "react";

function CsvSelect({ options }) {
    
    return (
        <select>
            <option value="">-- Select --</option>
            {options.map((option) => (
                <option value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

export default memo(CsvSelect);