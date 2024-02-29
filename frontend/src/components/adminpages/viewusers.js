import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EDITPROFILE from "../editprofile";

const VIEWUSERS = () => {

    const editProfileVisible = false;
    const [userList, setuserList] = useState([]);

    const getUsers = async () => {

        try {
            const response = await fetch("http://localhost:5000/customer/getall");
            const jsonData = await response.json();

            console.log(jsonData);
            setuserList(jsonData);
        }
        catch (error) {
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

    const setEditProfileTrue = () => {
        editProfileVisible = true;
    };

    useEffect(() => {
        getUsers();
    }, []);

    
    return (
        <div className="VIEWUSERS">
            <div style={{ marginTop: '115px' }}></div>
            <h2 className="text-center mt-5"><u> All Users</u></h2>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        {/* <th>Edit</th> */}
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>


                    {userList.map(user => (
                        <tr key={user.user_id}>
                            <td>{user.customer_name} <br/>{user.profile_pic}</td>
                            <td>{user.email}</td>

                            {/* <td>
                                <td className="btn btn-warning">
                                    <EDITPROFILE user={user} />
                                </td>
                            </td>                             */}
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteUser(user.email)}>Delete</button>
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
            }

            }> Return to home page </button>

        </div>
    );
};

export default VIEWUSERS;