import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

const LoadCSVTable = () => {
    const [rowsCSV, setRowsCSV] = useState([]);
    const [headersRowsCSV, setHeadersRowsCSV] = useState({});
    const [showTypes, setShowTypes] = useState(0);
    const [typesColumns, setTypesColumns] = useState([
        { "id": 'Name', "name": 'Names' },
        { "id": 'Email', "name": 'Emails' },
        { "id": 'Phone', "name": 'Phones' },
        { "id": 'City', "name": 'Citys' },
    ]);
    
    const handleChange = (event) => {

        // Check for the various File API support.
        if (window.FileReader) {
            // FileReader are supported.
            getAsText(event.target.files[0]);
        }
    }

    const getAsText = (fileToRead) => {

        let reader = new FileReader();
        // Read file into memory as UTF-8      
        reader.readAsText(fileToRead);

        // Handle errors load
        reader.onload = fileReadingFinished;
        reader.onerror = errorHandler;
    }

    const fileReadingFinished = (event) => {

        let csv = event.target.result;
        let allTextLines = csv.split(/\r\n|\n/);
        let lines = allTextLines.map(data => data.split(';'));
        lines = lines.filter(line => line !== '' || line !== null)
        
        if (lines.length > 0) {

            // Save all rows CSV
            setRowsCSV(lines);
        }

    }

    const errorHandler = (event) => {
        if (event.target.error.name === "NotReadableError") {
            alert("Cannot read file!");
        }
    }

    const saveHeaderColumns = (event, value, index) => {

        // Generate headers CSV
        let columns = headersRowsCSV;
        if(event.target.checked == true){
            columns = {
                ...columns,
                [value]:{
                    "name": value,
                    "type": '',
                    index
                }
            }
        }else{
            delete columns[value];
        }

        setShowTypes(Object.keys(columns).length);
        setHeadersRowsCSV(columns);
    }

    const changeType = (event, column, index) => {
        setHeadersRowsCSV({
            ...headersRowsCSV,
            [column]:{
                "name": column,
                "type": event.target.value,
                index
            }
        })
    }

    const validateColumnsTypeTable = (type) => {
        return Object.keys(headersRowsCSV).some((columns) => {
            return headersRowsCSV[columns].type == type;
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = [];
        rowsCSV.map((row, index) => {
            if(index !== 0){
                let rowColumns = {};
                row.map((item, indexItem) => {
                    Object.keys(headersRowsCSV).map( heaeder => {
                        if(headersRowsCSV[heaeder].index == indexItem){
                            rowColumns  = {
                                ...rowColumns,
                                [heaeder]: item
                            }
                        }
                     })
                })
                data.push(rowColumns);
            }
        })
        console.log({
            header: headersRowsCSV,
            data
        })
    }

    return (
        <Container fluid>
            <div className="row justify-content-center">
                {rowsCSV.length == 0 ?
                    <div className="col-md-12">
                        <div className="card mt-5">
                            <div className="card-body">
                                <form>
                                    <div>
                                        <label for="formFileLg" className="form-label">Cargar archivo .CSV</label>
                                        <input className="form-control form-control" id="formFileCSV" type="file" accept=".csv" onChange={handleChange} multiple={false} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="col-md-12">
                        <form onSubmit={e => handleSubmit(e)} >
                            <div className="row">
                                <div className="col-md-6">
                                    <span>Total filas: <i>{rowsCSV.length - 1}</i></span>
                                </div>
                                <div className="col-md-6">
                                    <div className="float-right">
                                        <button type="button" className="btn btn-link" onClick={() => setRowsCSV([])} >Volver</button>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <span>* Es requerido seleccionar columna tipo Name y Phone</span>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            {rowsCSV[0].map((column, index) => {
                                                return (
                                                    <th scope="col" key={`header-${column}`}>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" value={column} id={column} onChange={e => saveHeaderColumns(e, column, index)} />
                                                            <label className="form-check-label" for="flexCheckDefault">
                                                                {column}
                                                            </label>
                                                        </div>
                                                    </th>
                                                )
                                            })
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Header selects  */}
                                        {showTypes !== 0 && 
                                            <tr>
                                                <td scope="col"></td>
                                                {   rowsCSV[0].map((column, index) => {
                                                        if(!headersRowsCSV[column]) return  <td scope="col"></td>;
                                                        return (
                                                            <td>
                                                                <select className="form-select" value={headersRowsCSV[column].type} onChange={event => changeType(event, headersRowsCSV[column].name, index)}  required>
                                                                    <option value="">Tipo</option>
                                                                    {   typesColumns.map((type) => {
                                                                            return <option value={type.id} key={`typeColumn-${headersRowsCSV[column].name}-${type.id}`} >{type.name}</option>
                                                                        })
                                                                    }
                                                                </select>
                                                            </td>
                                                        )
                                                    })
                                                }
                                            </tr>
                                        }
                                        {/* Values coloumns CSV */}

                                        {rowsCSV.map((row, index) => {
                                            if (index == 0) {
                                                return false;
                                            }
                                            return (
                                                <tr key={`tr-${index}`}>
                                                    <td>{index}</td>
                                                    {   row.map((value) => {
                                                            return <td key={`td-${index}-${value}`}>{value}</td>
                                                        })
                                                    }
                                                </tr>
                                            )
                                        })

                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                                {validateColumnsTypeTable('Name') &&  validateColumnsTypeTable('Phone') &&
                                    <div className="col-md-12">
                                        <div className="float-right">
                                            <button type="submit" className="btn btn-success">Enviar</button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </form>
                    </div>
                }
            </div>
        </Container>
    );
}

export default LoadCSVTable;