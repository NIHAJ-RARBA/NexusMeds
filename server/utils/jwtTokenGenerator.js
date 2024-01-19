import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwTokenGenerator = (user_id) => {
    const payload = {
        user: {
            id: user_id
        }
    };

    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
};

export default jwTokenGenerator;