import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EDITPROFILE from "./editprofile";

const VIEWUSERS = () => {

    const editProfileVisible = false;
    const [userList, setuserList] = useState([]);

    const getUsers = async () => {

        try {
            const response = await fetch("http://localhost:5000/users");
            const jsonData = await response.json();

            setuserList(jsonData);
        }
        catch (error) {
            console.error(error.message);
        }
    };


``
    const deleteUser = async (id) => {
        try {
            const deleteUser = await fetch(`http://localhost:5000/users/${id}`, {
                method: "DELETE"
            });

            setuserList(userList.filter(user => user.user_id !== id));
            getUsers();
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
            <h2 className="text-center mt-5"><u> All Users</u></h2>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>


                    {userList.map(user => (
                        <tr key={user.user_id}>
                            <td>{user.fullname} <br/>{user.profile_pic}</td>
                            <td>{user.email}</td>

                            <td>
                                <td className="btn btn-warning">
                                    <EDITPROFILE user={user} />
                                </td>
                            </td>                            
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteUser(user.person_id)}>Delete</button>
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