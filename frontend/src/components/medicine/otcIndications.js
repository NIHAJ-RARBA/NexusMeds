import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, CardTitle, Container } from "reactstrap";
import indicationImage from "./indication.webp";

const VIEWOTC = () => {
    const [indicationList, setIndicationList] = useState([]);

    const getIndications = async () => {
        try {
            const response = await fetch("http://localhost:5000/medicine/isOTC/true/indications");
            const jsonData = await response.json();
            setIndicationList(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    const countElements = async (indication) => {
        try {
            const response = await fetch(`http://localhost:5000/medicine/isOTC/true/indications/${indication}`);
            const jsonData = await response.json();
            
            console.log(indication);
            return jsonData.length;
        } catch (error) {
            console.error(error.message);
            return 0;
        }
    };

    const gotoMedicineByIndication = async (indication) => {
        try {
            const count = await countElements(indication);
            if (count > 0) {
                window.location = `/viewotc/${indication}`;
            } else {
                window.location = `/sorry`;
            }
        } catch (error) {
            console.error(error.message);
            // Redirect to sorry page in case of an error
            window.location = `/sorry`;
        }
    };

    useEffect(() => {
        getIndications();
    }, []);

    return (
        <Container>
            <div style={{ marginTop: '115px' }}></div>
            {/* <h2 className="text-center mt-5"><u>OTC MEDICINES</u></h2> */}
            <div className="row">
                {indicationList.map((indication, index) => (
                    <div key={index} className="col-md-3 mb-3">
                        <Card className="medicine-box" onClick={() => gotoMedicineByIndication(indication.indication)} style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.7)', border: '1px solid #ccc', backgroundColor: 'rgba(180, 250, 216)', height: '300px'}}>
                            <CardBody>
                                <CardTitle tag="h4"><b>{indication.indication}</b></CardTitle>
                                <img src={indicationImage} alt="Indication" style={{ maxWidth: '100%', maxHeight: '150px', position: 'absolute', bottom: '30px', left:'80px' }} />
                                {/* You can add additional details here if needed */}
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default VIEWOTC;
