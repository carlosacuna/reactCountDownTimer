import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import HeaderCrmComponent from '../components/crm/headerCrmComponent';
import ListCrmComponent from '../components/crm/listCrmComponent';
import FormCrmComponent from '../components/crm/formCrmComponent';

const CrmContainer = () => {
    const [show, setShow] = useState('index');
    const [dataTypes, setDataTypes] = useState([]);
    const [list, setList] = useState([]);
    const [form, setForm] = useState({
        name: '',
        sections: {
            contacts: [],
            accounts: []
        }
    });

    const handleSaveData = async () => {

        if (form.sections.contacts.length == 0) return alert("Debes agregar seccion de contactos");

        try {
            const response = await axios.post('http://localhost:8443/?apiCode=5010', form);
            if (response.data.code == '5001') {
                alert("Crm creado exitosamente.");
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handelGetList = async () => {
        try {

            const response = await axios.get('http://localhost:8443/?apiCode=5011')

            if (response.data.code == '5001') {
                setList(response.data.msg.data);
            }

        } catch (error) {

            console.error(error);
        }
    }

    const handleChangeForm = (type, formData) => {

        let allForm = form
        allForm.sections[type] = formData;
        setForm(allForm);
    }

    const handleGetDataTypes = async () => {
        try {

            const response = await axios.get('http://localhost:8443/?apiCode=5017')

            if (response.data.code == '5001') {
                setDataTypes(response.data.msg.data);
            }

        } catch (error) {

            console.error(error);
        }
    }

    useEffect(() => {

        handelGetList();
        handleGetDataTypes();

    }, []);

    return (
        <Container fluid>
            <HeaderCrmComponent show={show} handleChangeShow={setShow} />
            <div>
                {show === 'index' &&
                    <ListCrmComponent
                        listData={list}
                        handelGetList={handelGetList}
                    />
                }
                {show === 'create' &&
                    <FormCrmComponent
                        handleSaveData={handleSaveData}
                        form={form}
                        handleChangeForm={handleChangeForm}
                        dataTypes={dataTypes}
                        setForm={setForm}
                    />
                }
            </div>
        </Container>
    );
}


export default CrmContainer;