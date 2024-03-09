import React from "react";
import Slider from "react-slick";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import indication from './medicine/indication.webp';

const DefaultSlider = () => {
    // Sample data for base cards
    const baseCardsData = [
        {
            id: 1,
            title: "Fever and Cold",
            text: "Explore our assortment of medications tailored to alleviate common cold symptoms and reduce fever, providing you with comfort and relief during illness.",
            indication: "Fever"
        },
        {
            id: 2,
            title: "Antibiotics",
            text: "Combat bacterial infections with confidence using our broad spectrum of antibiotics, carefully chosen to target specific pathogens and promote fast, effective recovery from illness.",
            indication: "Antibiotics"

        },
        {
            id: 3,
            title: "Nasal Decongestants",
            text: "Discover our range of decongestants, designed to provide relief from nasal congestion and sinus pressure, allowing you to breathe easier and feel more comfortable.",
            indication: "Decongestants"
        },
        {
            id: 4,
            title: "Allergy Relief",    
            text: "Experience relief from allergy symptoms and hives with our range of antihistamines, designed to provide fast and effective relief from itching, sneezing, and other allergic reactions.",
            indication: "Antihistamines"
        },
        {
            id: 5,
            title: "Pain Relief",
            text: "Find relief from various types of pain with our selection of medications, formulated to provide rapid and lasting relief, allowing you to regain comfort and get back to your daily activities with ease.",
            indication: "Pain"
        }
    ];

    // Function to navigate to the indication page
    const gotoIndication = (indication) => {
        window.location.href = `/viewotc/${indication}`;
    }

    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: false,
        initialSlide: 0,
        prevArrow: null, // Hide default prev arrow
        nextArrow: null, // Hide default next arrow
    };

    return (
        <Slider {...settings} style={{ marginTop: '50px' }}>
            {baseCardsData.map((card) => (
                <div key={card.id}>
                    <Card style={{ margin: "0 10px", borderRadius: '10px', height: '200px', width: 'auto', position: 'relative' }} className="bg-dark text-light" onClick={e => gotoIndication(card.indication)}>
                        {/* <CardImg src={indication} alt={`Image of ${card.title}`} style={{ height: '100%', width: 'auto', objectFit: 'cover' }} /> */}
                        <CardBody style={{ position: 'absolute', top:0, left: 0, right: 0 }}>
                            <CardTitle tag="h5"><b>{card.title}</b></CardTitle>
                            <CardText>{card.text}</CardText>
                        </CardBody>
                    </Card>
                </div>
            ))}
        </Slider>
    );
};

export default DefaultSlider;
