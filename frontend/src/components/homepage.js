import React from "react";
import VIEWMEDICINES from "./medicine/viewmedicines";


const HOMEPAGE = () => {




    return (
        <div className="HOMEPAGE ">

            <br />
            <h4> See pages </h4>
            <container>
            <br />
            <button className="btn btn-warning " onClick={() => {
                window.location.href = "/viewusers";
            }
            }> See All Users </button>

            <br />
            <br />
            <button className="btn btn-warning" onClick={() => {
                window.location.href = "/signup";
            }
            }> Sign Up </button>


            <br />
      <br />
      <button className="btn btn-warning" onClick={() => {
        window.location.href = "/signin";
      }
      }> Sign In </button>

<br />
            <br />
            <button className="btn btn-warning" onClick={() => {

                window.location.href = "/dashboard";
            }

            }> Dashboard </button>




</container>

            <VIEWMEDICINES />
            {/* // <VIEWCHEMISTS /> */}
        </div>
    );
};

export default HOMEPAGE;