const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "Authentication required"
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            error: "Authentication token missing"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (!decoded.customerId) {
            console.error(
                "JWT does not contain customerId:",
                decoded
            );

            return res.status(401).json({
                error: "Invalid customer information in token"
            });
        }

        req.customerId = decoded.customerId;

        console.log(
            "Authenticated customer:",
            req.customerId
        );

        next();

    } catch (error) {
        console.error(
            "JWT verification error:",
            error.message
        );

        return res.status(401).json({
            error: "Invalid or expired token"
        });
    }
}

module.exports = authenticateToken;