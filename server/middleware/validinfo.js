export default function (req, res, next) {

    const { email, password, customer_name, phone, date_of_birth, image, gender, address, billing_address } = req.body;

    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }


    if (req.path === "/register") {
        console.log(!email.length);
        if (![email, customer_name, password , phone, date_of_birth, image, gender, address, billing_address].every(Boolean)) {
            return res.staus(401).json("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.staus(401).json("Invalid Email");
        }
    } else if (req.path === "/login") {
        if (![email, password].every(Boolean)) {
            return res.staus(401).json("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.staus(401).json("Invalid Email");
        }
    }

    next();
}; 