import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { BASE_URL } from '../../functions_constants/backendUrl';
import getMonthlyDates from '../../functions_constants/chartAbcisse';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FaChartLine, FaCalendarDay, FaCalendarAlt, FaSearch, FaExclamationTriangle } from 'react-icons/fa';
import DayPicker from './DayPicker';
import './chart.css';

function useDate(monthsAhead) {
    const [date, setDate] = useState(() => {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + monthsAhead);
        return currentDate;
    });

    return [date, setDate];
}

function LineChart() { 
    
    const [values, setValues] = useState([]);
    const [startDate, setStart] = useDate(-2);
    const [endDate, setEnd] = useDate(3);    
    const [day, setDay] = useState(3);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        getCurve();
    }, [])

    const validateDates = (start, end) => {
        const minEndDate = new Date(start);
        minEndDate.setMonth(minEndDate.getMonth() + 1);

        const newErrors = {};
        if (end < minEndDate) {
            newErrors.endDate = "Veuillez sélectionner une date distante d'au moins un mois de la date de début (Une date future).";
        }
        setErrors(newErrors);

        setTimeout(() => setErrors({}), 6000);

        return Object.keys(newErrors).length === 0;
    }

    const getCurve = async () => {
        if (!validateDates(startDate, endDate)) {
            return;
        }

        try {
            const post = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: "month",
                    start: new Date(startDate).toISOString(),
                    end: new Date(endDate).toISOString(),
                    day: day
                })
            };
            let response = await fetch(BASE_URL + '/patrimoine/range', post);

            if (response.ok) {
                let result = await response.json();
                if (result.patrimony_values && Array.isArray(result.patrimony_values)) {
                    setValues(result.patrimony_values);
                } else {
                    console.warn('Format des données inattendu:', result);
                }
            } else {
                console.error('Erreur de réponse:', response.status, response.statusText);
            }      
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    }

    const data = {
        labels: getMonthlyDates(startDate, endDate, day),
        datasets: [
            {
                label: 'Valeur de patrimoine',
                data: values,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    autoSkip: true,
                    maxRotation: 45,
                    minRotation: 45,
                },
            },
            y: {
                ticks: {
                    callback: function(value) {
                        return value.toLocaleString();
                    },
                },
            },
        },
    };

    return (
        <Container fluid className='py-5'>
            <Row className='mb-4'>
                <Col md={12} lg={6} className='mx-auto'>
                    <Card className='shadow-lg rounded-lg border-0 mb-4'>
                        <Card.Body className='card-body'>
                            <h3 className='chart-header'>
                                <FaChartLine className='me-2' />
                                Graphique des Valeurs de Patrimoine
                            </h3>
                            <div className='chart-container'>
                                <Line data={data} options={options} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className='mb-4'>
                <Col md={12} lg={6} className='mx-auto'>
                    <Card className='shadow-lg rounded-lg border-0 mb-4'>
                        <Card.Body className='card-body'>
                            <h3 className='chart-header'>
                                <FaCalendarAlt className='me-2' />
                                Observer l’Évolution de Votre Patrimoine
                            </h3>
                            <Form>
                                <Form.Group className='mb-3'>
                                    <Form.Label className='d-flex align-items-center'>
                                        <FaCalendarDay className='me-2 text-primary' />
                                        Sélectionner le début de l’évolution :
                                    </Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="dateDebut"
                                        id="dateDebut"
                                        onChange={e => setStart(new Date(e.target.value))}
                                    />
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label className='d-flex align-items-center'>
                                        <FaCalendarDay className='me-2 text-primary' />
                                        Sélectionner la fin de l’évolution :
                                    </Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="dateFin"
                                        id="dateFin"
                                        onChange={e => {
                                            const newEndDate = new Date(e.target.value);
                                            if (validateDates(startDate, newEndDate)) {
                                                setEnd(newEndDate);
                                            }
                                        }}
                                    />
                                    {errors.endDate && <div className="text-danger mt-2">
                                        <FaExclamationTriangle /> {errors.endDate}
                                    </div>}
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label className='d-flex align-items-center'>
                                        <FaCalendarDay className='me-2 text-primary' />
                                        Sélectionner la jour de l’évolution :
                                    </Form.Label>
                                    <DayPicker setDate={setDay}/>
                                </Form.Group>
                                    <div className='text-center'>
                                        <Button
                                            variant="primary"
                                            className='shadow-sm'
                                            onClick={getCurve}
                                        >
                                            <FaSearch className='me-2' />
                                            Voir l’Évolution
                                        </Button>
                                    </div>
                                </Form>
                                
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default LineChart;
