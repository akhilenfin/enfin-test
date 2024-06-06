import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import axios from "../config/axiosConfig";

const CsvProcessor = (props) => {
  const [error, setError] = useState(null);
  const [fields, setFields] = useState([]);
  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState({});
  const [csvValues, setCsvValues] = useState({});
  const [sDefectiveRows, setsDefectiveRows] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (options) {
      setFields(props.fields); // Setting collection fields name from props
    }
  }, [options]);

  const handleFileUpload = (event) => {
    const csvFile = event.target.files[0];
    if (csvFile) {
      Papa.parse(csvFile, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setOptions(results.meta.fields); // setting dropdown option from csv file
          setError(null);
          setCsvValues(results);
        },
        error: (err) => {
          setError(err.message);
        },
      });
    }
  };

  const handleSelectChange = (e) => {
    setFormData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleCsvUpload = async (e) => {
    e.preventDefault();

    if (fields.length !== Object.keys(formData).length) {
      alert("Please select all fields");
    } else {
      try {
        let transformedObject = [];
        const values = [...Object.values(formData)];
        for (const i in csvValues.data) {
          let transformedObjectTemp = {};
          for (const key in values) {;
              transformedObjectTemp[fields[key]] = csvValues.data[i][values[key]];
          }
          transformedObject.push({ transformedObjectTemp });
        }
        let filteredData = transformedObject.map(
          (obj) => obj.transformedObjectTemp
        );

        const response = await axios.post(props.url, { movies: filteredData });
        if (response.status === 200) {
          alert(response.data.data.insertedRow+" record uploaded");
          if (Object.keys(response.data.data.defectiveRecords[0]).length !== 0) {
            setOptions([]);
            setsDefectiveRows(response.data.data.defectiveRecords[0]);
          }else{
            ( props.redirection != "" ) ? navigate(props.redirection) : window.location.reload();
          }
        } else {
          alert("Something went wrong. Please try again later!");
        }
      } catch (e) {
        console.log(e);
        alert("Something went wrong!");
      }
    }
  };

  const handleItemChange = (element, rowId, itemId) => {

    setsDefectiveRows((prevDefects) => {
      let _prevDefects = {...prevDefects};
      _prevDefects[rowId][itemId] = element.target.value;
      return _prevDefects;
    });

  };

  const handleReTry = async() => {
    const response = await axios.post(props.url, { movies: sDefectiveRows });
    if (response.status === 200) {
      alert(response.data.data.insertedRow+" uploaded successfully");
      if (Object.keys(response.data.data.defectiveRecords[0]).length !== 0) {
        setOptions([]);
        setsDefectiveRows(response.data.data.defectiveRecords[0]);
      }else{
        setOptions([]);
        setsDefectiveRows([]);
      }
    } else {
      alert("Something went wrong. Please try again later!");
    }
  };

  
  return (
    <div>
      <h1>CSV Header Processor</h1>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        id="csvFile"
        name="csvFile"
      />
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {options.length > 0 && (
        <div>
          <table>
            <tbody>
              {fields.map((field) => (
                <tr>
                  <td>{field}</td>
                  <td>
                    <select
                      className="form-control"
                      name={field}
                      id={field}
                      onChange={handleSelectChange}
                    >
                      <option value="">-- Select --</option>
                      {options.map((option) => (
                        <option value={option}>{option}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td>
                  <button
                    className="btn btn-primary float-right ml-3"
                    type="button"
                    onClick={handleCsvUpload}
                  >
                    Upload
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {Object.keys(sDefectiveRows).length > 0 && (
        <div>
          <table>
            <thead>
              <tr>
                {fields.map((field) => (
                  <th>{field}</th>
              ))}
              </tr>
            </thead>
            <tbody>
            {Object.entries(sDefectiveRows).map(
              ([defectRowId, defectiveRowItem]) => (
                <tr key={defectRowId}>
                  {Object.entries(defectiveRowItem).map(([itemId, item]) => (
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          handleItemChange(e, defectRowId, itemId)
                        }
                      ></input>
                    </td>
                  ))}
                </tr>
              )
            )}
            <tr>
              <td colSpan={4}>
                <button className="btn btn-primary" onClick={handleReTry}>Try Again</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CsvProcessor;
