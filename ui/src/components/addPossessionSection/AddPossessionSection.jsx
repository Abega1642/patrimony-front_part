import { useNavigate } from "react-router-dom";
import { FaPlusCircle } from 'react-icons/fa';

function AddPossessionSection() {
    const navigation = useNavigate();

    const handleAddPossession = () => {
        navigation('/possession/create');
    };

    return (
        <section id="addPossessionSection" className="brd-styled mt-5 pb-7 mb-7 p-4 rounded shadow-lg bg-light">
            <div className="container">
                <h3 className="text-center my-3 text-primary font-weight-bold">
                    🚀 Ajoutez une Nouvelle Possession
                </h3>
                <p className="lead text-center text-muted">
                    Enregistrez une nouvelle possession dans votre patrimoine pour suivre
                    l`évolution de sa valeur et optimiser la gestion de vos biens.
                </p>
                <div className="text-center mt-4">
                    <button
                        className="btn btn-success btn-lg shadow-sm"
                        onClick={handleAddPossession}
                    >
                        <FaPlusCircle className="mr-2" /> Ajouter une possession
                    </button>
                </div>
            </div>
        </section>
    );
}

export default AddPossessionSection;
