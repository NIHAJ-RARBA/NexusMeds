import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';

const OrderConfirmation = ({ isOpen, toggle, price, userId }) => {

    const [newBillingAddress, setNewBillingAddress] = useState("");
    const [billingAddress, setBillingAddress] = useState(""); // State for the billing address
    const [isEditing, setIsEditing] = useState(false); // State to toggle editing mode

    const getCustomer = async () => {
        try {
            const response = await fetch(`http://localhost:5000/customer/get/${userId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            console.log('inside getCustomer');
            console.log(jsonData);
            if (jsonData && jsonData.billing_address) {
                setBillingAddress(jsonData.billing_address);
            } else {
                // Handle the case where billing address is not found
                console.log('Billing address not found');
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        if (userId) {
            getCustomer();
        }
    }, [userId]);

    const handleConfirmOrder = () => {
        console.log("Order confirmed!");
        console.log("New Billing Address:", billingAddress);
        createOrder();
        toggle();
    };

    const handleCancelOrder = () => {
        console.log("Order cancelled!");
        toggle();
    };

    const handleChangeClick = () => {
        setIsEditing(true); // Enable editing mode
    };

    const handleEnterNewAddress = () => {
        setBillingAddress(newBillingAddress);
        setIsEditing(false);
    };

    const goToCart = async () => {
        // Modify the URL to include the parameter
        
        try{

            console.log('inside goToCart  ' + '   ' + userId);

            const response = await fetch(`http://localhost:5000/cart/setstatus/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.token
                },
                body: JSON.stringify({
                    user_id: userId
                })
            });
            const jsonData = response.json();
            console.log(jsonData);

        }catch (error) {
            console.error(error.message);
        }

        const url = `/cart?param=true`;
        window.location.href = url;
    };
    

    const createOrder = async () => {
        try {
            const response = await fetch(`http://localhost:5000/order/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.token
                },
                body: JSON.stringify({
                    user_id: userId,
                    price : price,
                    billing_address: billingAddress
                })
            });
            const jsonData = await response.json();
            console.log(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Order Confirmation</ModalHeader>
            <ModalBody>
                <p>Payable Amount:  ৳{price}</p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                        {isEditing ? (
                            <>
                                <Label for="newBillingAddress">New Billing Address:</Label>
                                <Input
                                    type="text"
                                    name="newBillingAddress"
                                    id="newBillingAddress"
                                    value={newBillingAddress}
                                    onChange={(e) => setNewBillingAddress(e.target.value)}
                                    placeholder="Enter new billing address"
                                />
                            </>
                        ) : (
                            <p style={{ marginBottom: 0 }}>Billing Address: {billingAddress}</p>
                        )}
                    </div>
                    <div>
                        {isEditing ? (
                            <Button color="primary" onClick={handleEnterNewAddress}>Enter</Button>
                        ) : (
                            <Button color="secondary" onClick={handleChangeClick}>Change</Button>
                        )}
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={() => { handleConfirmOrder(); goToCart(); }}>Confirm Order</Button>{' '}
                <Button color="secondary" onClick={() => { handleCancelOrder();}}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default OrderConfirmation;
