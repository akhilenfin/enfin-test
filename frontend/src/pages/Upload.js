import React, { useState } from "react";
import axios from '../config/axiosConfig';
import Papa from 'papaparse';


function Upload() {
    const [file, setFile] = useState();
    const [headers, setHeaders] = useState([]);
    const [fields, setFields] = useState([]);
    const [btn, setBtn] = useState([]);
    
    let csvFields = "";
    //const fields = ['title','description','release_date','genre'];

    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (file) {
            setFields(['title','description','release_date','genre']);
            debugger
            Papa.parse(file, {
                    complete: (results) => {
                // Assuming the first row contains headers
                    const headerRow = results.data[0];
                    console.log('Headers:', headerRow);
                    setHeaders(headerRow);
                   
                    
                },
                error: (error) => {
                    console.error('Error parsing CSV:', error);
                }
            });
            headers.map((header) =>(
                csvFields +="<option value="+{header}+" >"+{header}+"</option>"
            ))
            setBtn("<tr><td></td><td><button onClick={handSend} >Upload</button></td></tr>");
        }
    };

    return (
        <div style={{ textAlign: "center" }}>
            <form>
                <input
                    type={"file"}
                    id={"csvFileInput"}
                    accept={".csv"}
                    onChange={handleOnChange}
                />

                <button
                    onClick={(e) => {
                        handleOnSubmit(e);
                    }}
                >
                    Process CSV
                </button>
            </form>

            <div className="">
                <table className="table table-striped table-condensed">
                
                { fields.map((field) => (
                    <tr>
                        <td>{field}</td>
                        <td>
                            <select name={field}>
                                <option value="">Select</option>
                                {csvFields}
                            </select>
                        </td>
                    </tr> 
                ))}
                {btn}
                </table>
            </div>
        </div>
    );
}

export default Upload;
