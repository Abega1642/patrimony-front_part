export default function requestBody( 
    type,  
    libelle,  
    valeur,  
    dateDebut,  
    tauxAmortissement, 
    jour) {

    if(type != "Autres") {
        
        return (type == "Flux-entrant") ? {
            "possesseur": {
                        "nom": "John Doe"
                    },
            "libelle": libelle,
            "valeur": Number.parseFloat(valeur),
            "dateDebut": dateDebut,
            "dateFin": null,
            "jour": Number.parseInt(jour),
            "tauxAmortissement": Number.parseFloat(tauxAmortissement),
            "valeurConstante": Number.parseFloat(valeur)
        } : 
        {
            "possesseur": {
                        "nom": "John Doe"
                    },
            "libelle": libelle,
            "valeur": Number.parseFloat(valeur),
            "dateDebut": dateDebut,
            "dateFin": null,
            "jour": Number.parseInt(jour),
            "tauxAmortissement": Number.parseFloat(tauxAmortissement),
            "valeurConstante": -Number.parseFloat(valeur)
        }
    } else {
        return {
            "possesseur": {
                        "nom": "John Doe"
                    },
            "libelle": libelle,
            "valeur": Number.parseFloat(valeur),
            "dateDebut": dateDebut,
            "dateFin": null,
            "tauxAmortissement": Number.parseFloat(tauxAmortissement)
        }
    }
}