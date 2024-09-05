import { useState } from "react";
import { Inputs } from "./Inputs";
import { BASE_URL } from "../../functions_constants/backendUrl";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaSave, FaTimes } from 'react-icons/fa';

function UpdatePossession() {
    const { id } = useParams();
    const [libelle, setLibelle] = useState('');
    const [dateFIn, setDateFin] = useState(null);
    const navigation = useNavigate();

    const updatePossession = async () => {
        try {
            let requestBody = {};

            if(dateFIn == null) {
                requestBody = {
                    "libelle": libelle
                }
            } else {
                requestBody = {
                    "libelle": libelle,
                    "dateFin": new Date(dateFIn)
                }
            }
            const response = await fetch(BASE_URL + '/possession/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                console.log(requestBody);
                console.log(BASE_URL + '/possession/' + id);

                setLibelle('');
                setDateFin(null);

                navigation("/possession");
            } else {
                console.error('Erreur lors de la mise à jour de la possession:', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la possession:', error);
        }
    }

    const cancelUpdate = () => {
        navigation('/possession');
    }

    return (
        <main className="main">
            <div className="container mb-8 w-m5 ext">
                <div className="row">
                    <aside className="card col-md-6 offset-md-3 mt-5 ext1 shadow-lg">
                        <h3 className="text-center mt-3 text-primary">
                            Éditez les détails de votre possession
                        </h3>
                        <div className="card-body">
                            <Inputs 
                                className="gp-3"
                                field={libelle} 
                                setField={setLibelle} 
                                type="text" 
                                label="Libellé :"
                                placeholder="Entrez le nouveau nom de la possession..."
                            />
                            <div className="mb-3">
                                <label>Date de fin</label>
                                <input
                                    className="form-control w-mx shadow-sm gp-3"
                                    type="date"
                                    name="evaluationDate"
                                    id="date"
                                    onChange={(e) => setDateFin(new Date(e.target.value))}
                                />
                            </div>
                            <div className="text-center">
                                <button 
                                    className="btn btn-success m-3"
                                    onClick={updatePossession}
                                >
                                    <FaSave /> Mettre à jour
                                </button>
                                <button 
                                    className="btn btn-danger m-3"
                                    onClick={cancelUpdate}
                                >
                                    <FaTimes /> Annuler
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    )
}

export default UpdatePossession;
