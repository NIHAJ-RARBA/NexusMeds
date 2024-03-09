import React, { useState } from 'react';
import {
    Button,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const ADD_MEDICINE = () => {

    const [formData, setFormData] = useState({
        med_name: "",
        price: "",
        image: "",
        generic_name: "",
        package_type: "",
        med_form: "",
        isOTC: false,
        manufacturer_id: "2",
        indication: "",
        dosage: "",
        dosageStrength: "",
        cautions: "",
    });

    const handleChange = (e) => {
        const { name, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : e.target.value;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : newValue,
        });
    };

    const handleProductUpload = async (e) => {
        
        console.log(e.target.files[0]);
        const file = e.target.files[0];

        const formDataFile = new FormData();
        formDataFile.append('product', file);

        try {
            const response = await fetch("http://localhost:5000/productUpload", {
                method: "POST",
                body: formDataFile,
            });

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const data = await response.json();
            console.log(data);
            setFormData({
                ...formData,
                image: data.downloadURL,
            });

        } catch (error) {
            console.error("Error uploading file:", error.message);
            toast.error("Failed to upload file!");
        }
    };

    const sendMedicineData = async () => {
        try {
            console.log('amit is here22', formData);
            const response = await fetch("http://localhost:5000/medicine/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            console.log('amit is here22', formData);

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const data = await response.json();
            console.log(data);
            return data;

        } catch (error) {
            throw new Error("Failed to add medicine!");
        }
    };

    const handleSubmit = async () => {
        try {
            
            // Check if any form item is empty
            for (const key in formData) {
                if (key !== 'isOTC' && !formData[key]) {
                    toast.error(`Please fill out ${key.replace(/_/g, ' ')}`);
                    return;
                }
            }

            console.log('amit is here33');

            const addedMedicine = await sendMedicineData();

            toast.success("Medicine added successfully!");
            window.location = `/admin_specificMed/${addedMedicine.medicine_id}`;

        } catch (error) {
            console.error("Error submitting form:", error.message);
            toast.error("Failed to add medicine!");
        }
    };

    return (
        <div>
            <h2>Add New Medicine</h2>
            <div style={{ marginTop: '115px' }}></div>
            <div style={{ fontSize: '22px', paddingBottom: '30px', paddingTop: '20px' }}>
                <Label for="customer_name">Medicine Information</Label>
            </div>
            <div className="SIGNUP" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%', margin: '0 auto' }}>
                <form style={{ width: '70%', margin: '0 auto' }}>

                    <FormGroup>
                        <Label for="med_name">Medicine Name</Label>
                        <Input
                            type="text"
                            name="med_name"
                            id="med_name"
                            placeholder="Enter medicine name"
                            value={formData.med_name}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="price">Price</Label>
                        <Input
                            type="number"
                            name="price"
                            id="price"
                            placeholder="Enter price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="image">Image</Label>
                        <Input
                            type="file"
                            name="product"
                            id="product"
                            placeholder="Enter image"
                            onChange={handleProductUpload}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="generic_name">Generic Name</Label>
                        <Input
                            type="text"
                            name="generic_name"
                            id="generic_name"
                            placeholder="Enter generic name"
                            value={formData.generic_name}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="package_type">Package Type</Label>
                        <Input
                            type="text"
                            name="package_type"
                            id="package_type"
                            placeholder="Enter package type"
                            value={formData.package_type}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="med_form">Medicine Form</Label>
                        <Input
                            type="text"
                            name="med_form"
                            id="med_form"
                            placeholder="Enter medicine form"
                            value={formData.med_form}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="checkbox"
                                name="isOTC"
                                id="isOTC"
                                checked={formData.isOTC}
                                onChange={handleChange}
                            />
                            {' '}Is OTC
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label for="indication">Indication</Label>
                        <Input
                            type="textarea"
                            name="indication"
                            id="indication"
                            placeholder="Enter indication"
                            value={formData.indication}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="dosage">Dosage</Label>
                        <Input
                            type="textarea"
                            name="dosage"
                            id="dosage"
                            placeholder="Enter dosage"
                            value={formData.dosage}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="dosageStrength">Dosage Strength (mg)</Label>
                        <Input
                            type="number"
                            name="dosageStrength"
                            id="dosageStrength"
                            placeholder="Enter dosage strength"
                            value={formData.dosageStrength}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="cautions">Cautions</Label>
                        <Input
                            type="textarea"
                            name="cautions"
                            id="cautions"
                            placeholder="Enter cautions"
                            value={formData.cautions}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button type="button" onClick={handleSubmit} color="primary">Submit</Button>
                    </FormGroup>
                </form>
            </div>
        </div>
    );
};

export default ADD_MEDICINE;