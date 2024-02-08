import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; // Importing useParams hook
import { Image } from 'react-bootstrap';

const SpecificChemical = () => { // Remove props from function parameters
    const { id } = useParams(); // Extracting id from URL params using useParams hook
    const [chemical, setChemical] = useState({});
    const [manufacturer, setManufacturer] = useState({});
    const [parent_chemical, setParentChemical] = useState({});

    useEffect(() => {
        
        fetch('http://localhost:5000/chemical/get/' + id) // Using id from useParams hook
            .then(response => response.json())
            .then(data => {
                setChemical(data);
                fetch('http://localhost:5000/manufacturers/' + data.manufacturer_id)
                    .then(response => response.json())
                    .then(data => {
                        setManufacturer(data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                if (data.parent_chemical_id != null) {
                    fetch('http://localhost:5000/chemical/' + data.parent_chemical_id)
                        .then(response => response.json())
                        .then(data => {
                            setParentChemical(data);
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [id]); // Using id in the dependency array

    return (
        <div>
            <h3>Chemical Details</h3>
            <table>
                <tbody>
                    <tr>
                        <td>Chemical Name</td>
                        <td>{chemical.chem_name}</td>
                    </tr>
                    <tr>
                        <td>Chemical Image</td>
                        <td><Image src={chemical.image} alt={chemical.image} style={{ maxWidth: '50%', height: 'auto' }} /></td>
                    </tr>
                    <tr>
                        <td>IUPAC Name</td>
                        <td>{chemical.iupac_name}</td>
                    </tr>
                    <tr>
                        <td>Manufacturer</td>
                        <td><Link to={"/manufacturer/" + manufacturer.manufacturer_id}>{manufacturer.manufacturer_name}</Link></td>
                    </tr>
                    <tr>
                        <td>Parent Chemical</td>
                        <td><Link to={"/chemical/" + parent_chemical.chemical_id}>{parent_chemical.chem_name}</Link></td>
                    </tr>
                    <tr>
                        <td>Chemical Formula</td>
                        <td>{chemical.chemical_formula}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>{chemical.description}</td>
                    </tr>
                    <tr>
                        <td>Molecular Weight</td>
                        <td>{chemical.molecular_weight}</td>
                    </tr>
                    <tr>
                        <td>Price</td>
                        <td>{chemical.price}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default SpecificChemical; // Don't forget to export the component
