import React, { useState, useEffect } from "react";

const VIEWUSERS = () => {
    const [userList, setuserList] = useState([]);
    const [userSpentList, setuserSpentList] = useState([]);
    const [userListWithSpent, setuserListWithSpent] = useState([]);

    const getUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/customer/getall");
            const jsonData = await response.json();
            setuserList(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    const deleteUser = async (email) => {
        try {
            const deleteUser = await fetch(`http://localhost:5000/customer/delete/${email}`, {
                method: "DELETE"
            });
            getUsers();
            setuserList(userList.filter(user => user.email !== email));
        } catch (error) {
            console.error(error.message);
        }
    };

    const getAllSpentAmounts = async () => {
        let temp = [];
        let tempUserList = [];
        for (let i = 0; i < userList.length; i++) {
            try {
                const response = await fetch(`http://localhost:5000/customer/totalspent`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: userList[i].customer_id
                    })
                });
                const jsonData = await response.json();
                temp.push(jsonData.sum);
                let tempUser = {
                    user: userList[i],
                    spent: jsonData.sum
                };

                tempUserList.push(tempUser);

            } catch (error) {
                console.error(error.message);
            }
        }
        setuserSpentList(temp);

        tempUserList.sort((a, b) => {
            return b.spent - a.spent;
        });

        setuserListWithSpent(tempUserList);
    };

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        getAllSpentAmounts();
    }, [userList]);

    return (
        <div className="VIEWUSERS">
            <div style={{ marginTop: '115px' }}></div>
            <h2 className="text-center mt-5"><u>All Users</u></h2>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Profile Picture</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Spent Amount</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {userList.map((user, index) => (
                        <tr key={user.customer_id}>
                            <td><img src={user.image} alt="User Icon" style={{ width: 'auto', height: '60px', marginLeft: '10px' }} /></td>
                            <td>{user.customer_name}</td>
                            <td>{user.email}</td>
                            <td>{userSpentList[index] ? '\u09F3' + userSpentList[index] : '\u09F3' + 0}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteUser(user.email)}>Delete</button>
                            </td>
                        </tr>
                    ))} */}

                    {userListWithSpent.map((user, index) => (
                        <tr key={user.user.researcher_id}>
                            <td><img src={user.user.image} alt="User Icon" style={{ width: 'auto', height: '60px', marginLeft: '10px' }} /></td>
                            <td>{user.user.researcher_name}</td>
                            <td>{user.user.email}</td>
                            <td>{user.spent ? '\u09F3' + user.spent : '\u09F3' + 0}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteUser(user.user.email)}>Delete</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <br />
            <br />
            <button className="btn btn-warning" onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
            }}> Return to home page </button>
        </div>
    );
};

export default VIEWUSERS;
