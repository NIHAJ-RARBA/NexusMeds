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
                localStorage.removeItem("token");
            }
            }> See All Users </button>

            <br />
            <br />
            <button className="btn btn-warning" onClick={() => {
                window.location.href = "/signup";
                localStorage.removeItem("token");
            }
            }> Sign Up </button>


            <br />
      <br />
      <button className="btn btn-warning" onClick={() => {
        window.location.href = "/signin";
        localStorage.removeItem("token");
      }
      }> Sign In </button>


            <br />
            <br />
            <button className="btn btn-warning" onClick={() => {

                localStorage.removeItem("token");
                window.location.href = "/";
            }

            }> See home page </button>
</container>

            <VIEWMEDICINES />
        </div>
    );
};

export default HOMEPAGE;