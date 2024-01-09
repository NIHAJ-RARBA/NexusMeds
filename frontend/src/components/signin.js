import React from "react";


const SIGNIN = () => {



    return (
        <div className="SIGNIN">
            <br />
            <br />
            <button className="btn btn-warning" onClick={() => {
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

                localStorage.removeItem("token");
                window.location.href = "/";
            }

            }> See home page </button>

        </div>
    );
};

export default SIGNIN;