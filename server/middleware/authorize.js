import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.jwtSecret;

export default function (req, res, next) {
    // Get token from header
    const token = req.header("token");
    
    // Check if not token
    if (!token) {
        return res.status(403).json({ msg: "authorization denied" });
    }
    
    // Verify token
    try {
        const decoded = jwt.verify(token, jwtSecret);
        
        // set the payload to the user
        
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "token is not valid" });
    }
};

