import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Button, Container, Row, Col, Input, FormGroup, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import OrderConfirmation from './OrderConfirmation'; // Import the OrderConfirmation component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlaceOrder = () => {
    const location = useLocation();
    const { medItems, quantity, user_id } = location.state;
    let discount = 10;
    let flag;
    const [prescriptionFile, setPrescriptionFile] = useState(null);
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    

    const handlePrescriptionChange = (e) => {
        setPrescriptionFile(e.target.files[0]);
    };

    for (let i = 0; i < medItems.length; i++) {
        if (medItems[i].isotc === false) {
            flag = true;
            break;
        } else {
            flag = false;
        }
    }

    const paymentMethods = ["Cash", "bKash", "Nagad", "Bank Transfer"];
    const deliveryServices = ["Standard Shipping", "Express Shipping", "Local Pickup"];

    const [paymentDropdownOpen, setPaymentDropdownOpen] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [deliveryDropdownOpen, setDeliveryDropdownOpen] = useState(false);
    const [selectedDeliveryService, setSelectedDeliveryService] = useState(null);
    const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);

    const togglePaymentDropdown = () => setPaymentDropdownOpen(!paymentDropdownOpen);
    const toggleDeliveryDropdown = () => setDeliveryDropdownOpen(!deliveryDropdownOpen);

    const handlePaymentSelection = (method) => {
        setSelectedPaymentMethod(method);
        setPaymentDropdownOpen(false);
    };

    const handleDeliverySelection = (service) => {
        setSelectedDeliveryService(service);
        if (service === "Standard Shipping") {
            setDeliveryCharge(50);
        } else if (service === "Express Shipping") {
            setDeliveryCharge(100);
        } else if (service === "Local Pickup") {
            setDeliveryCharge(0);
        }
        setDeliveryDropdownOpen(false);
    };

    const handlePlaceOrder = () => {
        if (flag && !prescriptionFile) {
            // Prescription required but not uploaded
            toast.error("Prescription is required for this order.");
        } else {
            setShowOrderConfirmation(true);
        }
    };

    return (
        <Container>
            <h1 className="text-center mt-5">My Order</h1>
            <Row>
                <Col md={8}>
                    {medItems.map(item => (
                        <Row key={item.medicine_id} className="mb-3">
                            <Card style={{ width: '100%' }}>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <CardImg top width="30%" src={item.image} alt={item.med_name} style={{ height: '80px', width: '80px', objectFit: 'contain' }} />
                                    <CardBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <div className='d-flex justify-content-between'>
                                            <div>
                                                <CardTitle tag="h5">{item.med_name}</CardTitle>
                                            </div>
                                            <div>
                                                <CardSubtitle tag="h6" className="mb-2 text-muted">Quantity: {quantity[item.medicine_id]}</CardSubtitle>
                                            </div>
                                            <div>
                                                <CardSubtitle tag="h6" className="mb-2 text-muted">Total Price: ৳{(item.price * quantity[item.medicine_id]).toFixed(2)}</CardSubtitle>
                                            </div>
                                        </div>
                                    </CardBody>
                                </div>
                            </Card>
                        </Row>
                    ))}
                </Col>
                <Col md={4}>
                    <Card className="p-3">
                        <CardTitle tag="h5">Order Summary</CardTitle>
                        <FormGroup>
                            {flag ? <b style={{ backgroundColor: 'hotpink' }}> Prescription Required </b> : <b style={{ backgroundColor: 'greenyellow' }}> No Prescription Required </b>}
                            {flag && (
                                <Input type="file" id="prescription" onChange={handlePrescriptionChange} />
                            )}
                        </FormGroup>
                        <FormGroup>
                            <div style={{ border: '1px solid #ccc', borderRadius: '4px', textAlign: 'center', padding: '1px' }}>
                                <CardSubtitle tag="h6" className="mb-2 text-muted" style={{ fontWeight: 'bold', margin: 'auto', fontSize: '14px', color: '#333' }}>MRP Total: ৳{medItems.reduce((acc, item) => acc + (item.price * quantity[item.medicine_id]), 0).toFixed(2)}</CardSubtitle>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div style={{ border: '1px solid #ccc', borderRadius: '4px', textAlign: 'center', padding: '1px' }}>
                                <CardSubtitle tag="h6" className="mb-2 text-muted" style={{ fontWeight: 'bold', margin: 'auto', fontSize: '14px', color: '#333' }}>Delivery Charge: ৳{selectedDeliveryService === "Standard Shipping" ? 50 : selectedDeliveryService === "Express Shipping" ? 100 : selectedDeliveryService === "Local Pickup" ? 0 : ""}</CardSubtitle>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div style={{ border: '1px solid #ccc', borderRadius: '4px', textAlign: 'center', padding: '1px' }}>
                                <CardSubtitle tag="h6" className="mb-2 text-muted" style={{ fontWeight: 'bold', margin: 'auto', fontSize: '14px', color: '#333' }}>Discount : ৳{discount} </CardSubtitle>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="paymentMethod">Select Payment Method</Label>
                            <Dropdown isOpen={paymentDropdownOpen} toggle={togglePaymentDropdown}>
                                <DropdownToggle caret>
                                    {selectedPaymentMethod || "Select Payment Method"}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {paymentMethods.map(method => (
                                        <DropdownItem key={method} onClick={() => handlePaymentSelection(method)}>{method}</DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                        </FormGroup>
                        <FormGroup>
                            <Label for="deliveryService">Select Delivery Service</Label>
                            <Dropdown isOpen={deliveryDropdownOpen} toggle={toggleDeliveryDropdown}>
                                <DropdownToggle caret>
                                    {selectedDeliveryService || "Select Delivery Service"}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {deliveryServices.map(service => (
                                        <DropdownItem key={service} onClick={() => handleDeliverySelection(service)}>{service}</DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                        </FormGroup>
                        <Button color="primary" block onClick={handlePlaceOrder}>Place Order</Button>
                    </Card>
                </Col>
            </Row>

            <OrderConfirmation isOpen={showOrderConfirmation} toggle={() => setShowOrderConfirmation(!showOrderConfirmation)} price={medItems.reduce((acc, item) => acc + (item.price * quantity[item.medicine_id]), 0).toFixed(2) - discount + deliveryCharge} userId={user_id} prescription = {prescriptionFile} />

            <ToastContainer />
        </Container>
    );
};

export default PlaceOrder;
