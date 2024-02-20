import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, CardTitle, Container } from "reactstrap";


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
                    <div key={index} className="col-md-4 mb-3">
                        <Card className="medicine-box" onClick={() => gotoMedicineByIndication(indication.indication)}>
                            <CardBody>
                                <CardTitle tag="h5">{indication.indication}</CardTitle>
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
