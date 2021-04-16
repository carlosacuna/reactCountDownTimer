import React, { useState } from 'react';
import SectionsTableCrmComponent from './sectionsTableCrmComponent';


const ControlFormsCrmComponent = ({ dataTypes, handleChangeForm, form }) => {
    const [show, setShow] = useState('contacts');

    return (
        <div className="mt-2">
            <h3>Formularios</h3>
            <div className="row">
                <div className="col">
                    <button className={`btn btn-${show !== 'contacts' ? 'light' : 'primary'} btn-block`} onClick={() => setShow('contacts')} > Contactos </button>
                </div>
                <div className="col">
                    <button className={`btn btn-${show !== 'accounts' ? 'light' : 'primary'} btn-block`} onClick={() => setShow('accounts')} >Empresas </button>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col">
                    <div className="card">
                        <div className={`card-body ${show !== 'contacts' && 'd-none'}`}>
                            <SectionsTableCrmComponent show={show} handleChangeForm={handleChangeForm} dataTypes={dataTypes} />
                        </div>
                        <div className={`card-body ${show !== 'accounts' && 'd-none'}`}>
                            <SectionsTableCrmComponent show={show} handleChangeForm={handleChangeForm} dataTypes={dataTypes} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ControlFormsCrmComponent;