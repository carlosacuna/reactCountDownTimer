import React from 'react';
import axios from 'axios';

const ListCrmComponent = ({ listData, handelGetList }) => {

    const handleDeleteCrm = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8443/?apiCode=5013&id=${id}`);
            if (response.data.code == '5001') {
                alert("Crm eliminado exitosamente.");
                handelGetList();
            } else {
                alert(response.data.msg.data);
            }
        } catch (error) {
            console.log(error)
            alert("El crm no se pudo eliminar");
        }
    }

    const handleChangeStatusCrm = async (id, status) => {
        try {
            const response = await axios.get(`http://localhost:8443/?apiCode=501${status == 'ACTIVE' ? '5' : '4'}&id=${id}`);
            if (response.data.code == '5001') {

                handelGetList();
            } else {
                alert(response.data.msg.data);
            }
        } catch (error) {
            alert("El crm no se pudo actualizar");
        }
    }

    return (
        <div className="col-12">
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Contactos</th>
                            <th>Empresas</th>
                            <th>Estado</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listData.map((item, index) => {
                            return (<tr key={`listData-${index}`}>
                                <td> {index + 1} </td>
                                {item.tr.map((itemTr, key) => {
                                    return (<td key={`listData-${itemTr.value}-${key}`}> { itemTr.value} </td>)
                                })}
                                <td>
                                    <button className={`btn btn-${item.tr[3].value == 'ACTIVE' ? 'danger' : 'success'}`} onClick={() => handleChangeStatusCrm(item.id, item.tr[3].value)}> {item.tr[3].value == 'ACTIVE' ? 'INACTIVAR' : 'ACTIVAR'} </button>
                                    <button className="btn ml-1 btn-danger" onClick={() => handleDeleteCrm(item.id)} > Borrar </button>
                                </td>
                            </tr>)
                        })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListCrmComponent;