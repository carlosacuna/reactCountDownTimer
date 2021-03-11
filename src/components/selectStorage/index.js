import React, { useState, useEffect } from 'react';
import '../../App.css';

const SelectStorage = () => {
    const [stateArrayValues, setStateArrayValues] = useState([]);
    const [stateSelects, setStateSelects] = useState({
        "s1": '',
        "s2": 'option1',
        "s3": ''
    });
    const [stateSelectsOptions, setSeSelectsOptions] = useState([
        {
            id: '',
            name: '---'
        },
        {
            id: 'option1',
            name: 'option1'
        },
        {
            id: 'option2',
            name: 'option2'
        },
        {
            id: 'option3',
            name: 'option3'
        }
    ]);

    useEffect(() => {
        let saveOptions = JSON.parse(localStorage.getItem('saveOptions'))
        if (saveOptions) {
            setStateSelects(saveOptions);
            setStateArrayValues([saveOptions]);
        }
    }, []);

    const handleChangeSelect = async (e) => {
        let save = stateSelects;
        save = {
            ...save,
            [e.target.id]: e.target.value
        }
        setStateSelects(save)
        setStateArrayValues([save]);
        localStorage.setItem('saveOptions', JSON.stringify(save));
    }

    const handleRemoveStorage = () => {
        localStorage.removeItem('saveOptions')
    }

    return (
        <div className="App">
            <div>
                <label>S1: </label><br />
                <select id="s1" onChange={(e) => handleChangeSelect(e)} value={stateSelects.s1} >
                    {stateSelectsOptions.map(option =>
                        <option value={option.id} key={`s1-${option.id}`}>{option.name}</option>
                    )}
                </select>
            </div>
            <br />
            <div>
                <label>S2: </label><br />
                <select id="s2" onChange={(e) => handleChangeSelect(e)} value={stateSelects.s2} >
                    {stateSelectsOptions.map(option =>
                        <option value={option.id} key={`s2-${option.id}`}>{option.name}</option>
                    )}
                </select>
            </div>
            <br />
            <div>
                <label>S3: </label><br />
                <select id="s3" onChange={(e) => handleChangeSelect(e)} value={stateSelects.s3} >
                    {stateSelectsOptions.map(option =>
                        <option value={option.id} key={`s3-${option.id}`}>{option.name}</option>
                    )}
                </select>
            </div>
            <br />
            <div>
                <button onClick={handleRemoveStorage} >Borrar Storage</button>
            </div>
        </div>
    );
}

export default SelectStorage;
