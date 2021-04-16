import React from 'react';

const HeaderCrmComponent = ({ show, handleChangeShow }) => {
    return (
        <div>
            <h1>CRM</h1>
            <hr />
            <div className="row mb-2">
                <div className="col-12">
                    <div className="float-right">
                        {show === 'index' ?
                            <button className="btn btn-primary" onClick={() => handleChangeShow('create')} > NUEVO CRM </button>
                            :
                            <button className="btn btn-primary" onClick={() => handleChangeShow('index')} > Volver </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderCrmComponent;