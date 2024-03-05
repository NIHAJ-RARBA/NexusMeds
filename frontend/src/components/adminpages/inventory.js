import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button } from 'reactstrap';

const INVENTORY = () => {

    const [inventory, setInventory] = useState([]);
    const [isMedicine, setIsMedicine] = useState(false);
    const [quantityToBuy, setQuantityToBuy] = useState({});

    const getInventory = async () => {
        try {
            const response = await fetch(`http://localhost:5000/inventory/products`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isMedicine: isMedicine })
            });
            const parseRes = await response.json();
            console.log(parseRes);
            // Initialize quantityToBuy with zeros for each product
            const initialQuantityToBuy = {};
            parseRes.forEach(item => {
                initialQuantityToBuy[item.inventory_id] = 0;
            });
            setQuantityToBuy(initialQuantityToBuy);
            setInventory(parseRes);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleChemSwitchChange = () => {
        setIsMedicine(false);
        getInventory();
    };

    const handleMedSwitchChange = () => {
        setIsMedicine(true);
        getInventory();
    };

    const handleQuantityChange = (itemId, e) => {
        setQuantityToBuy(prevState => ({
            ...prevState,
            [itemId]: e.target.value
        }));
    };

    const buymoreProduct = async (isMedicine, productId, quantity) => {
        try {

            if (isMedicine) {
                await fetch(`http://localhost:5000/medicine/supply`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: productId, quantity: quantity })
                });
            } else {
                await fetch(`http://localhost:5000/chemical/supply`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: productId, quantity: quantity })
                });
            }
            getInventory();

        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getInventory();
    }, [isMedicine]);

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Inventory</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="row align-items-center">
                        <div className="col-auto">
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="flexSwitchCheckDefaultChem"
                                    checked={!isMedicine}
                                    onChange={handleChemSwitchChange}
                                />
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefaultChem" style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Chemicals</label>
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="flexSwitchCheckDefaultMed"
                                    checked={isMedicine}
                                    onChange={handleMedSwitchChange}
                                />
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefaultMed" style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Medicines</label>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Product Name</th>
                                    <th>Image</th>
                                    <th>Stocked Amount</th>
                                    <th>Sold Amount</th>
                                    <th>Supply Request</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventory.map((item) => (
                                    <tr key={item.inventory_id}>
                                        {isMedicine ? (
                                            <>
                                                <td>{item.medicine_id}</td>
                                                <td>{item.med_name}</td>
                                                <td><img src={item.image} alt="Product" style={{ width: '100px', height: '100px', objectFit: 'contain' }} /></td>
                                                <td>{item.stocked_amount}</td>
                                                <td>{item.sold_amount}</td>
                                                <td style={{ justifyContent: 'center' }}>
                                                    <div className="input-group" style={{ width: '150px' }}>
                                                        <input
                                                            type="text"
                                                            className="form-control text-center"
                                                            value={quantityToBuy[item.inventory_id]}
                                                            onChange={(e) => handleQuantityChange(item.inventory_id, e)}
                                                            style={{ width: '50px', fontSize: '0.9rem', marginRight: '10px' }} // Added marginRight for space
                                                        />
                                                        <Button onClick={() => buymoreProduct(true, item.medicine_id, quantityToBuy[item.inventory_id])}>Add</Button>
                                                    </div>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td>{item.chemical_id}</td>
                                                <td>{item.chem_name}</td>
                                                <td><img src={item.image} alt="Product" style={{ width: '100px', height: '100px', objectFit: 'contain' }} /></td>
                                                <td>{item.stocked_amount}</td>
                                                <td>{item.sold_amount}</td>
                                                <td style={{ justifyContent: 'center' }}>
                                                    <div className="input-group" style={{ width: '150px' }}>
                                                        <input
                                                            type="text"
                                                            className="form-control text-center"
                                                            value={quantityToBuy[item.inventory_id]}
                                                            onChange={(e) => handleQuantityChange(item.inventory_id, e)}
                                                            style={{ width: '50px', fontSize: '0.9rem', marginRight: '10px' }} // Added marginRight for space
                                                        />
                                                        <Button onClick={() => buymoreProduct(false, item.chemical_id, quantityToBuy[item.inventory_id])}>Add</Button>
                                                    </div>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
};

export default INVENTORY;
