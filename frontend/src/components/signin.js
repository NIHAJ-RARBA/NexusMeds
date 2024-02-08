import React from "react";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label,
    Form,
    FormGroup
} from 'reactstrap';


const SIGNIN = ({setAuth}) => {

        

    // const [password, setPassword] = useState("");
    // const [confirmpassword, setConfirmPassword] = useState("");

    const [gender, setGender] = useState("");

    const [customer_name, setCustomerName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [phone, setPhone] = useState("");
    const [date_of_birth, setdate_of_birth] = useState("");
    const [image, setImage] = useState("");
    const [address, setAddress] = useState("");
    const [billing_address, setBillingAddress] = useState("");


    const onSave = async (e) => {

        e.preventDefault();

        try {
            const body = { email, password };
            console.log('Signing in with: ', body);
            
            const response = await fetch(`http://localhost:5000/auth/login/customer`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            
            const parseRes = await response.json();
            console.log(parseRes.token);
            

            if (parseRes.token) {

                localStorage.setItem("token", parseRes.token);
                
                // console.log(parseRes.token);
                
                
                // window.location = "/dashboard";
                setAuth(true);
                
                toast.success("Registered Successfully");
                console.log("Signed in successfully");

            }

            else {
                console.log(parseRes);
                setAuth(false);
                toast.error(parseRes);
            }

            
        } catch (error) {


            console.error('Error retrieving profile.', error.message);
            setAuth(false);
        }

    };

    return (
        <div>
        <div className="SIGNIN" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%', margin: '0 auto' }}>
            <Form style={{ width: '70%', margin: '0 auto' }}>
                

                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        type="text"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </FormGroup>


            </Form>
            
            <div><Button className="btn btn-warning" onClick={onSave} style={{ fontSize: '30px' }}>LOGIN</Button></div>
            
        </div>


        
        {/* <div className="navbuttons" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> */}
            <br />
            <br />
            <button className="btn btn-warning" onClick={() => {
                window.location.href = "/viewusers";
            }
            }> See All Users </button>

            <br />
            <br />
            <button className="btn btn-warning" onClick={() => {
                window.location.href = "/signup";
            }
            }> Sign Up </button>


            {/* <br />
      <br />
      <button className="btn btn-warning" onClick={() => {
        window.location.href = "/";
        localStorage.removeItem("token");
      }
      }> Sign In </button> */}


            <br />
            <br />
            <button className="btn btn-warning" onClick={() => {


                window.location.href = "/";
            }

            }> See home page </button>

        {/* </div> */}

        </div>
    );

};

export default SIGNIN;