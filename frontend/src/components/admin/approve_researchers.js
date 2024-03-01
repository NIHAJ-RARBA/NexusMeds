import React from "react";
import { useState, useEffect } from "react";
import { Button, Container } from "reactstrap";
import { Alert } from "reactstrap";
import ApproveResearcherModal from "./approve_specific_researcher";

const ADMIN_APPROVE_RESEARCHERS = () => {

    const [userList, setuserList] = useState([]);
    const [permitList, setPermitList] = useState([]);


    const getUsers = async () => {
        try {
            const response = await fetch(`http://localhost:5000/researcher/get-Not-Verified`);
            const jsonData = await response.json();
            // console.log("User data:", jsonData); // Log fetched data
            setuserList(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };
    



    const deleteUser = async (email) => {
        try {
            const deleteUser = await fetch(`http://localhost:5000/researcher/delete/${email}`, {
                method: "DELETE"
            });

            getUsers();
            setuserList(userList.filter(user => user.email !== email));
        } catch (error) {
            console.error(error.message);
        }
    };


    const getAllPermits = async () => {
        var temp = [];
        for (let i = 0; i < userList.length; i++) {
            try {
                const response = await fetch(`http://localhost:5000/researcher/getPermit/${userList[i].email}`, {
                    method: "GET"
                });  
                const jsonData = await response.json();
                temp.push(jsonData);
                // console.log("Permit data:", jsonData); // Log fetched data
                
            } catch (error) {
                console.error(error.message);
            }
        }
        setPermitList(temp);
        // console.log("Permit List:", permitList); // Log fetched data
    };
    

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        getAllPermits();
    }, [userList]);


    const handleApprove = (user) => {
        // Logic to approve the researcher
        console.log("Approved:", user);
    };

    const handleReject = (user, reason) => {
        // Logic to reject the researcher
        console.log("Rejected:", user);
        console.log("Reason:", reason);
    };


    
    return (
        <div className="ADMIN_APPROVE_RESEARCHERS">
            <div style={{ marginTop: '115px' }}></div>
            <Container>
            <h2 className="text-center mt-5"><u> All Unapproved Researchers</u></h2>
            {userList.length === 0 ? (
                <Alert color="info" className="text-center mt-3" style={{height: '100px', fontSize: '40px' }}>No pending researchers</Alert>
            ) : (
                <table className="table mt-5 text-center">
                    <thead>
                        <tr>
                            <th>Profile Picture</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>View Details</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((user, index) => (
                            <tr key={user.researcher_id}>
                                <td><img src={user.image} alt="User Icon" style={{ width: 'auto', height: '60px', marginLeft: '10px' }} /></td>
                                <td>{user.researcher_name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <ApproveResearcherModal user={user} permit={permitList[index]} />
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteUser(user.email)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            </Container>
         
            <br />
            <br />
            <button className="btn btn-warning" onClick={() => {

                localStorage.removeItem("token");
                window.location.href = "/";
            }

            }> Return to home page </button>

        </div>
    );
};

export default ADMIN_APPROVE_RESEARCHERS;