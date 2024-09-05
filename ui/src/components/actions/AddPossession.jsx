import { useState } from "react";
import { Inputs } from "./Inputs";
import { BASE_URL } from "../../functions_constants/backendUrl";
import { useNavigate } from "react-router-dom";
import FluxRadio from "./FluxRadio";
import requestBody from "./correspondingRequestBody";
import { FaExclamationTriangle, FaCalendarAlt, FaDollarSign, FaPercent, FaTimesCircle, FaCheckCircle } from "react-icons/fa";

function AddPossession() {
    const [libelle, setLibelle] = useState('');
    const [valeur, setValeur] = useState('');
    const [dateDebut, setDateDebut] = useState(new Date());
    const [type, setType] = useState("Autres");
    const [jour, setJour] = useState(1);
    const [tauxAmortissement, setTauxAmortissement] = useState(0);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    function handleTypeChange(e) {
        setType(e.target.value);   
    }

    function isChecked(str) {
        return type === str;
    }

    function validate() {
        const newErrors = {};
        if (!libelle) {
            newErrors.libelle = "Le libellé est obligatoire.";
        }
        if (!valeur) {
            newErrors.valeur = "La valeur est obligatoire.";
        } else if (isNaN(valeur)) {
            newErrors.valeur = "N'entrez que des chiffres (sans aucune lettre ni unité d'argent)";
        }
        if (tauxAmortissement && isNaN(tauxAmortissement)) {
            newErrors.tauxAmortissement = "N'entrez que des chiffres pour le taux d'amortissement";
        }
        if (type !== "Autres" && (jour < 1 || jour > 31)) {
            newErrors.jour = "Le jour doit être compris entre 1 et 31.";
        }
        setErrors(newErrors);
        
        setTimeout(() => setErrors({}), 3500);

        return Object.keys(newErrors).length === 0;
    }

    const addPossession = async () => {        
        if (!validate()) {
            return;
        }

        try {
            const response = await fetch(BASE_URL + '/possession', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody( 
                    type,  
                    libelle,  
                    valeur,  
                    dateDebut,  
                    tauxAmortissement, 
                    jour)
                )
            });
            
            if (response.ok) {
                setLibelle('');
                setValeur('');
                setDateDebut(new Date());
                setTauxAmortissement(0);
                setType("Autres");
                setJour(1);
                setErrors({});
                setSuccessMessage('Possession ajoutée avec succès !');
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate("/possession");
                }, 5000);
            } else {
                console.error('Erreur lors de l\'ajout de la possession:', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la possession:', error);
        }
    }

    const cancelAdd = () => {
        navigate('/possession');
    }

    return (
        <main className="main bg-light py-5">
            <div className="container mb-8 w-75">
                <div className="row justify-content-center">
                    <aside className="card col-md-8">
                        <div className="card-body p-4 rounded shadow-lg bg-white">
                            <h3 className="text-center mb-4 text-primary font-weight-bold">
                                ✨ Ajouter une Nouvelle Possession
                            </h3>
                            <p className="lead text-center text-muted mb-4">
                                Enregistrez vos possessions avec précision pour un suivi optimal de leur valeur et une gestion efficace de votre patrimoine.
                            </p>
                            {successMessage && (
                                <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
                                    <FaCheckCircle className="me-2" />
                                    <div>{successMessage}</div>
                                </div>
                            )}

                            <div className="form-group mb-3">
                                <label className="form-label d-flex align-items-center">
                                    <FaDollarSign className="me-2" /> Libellé :
                                </label>
                                <Inputs 
                                    className="form-control"
                                    field={libelle} 
                                    setField={setLibelle} 
                                    type="text" 
                                    placeholder="Nom de la possession ..."
                                />
                                {errors.libelle && <div className="text-danger mt-2">
                                    <FaExclamationTriangle /> {errors.libelle}
                                </div>}
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label d-flex align-items-center">
                                    <FaDollarSign className="me-2" /> Valeur :
                                </label>
                                <Inputs 
                                    className="form-control"
                                    field={valeur} 
                                    setField={setValeur}
                                    type="text" 
                                    placeholder="Valeur de la possession ... Ex : 100005.4865"
                                />
                                {errors.valeur && <div className="text-danger mt-2">
                                    <FaExclamationTriangle /> {errors.valeur}
                                </div>}
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label d-flex align-items-center">
                                    <FaCalendarAlt className="me-2" /> Date de commencement
                                </label>
                                <input
                                    className="form-control shadow-sm"
                                    type="date"
                                    name="evaluationDate"
                                    id="date"
                                    onChange={(e) => setDateDebut(new Date(e.target.value))}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label d-flex align-items-center">
                                    <FaPercent className="me-2" /> Taux d`amortissement :
                                </label>
                                <Inputs 
                                    className="form-control"
                                    field={tauxAmortissement} 
                                    setField={setTauxAmortissement} 
                                    type="text"
                                    placeholder="Taux d'amortissement ... Ex : -5.785 ou 12.5"
                                />
                                {errors.tauxAmortissement && <div className="text-danger mt-2">
                                    <FaExclamationTriangle /> {errors.tauxAmortissement}
                                </div>}
                            </div>
                            <div className="form-group mb-4">
                                <label className="form-label d-flex align-items-center">
                                    <FaExclamationTriangle className="me-2" /> Type :
                                </label>
                                <div className="d-flex gap-2">
                                    <FluxRadio checked={isChecked("Flux-entrant")} name="Flux-entrant" onChange={handleTypeChange} />
                                    <FluxRadio checked={isChecked("Flux-sortant")} name="Flux-sortant" onChange={handleTypeChange} />
                                    <FluxRadio checked={isChecked("Autres")} name="Autres" onChange={handleTypeChange} />
                                </div>
                            </div>
                            {type !== "Autres" && (
                                <div className="form-group mb-4">
                                    <label className="form-label d-flex align-items-center">
                                        <FaCalendarAlt className="me-2" /> Entrer un jour d`entrée ou de sortie du flux
                                    </label>
                                    <input 
                                        type="number" 
                                        name="day" 
                                        placeholder='15'
                                        className='form-control'
                                        min="1" 
                                        max="31"
                                        value={jour}
                                        onChange={e => {
                                            const value = Number.parseInt(e.target.value);
                                            if (!isNaN(value) && value >= 1 && value <= 31) {
                                                setJour(value);
                                            }
                                        }}
                                    />
                                    {errors.jour && <div className="text-danger mt-2">
                                        <FaExclamationTriangle /> {errors.jour}
                                    </div>}
                                </div>
                            )}
                            <div className="text-center mt-4">
                                <button 
                                    className="btn btn-success btn-lg shadow-sm me-2"
                                    onClick={addPossession}
                                >
                                    <FaDollarSign className="me-2" /> Ajouter
                                </button>
                                <button 
                                    className="btn btn-secondary btn-lg shadow-sm"
                                    onClick={cancelAdd}
                                >
                                    <FaTimesCircle className="me-2" /> Annuler
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}

export default AddPossession;
