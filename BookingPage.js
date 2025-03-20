import React, { useState } from "react";
import { Container, Nav, Tab, Form, Button, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../components/Navbar"; // Import Navbar component
import Footer from "../components/Footer"; // Import Footer component

const BookingPage = () => {
    // State for stays (hotels)
    const [staySearch, setStaySearch] = useState({
        destination: "",
        date: "",
        travelers: "2 travelers, 1 room",
        addFlight: false,
        addCar: false,
    });

    // State for flights
    const [flightSearch, setFlightSearch] = useState({
        origin: "",
        destination: "",
        departureDate: "",
    });

    // State for cars
    const [carSearch, setCarSearch] = useState({
        pickUpLocation: "",
        dropOffLocation: "",
        pickUpDate: "",
        dropOffDate: "",
        pickUpTime: "",
        dropOffTime: "",
    });

    // Function to handle stays search
    const handleStaySearch = async () => {
        console.log('Stay search data:', staySearch); // Debugging log
        try {
            const response = await fetch('http://localhost:8080/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(staySearch),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Stay booking successful:', data);
            } else {
                console.error('Stay booking failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Function to handle flights search
    const handleFlightSearch = async () => {
        console.log('Flight search data:', flightSearch); // Debugging log
        try {
            const response = await fetch('http://localhost:8080/api/amadeus/flights', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Flight search successful:', data);
            } else {
                console.error('Flight search failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Function to handle cars search
    const handleCarSearch = async () => {
        console.log('Car search data:', carSearch); // Debugging log
        try {
            const response = await fetch('http://localhost:8080/api/amadeus/cars', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Car search successful:', data);
            } else {
                console.error('Car search failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Navbar user={null} /> {/* Add Navbar component */}
            <Container className="mt-5">
                <Tab.Container defaultActiveKey="stays">
                    <Nav variant="tabs" className="border-bottom mb-3">
                        <Nav.Item>
                            <Nav.Link eventKey="stays">Stays</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="flights">Flights</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="cars">Cars</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <Tab.Content>
                        {/* Stays Tab */}
                        <Tab.Pane eventKey="stays">
                            <Form className="shadow-sm p-3 bg-white rounded">
                                <Row className="g-2">
                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label>Where to?</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter destination"
                                                value={staySearch.destination}
                                                onChange={(e) => setStaySearch({ ...staySearch, destination: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group>
                                            <Form.Label>Dates</Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={staySearch.date}
                                                onChange={(e) => setStaySearch({ ...staySearch, date: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group>
                                            <Form.Label>Travelers</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={staySearch.travelers}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={2} className="d-flex align-items-end">
                                        <Button variant="primary" className="w-100" onClick={handleStaySearch}>
                                            Search
                                        </Button>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="Add a flight"
                                            checked={staySearch.addFlight}
                                            onChange={(e) => setStaySearch({ ...staySearch, addFlight: e.target.checked })}
                                        />
                                        <Form.Check
                                            type="checkbox"
                                            label="Add a car"
                                            checked={staySearch.addCar}
                                            onChange={(e) => setStaySearch({ ...staySearch, addCar: e.target.checked })}
                                        />
                                    </Col>
                                </Row>
                            </Form>
                        </Tab.Pane>

                        {/* Flights Tab */}
                        <Tab.Pane eventKey="flights">
                            <Form className="shadow-sm p-3 bg-white rounded">
                                <Row className="g-2">
                                    <Col md={3}>
                                        <Form.Group>
                                            <Form.Label>Leaving from</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter departure location"
                                                value={flightSearch.origin}
                                                onChange={(e) => setFlightSearch({ ...flightSearch, origin: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group>
                                            <Form.Label>Going to</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter destination"
                                                value={flightSearch.destination}
                                                onChange={(e) => setFlightSearch({ ...flightSearch, destination: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group>
                                            <Form.Label>Departure Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={flightSearch.departureDate}
                                                onChange={(e) => setFlightSearch({ ...flightSearch, departureDate: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3} className="d-flex align-items-end">
                                        <Button variant="primary" className="w-100" onClick={handleFlightSearch}>
                                            Search
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Tab.Pane>

                        {/* Cars Tab */}
                        <Tab.Pane eventKey="cars">
                            <Form className="shadow-sm p-3 bg-white rounded">
                                <Row className="g-2">
                                    <Col md={3}>
                                        <Form.Group>
                                            <Form.Label>Pick-up</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter pick-up location"
                                                value={carSearch.pickUpLocation}
                                                onChange={(e) => setCarSearch({ ...carSearch, pickUpLocation: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group>
                                            <Form.Label>Drop-off</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter drop-off location"
                                                value={carSearch.dropOffLocation}
                                                onChange={(e) => setCarSearch({ ...carSearch, dropOffLocation: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Group>
                                            <Form.Label>Pick-up time</Form.Label>
                                            <Form.Control
                                                type="time"
                                                value={carSearch.pickUpTime}
                                                onChange={(e) => setCarSearch({ ...carSearch, pickUpTime: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Group>
                                            <Form.Label>Drop-off time</Form.Label>
                                            <Form.Control
                                                type="time"
                                                value={carSearch.dropOffTime}
                                                onChange={(e) => setCarSearch({ ...carSearch, dropOffTime: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={2} className="d-flex align-items-end">
                                        <Button variant="primary" className="w-100" onClick={handleCarSearch}>
                                            Search
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Container>
            <Footer /> {/* Add Footer component */}
        </div>
    );
};

export default BookingPage;