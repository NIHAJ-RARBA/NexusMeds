import React from "react";
import VIEWMEDICINES from "./medicine/viewmedicines";
import DefaultSlider from "./defaultSlider";


const HOMEPAGE = () => {




    return (
        <div className="HOMEPAGE ">
            <br />
            {/* <img src="https://img.freepik.com/free-photo/overhead-view-medical-pill-box-syringe-scissor-tweezers-beige-background_23-2148050623.jpg?w=1380&t=st=1708363779~exp=1708364379~hmac=e08bd4291ee8392e1018ff9fe6049a96fe34c79b8a8033780471e623c0125a0d" alt="medicine"  />   */}

            <div style={{ 
    backgroundImage: `url("https://img.freepik.com/free-photo/overhead-view-medical-pill-box-syringe-scissor-tweezers-beige-background_23-2148050623.jpg?w=1380&t=st=1708363779~exp=1708364379~hmac=e08bd4291ee8392e1018ff9fe6049a96fe34c79b8a8033780471e623c0125a0d")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '60vh',
    position: 'relative',
    overflow: 'hidden',
    zIndex: '1'
}}> 
    <div style={{
        position: 'absolute',
        top: '50%',
        left: '8%', // Adjust as needed
        transform: 'translateY(-50%)',
        color: 'black',
        fontSize: '6rem',
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        zIndex: '1' // Ensure text appears above the background image
    }}>
        NEXUSMEDS
    </div>
</div>


            <DefaultSlider />





            <VIEWMEDICINES />
            {/* // <VIEWCHEMISTS /> */}
        </div>
    );
};

export default HOMEPAGE;