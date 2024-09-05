import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { BASE_URL } from '../../functions_constants/backendUrl.js';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaDollarSign } from 'react-icons/fa';

export function PossessionsList() {
    const [possessions, setPossessions] = useState([]);
    const navigate = useNavigate();

    async function fetchDatas() {
        try {
            const response = await fetch(BASE_URL + '/possession');
            const data = await response.json();
            setPossessions(data);
        } catch (error) {
            console.error('Erreur lors du fetch des possessions:', error);
        }
    }

    async function close(index) {
        try {
            const libelle = possessions[index].libelle;
            const response = await fetch(`${BASE_URL}/possession/:${libelle}/close`, {
                method: 'PATCH',
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la fermeture de la possession');
            }
            fetchDatas();
        } catch (error) {
            console.error('Erreur lors de la fermeture de la possession:', error);
        }
    }

    const update = (lib) => {
        navigate(`/possession/:${lib}/update`);
    }
    
    useEffect(() => {
        fetchDatas();
    }, []);

    return (
        <>
            <h2 className="text-center my-5 text-primary font-weight-bold">
                <FaDollarSign className="me-2" /> Liste de Votre Patrimoine
            </h2>
            <Table striped bordered hover className="mt-5 mgr-10" id='possession'>
                <thead className="table-primary">
                    <tr>
                        <th>Libellé</th>
                        <th>Valeur</th>
                        <th>Date de Début</th>
                        <th>Date de Fin</th>
                        <th>Taux d`Amortissement</th>
                        <th>Valeur Actuelle</th>
                        <th>Actions</th> 
                    </tr>
                </thead>
                <tbody>
                    {
                        possessions.map((element, ind) => (
                            <tr key={ind}>
                                <td>{element.libelle}</td>
                                <td>{element.valeur}</td>
                                <td>{new Date(element.dateDebut).toLocaleDateString()}</td>
                                <td>{element.dateFin == null ? "---" : new Date(element.dateFin).toLocaleDateString()}</td>
                                <td>{element.tauxAmortissement} %</td>
                                <td>{Math.abs(element.actualValue)}</td>
                                <td>
                                    <Button 
                                        variant="outline-primary" 
                                        size="sm" 
                                        onClick={() => update(element.libelle)}
                                        className="me-2 rounded-pill"
                                    >
                                        <FaEdit /> Éditer
                                    </Button>
                                    <Button 
                                        variant="outline-danger" 
                                        size="sm" 
                                        onClick={() => close(ind)}
                                        className="rounded-pill"
                                    >
                                        <FaTrashAlt /> Clôturer
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    );
}
