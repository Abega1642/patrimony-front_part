import { useState, useEffect } from "react";
import { BASE_URL } from "../../functions_constants/backendUrl.js";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { FaCalendarAlt, FaMoneyBillWave, FaArrowUp, FaArrowDown } from "react-icons/fa";

function PatrimonyValue() {
    const [patrimonyValueAtNow, setPatrimonyValueAtNow] = useState(0);
    const [patrimonyValueAtSelectedDate, setPatrimonyValueAtSelectedDate] = useState(0);
    const [evaluationDate, setEvaluationDate] = useState(new Date());
    const [data, setData] = useState(new Date());

    useEffect(() => {
        async function fetchDatas() {
            const response = await fetch(BASE_URL + '/patrimoine/' + `${new Date().toISOString().split('T')[0]}`);
            const result = await response.json();
            setPatrimonyValueAtNow(result.value);
        }
        fetchDatas();
    }, []);

    useEffect(() => {
        async function fetchDatas2() {
            const response = await fetch(BASE_URL + '/patrimoine/' + `${evaluationDate.toISOString().split('T')[0]}`);
            const result = await response.json();
            setPatrimonyValueAtSelectedDate(result.value);
        }
        fetchDatas2();
    }, [evaluationDate]);

    const transfertValue = (e) => {
        setData(new Date(e.target.value));
    }
    const handleDateChange = () => {
        setEvaluationDate(data);
    };

    return (
        <Container className="py-5" style={{ backgroundColor: '#f4f6f9' }}>
            <Row className="mb-4">
                <Col>
                    <Card className="shadow-lg rounded-lg border-0 mb-4">
                        <Card.Body>
                            <h2 className="text-center text-primary mb-4">
                                <FaMoneyBillWave className="me-2" />
                                Évaluez la Puissance de Votre Patrimoine
                            </h2>
                            <p className="lead mb-4 text-center">
                                Découvrez la valeur actuelle de votre patrimoine en ce jour précieux du{" "}
                                <span className="fw-bold">
                                    {new Date().toLocaleDateString("fr-FR", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                    })}
                                </span>.
                            </p>
                            <Form className="d-flex align-items-center justify-content-center">
                                <Form.Group className="me-3">
                                    <Form.Label className="fw-bold fs-5 text-muted">
                                        Valeur Actuelle :
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={`${patrimonyValueAtNow} Ar`}
                                        readOnly
                                        className="text-primary fs-5 text-center"
                                        style={{ backgroundColor: '#ffffff', borderColor: '#dee2e6' }}
                                    />
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col>
                    <Card className="shadow-lg rounded-lg border-0 mb-4">
                        <Card.Body>
                            <h2 className="text-center text-primary mb-4">
                                <FaCalendarAlt className="me-2" />
                                Évaluez Votre Patrimoine à une Date Spécifique
                            </h2>
                            <Form>
                                <Form.Group className="mb-4">
                                    <Form.Label className="text-muted">
                                        Sélectionnez la date pour évaluer la valeur de votre patrimoine :
                                    </Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="evaluationDate"
                                        id="date"
                                        onChange={transfertValue}
                                        style={{ backgroundColor: '#ffffff', borderColor: '#dee2e6' }}
                                    />
                                </Form.Group>
                                <div className="text-center mb-4">
                                    <Button
                                        variant="success"
                                        onClick={handleDateChange}
                                    >
                                        Valider
                                    </Button>
                                </div>
                                <Card className="bg-light shadow-sm rounded-lg">
                                    <Card.Body>
                                        <h3 className="text-center mb-3">Évaluation pour :</h3>
                                        <p className="text-center mb-2">
                                            Le jour du{" "}
                                            <strong>
                                                {evaluationDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </strong>
                                            :
                                        </p>
                                        <Form className="d-flex align-items-center justify-content-center">
                                            <Form.Label className="m-1 text-muted">
                                                Valeur :
                                            </Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                value={`${patrimonyValueAtSelectedDate} Ar`} 
                                                readOnly 
                                                className="text-primary fs-5 text-center"
                                                style={{ backgroundColor: '#ffffff', borderColor: '#dee2e6' }}
                                            />
                                        </Form>
                                        <div className="text-center mt-3">
                                            {patrimonyValueAtSelectedDate > patrimonyValueAtNow ? (
                                                <FaArrowUp className="text-success fs-4" />
                                            ) : (
                                                <FaArrowDown className="text-danger fs-4" />
                                            )}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default PatrimonyValue;
