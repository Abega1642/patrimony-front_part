import { useState, useEffect } from "react";
import { BASE_URL } from "../../functions_constants/backendUrl";
import { FaRegSmileBeam, FaUserAlt } from "react-icons/fa";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Welcome.css"; // Assurez-vous d'avoir un fichier CSS pour les styles personnalisés

export default function Welcome() {
    const [owner, setOwner] = useState('');

    async function fetchDatas() {
        try {
            const response = await fetch(BASE_URL + '/possession');
            const data = await response.json();
            setOwner(data[0].possesseur.nom);
        } catch (error) {
            console.error('Erreur lors du fetch des possessions:', error);
        }
    }
    useEffect(() => {
        fetchDatas();
    }, []);

    return (
        <Container className="welcome-container">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="welcome-card shadow-lg border-light">
                        <Card.Body className="text-center">
                            <FaRegSmileBeam className="welcome-icon mb-3" />
                            <Card.Title className="mb-3">Bienvenue, {owner}!</Card.Title>
                            <Card.Text className="mb-4">
                                Nous sommes ravis de vous accueillir sur notre plateforme. Explorez toutes les fonctionnalités et gérez vos possessions avec facilité. <br />
                                Votre parcours vers une gestion optimale commence ici!
                            </Card.Text>
                            <FaUserAlt className="welcome-icon mb-2" />
                            <Card.Text className="lead">
                                Découvrez votre tableau de bord et commencez à explorer dès maintenant.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
