import React from 'react';
import ControlFormsCrmComponent from './controlFormsComponent';

const FormCrmComponent = ({ handleSaveData, form, handleChangeForm, dataTypes, setForm }) => {
    return (
        <div>
            <form>
                <div className="form-group">
                    <label>Nombre</label>
                    <input type="text" className="form-control form-control-lg" id="name" onChange={(e) => setForm({ ...form, [e.target.id]: e.target.value })} value={form.name} />
                </div>
            </form>
            {form.name !== '' &&
                <ControlFormsCrmComponent
                    dataTypes={dataTypes}
                    handleChangeForm={handleChangeForm}
                    form={form}
                />
            }
            <div className="row mt-2">
                <div className="col">
                    {form.name !== '' &&
                        <div className="float-right">
                            <button type="submit" onClick={() => handleSaveData()} className="btn btn-success btn-block">Guardar</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default FormCrmComponent;