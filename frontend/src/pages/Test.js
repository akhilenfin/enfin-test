// Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../config/axiosConfig';
import Pagination from './Pagination';
import Upload from './Upload';


const Test = () => {
    const [count, setCount] = useState(0);
    const [values, setValues] = useState([]);

    const addTextbox = () => {
        setCount(count + 1);
    };

    const handleInputChange = (i, event) => {
        values[i] = event.target.value;
        setValues([...values]);
    }

    return (
        <div>
        {[...Array(count)].map((x, i) =>
          <input key={i} type="text" onChange={event => handleInputChange(i, event)} />
        )}
        <button onClick={addTextbox}>Add Textbox</button>
        </div>
    );
};



export default Test;
