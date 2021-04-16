import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const SectionsTableCrmComponent = ({ show, handleChangeForm, dataTypes }) => {
    const [showModal, setShowModal] = useState(false);
    const [showModalLabel, setShowModalLabel] = useState(false);
    const [nameSection, setNameSection] = useState('');
    const [nameOptionSection, setNameOptionSection] = useState('');
    const [formSection, setFormSection] = useState([]);
    const [SectionSelected, setSectionSelected] = useState(null);
    const [formSectionLabel, setFormSectionLabel] = useState({
        label: '',
        datatype: 0,
        required: false,
        defaultValue: '',
        order: 0,
        options: []
    });

    const handleAddSection = () => {

        if (nameSection == '' || nameSection == false) return alert("Debes agregar nombre seccion");

        let allSections = formSection;

        allSections.push({
            name: nameSection,
            forms: []
        });

        setFormSection(allSections);
        setShowModal(false);
        setNameSection('');

    }

    const handleRemoveSection = (index) => {
        let allSections = formSection;
        allSections.splice(index, 1);
        return setFormSection(allSections);
    }

    const handleShowModalLabel = (index) => {
        setSectionSelected(index);
        setShowModalLabel(true);
    }

    const handleAddOptionFormSection = () => {
        if (nameOptionSection == '' || nameOptionSection == false) return alert("Debes agregar nombre de la opcion");
        let allOptions = formSectionLabel.options
        allOptions.push(nameOptionSection);

        setFormSectionLabel({
            ...formSectionLabel,
            ['options']: allOptions
        });
        setNameOptionSection('');
        return true;
    }

    const handleRemoveOptionFormSection = (index) => {
        let allOptions = formSectionLabel.options
        allOptions.splice(index, 1);
        setFormSectionLabel({
            ...formSectionLabel,
            ['options']: allOptions
        });
        return true;

    }

    const handleAddLabelSection = () => {

        if (formSectionLabel.label == '' || formSectionLabel.label == false) return alert("Debes agregar label");
        if (formSectionLabel.datatype == '' || formSectionLabel.datatype == 0) return alert("Debes seleccionar tipo de datos");
        if (formSectionLabel.datatype && formSectionLabel.datatype == '606e209988b0ce43643205eb' || formSectionLabel.datatype == '606e209988b0ce43643205ea') {
            if (formSectionLabel.options.length == 0) return alert("Debes agregar options");
        }

        let allSections = formSection;

        allSections[SectionSelected].forms.push(formSectionLabel);

        setFormSection(allSections);
        handleChangeForm(show, allSections);
        setFormSectionLabel({
            label: '',
            datatype: 0,
            required: false,
            defaultValue: '',
            order: 0,
            options: []
        });
        setShowModalLabel(false);
        return true;

    }

    const handleSelectTypeInput = (datatype) => {
        switch (datatype) {
            case '606e209988b0ce43643205e6': return 'number';
            case '606e209988b0ce43643205e7': return 'email';
            case '606e209988b0ce43643205e8': return 'date';
            case '606e209988b0ce43643205e9': return 'time';
            case '606e209988b0ce43643205e9': return 'time';

            default: return 'text';
        }
    }

    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="float-right">
                        <button className="btn btn-success" onClick={() => setShowModal(true)}> Agregar seccion </button>
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                {formSection.map((section, sectionIndex) => {
                    return (
                        <div className="col-12 mt-2">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title">
                                        <h6> {section.name} </h6>
                                        <div className="float-right">
                                            <button className="btn btn-success" onClick={() => handleShowModalLabel(sectionIndex)}> Agregar label </button>
                                            <button className="btn btn-link" onClick={() => handleRemoveSection(sectionIndex)}> x </button>
                                        </div>
                                    </div>
                                    <div className="card-text">
                                        <div className="table-responsive p-2">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Label</th>
                                                        <th>Tipo datos</th>
                                                        <th>Requerido</th>
                                                        <th>Valor defecto</th>
                                                        <th>Opciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {section.forms.map((form, formIndex) => {
                                                        return (
                                                            <tr key={`tr-${section.name}-form-${form.label}-${formIndex}`}>
                                                                <td>{form.label}</td>
                                                                <td>{dataTypes.filter(data => data._id == form.datatype)[0].name}</td>
                                                                <td>{form.required ? 'Si' : 'No'}</td>
                                                                <td>{form.defaultValue}</td>
                                                                <td>{form.options.join(',')}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
                }
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva seccion {show}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <div className="container">
                        <label>Nombre seccion:</label>
                        <input value={nameSection} type="text" className="form-control form-control-lg" onChange={(e) => setNameSection(e.target.value)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleAddSection()}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModalLabel} onHide={() => setShowModalLabel(false)} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo label </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label>Label:</label>
                                    <input value={formSectionLabel.label} type="text" className="form-control form-control-lg" onChange={(e) => setFormSectionLabel({ ...formSectionLabel, ['label']: e.target.value })} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Tipo de datos:</label>
                                    <select className="form-control" value={formSectionLabel.datatype} onChange={(e) => setFormSectionLabel({ ...formSectionLabel, ['datatype']: e.target.value })}>
                                        <option value="">Seleccionar</option>
                                        {dataTypes && dataTypes.map(option =>
                                            <option value={option._id} key={`section-label-${option._id}`}>{option.name} {option.type || ''} </option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group mt-4 pt-3">
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">Es requerido </label>
                                        <input className="form-check-input ml-2" type="checkbox" onChange={(e) => setFormSectionLabel({ ...formSectionLabel, ['required']: e.target.checked })} value={formSectionLabel.required} />
                                    </div>
                                </div>
                            </div>
                            {formSectionLabel.datatype && formSectionLabel.datatype !== '606e209988b0ce43643205ea' && formSectionLabel.datatype !== '606e209988b0ce43643205eb' && formSectionLabel.datatype !== '606e209988b0ce43643205ed' ?
                                <div className="col-12">
                                    <div className="form-group">
                                        <label>Valor por defecto:</label>
                                        <input value={formSectionLabel.defaultValue}
                                            type={handleSelectTypeInput(formSectionLabel.datatype)}
                                            className="form-control form-control-lg"
                                            onChange={(e) => setFormSectionLabel({ ...formSectionLabel, ['defaultValue']: e.target.value })}
                                        />
                                    </div>
                                </div>
                                : null
                            }

                            {(formSectionLabel.datatype == '606e209988b0ce43643205eb' || formSectionLabel.datatype == '606e209988b0ce43643205ea') &&
                                <>
                                    <div className="col-12">
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" placeholder="Agregar opcion" aria-describedby="button-addon2" value={nameOptionSection} onChange={(e) => setNameOptionSection(e.target.value)} />
                                            <div className="input-group-append">
                                                <button className="btn btn-outline-secondary" type="button" onClick={() => handleAddOptionFormSection()} >+</button>
                                            </div>
                                        </div>
                                    </div>
                                    {formSectionLabel.options.map((option, optionIdex) => {
                                        return (
                                            <div className="row col-12">
                                                <div className="col-8">
                                                    <span>{option}</span>
                                                </div>
                                                <div className="col-4">
                                                    <div className="float-right">
                                                        <button className="btn btn-light" onClick={() => handleRemoveOptionFormSection(optionIdex)}> - </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    }
                                </>
                            }
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleAddLabelSection()}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default SectionsTableCrmComponent;