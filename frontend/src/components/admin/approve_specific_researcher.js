import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApproveResearcherModalButton = ({ user, permit }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () =>
    {
        
        setIsOpen(!isOpen);
    }

    const handleApprove = async () => {
        try {
            const response = await fetch(`http://localhost:5000/researcher/approve-researcher`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id : user.researcher_id })
            });
            if (response.ok) {
                toast.success("Researcher approved successfully");
            } else {
                toast.error("Failed to approve researcher");
            }
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to approve researcher");
        } finally {
            window.location.reload();
            toggle(); // Close the modal regardless of the outcome
        }
    };

    const handleReject = async () => {
        try {
            const response = await fetch(`http://localhost:5000/researcher/reject-researcher`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id : user.researcher_id })
            });
            if (response.ok) {
                toast.success("Researcher rejected successfully");
            } else {
                toast.error("Failed to reject researcher");
            }
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to reject researcher");
        } finally {
            window.location.reload();
            toggle(); // Close the modal regardless of the outcome
        }
    };

    useEffect(() => {
        console.log("User:", user);
        console.log("Permit:", permit);
    }
    , [user, permit]);


        


    return (
        <>
            <Button color="primary" onClick={toggle}>View Details</Button>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Approve Researcher</ModalHeader>
                <ModalBody>
                    <p>Do you want to approve the researcher?</p>
                    <p>Name: {user.researcher_name}</p>
                    <p>Email: {user.email}</p>
                    <h5>Permit:</h5>
                    <img src={permit} alt="Permit" style={{ maxWidth: "100%", height: "auto" }} />

                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={handleApprove}>Approve</Button>{' '}
                    <Button color="danger" onClick={handleReject}>Reject</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default ApproveResearcherModalButton;
