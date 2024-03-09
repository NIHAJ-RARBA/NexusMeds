import React, { useState } from 'react';
import {
    Button,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const ADD_CHEMICAL = () => {
    const [formData, setFormData] = useState({
        chem_name: "",
        image: "",
        iupac_name: "",
        manufacturer_id: "2", // Default manufacturer ID
        chemical_formula: "",
        description: "",
        molecular_weight: "",
        price: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
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

    const sendChemicalData = async () => {
        try {
            const response = await fetch("http://localhost:5000/chemical/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const data = await response.json();
            return data;

        } catch (error) {
            throw new Error("Failed to add chemical!");
        }
    };

    const handleSubmit = async () => {
        try {
            // Check if any form item is empty
            for (const key in formData) {
                if (!formData[key]) {
                    toast.error(`Please fill out ${key.replace(/_/g, ' ')}`);
                    return;
                }
            }

            const addedChemical = await sendChemicalData();

            toast.success("Chemical added successfully!");
            // Redirect to the chemical's page or do something else
            window.location = `/admin_specificChem/${addedChemical.chemical_id}`;

        } catch (error) {
            console.error("Error submitting form:", error.message);
            toast.error("Failed to add chemical!");
        }
    };

    return (
        <div>
            <h2>Add New Chemical</h2>
            <div style={{ marginTop: '115px' }}></div>
            <div style={{ fontSize: '22px', paddingBottom: '30px', paddingTop: '20px' }}>
                <Label for="chemical_name">Chemical Information</Label>
            </div>
            <div className="SIGNUP" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%', margin: '0 auto' }}>
                <form style={{ width: '70%', margin: '0 auto' }}>
                    <FormGroup>
                        <Label for="chem_name">Chemical Name</Label>
                        <Input
                            type="text"
                            name="chem_name"
                            id="chem_name"
                            placeholder="Enter chemical name"
                            value={formData.chem_name}
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
                        <Label for="iupac_name">IUPAC Name</Label>
                        <Input
                            type="text"
                            name="iupac_name"
                            id="iupac_name"
                            placeholder="Enter IUPAC name"
                            value={formData.iupac_name}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="chemical_formula">Chemical Formula</Label>
                        <Input
                            type="text"
                            name="chemical_formula"
                            id="chemical_formula"
                            placeholder="Enter chemical formula"
                            value={formData.chemical_formula}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input
                            type="textarea"
                            name="description"
                            id="description"
                            placeholder="Enter description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="molecular_weight">Molecular Weight</Label>
                        <Input
                            type="text"
                            name="molecular_weight"
                            id="molecular_weight"
                            placeholder="Enter molecular weight"
                            value={formData.molecular_weight}
                            onChange={handleChange}
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
                        <Button type="button" onClick={handleSubmit} color="primary">Submit</Button>
                    </FormGroup>
                </form>
            </div>
        </div>
    );
};

export default ADD_CHEMICAL;