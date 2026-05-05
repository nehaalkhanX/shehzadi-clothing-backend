const jwt = require('jsonwebtoken');

const authUser = async (req, res, next) => {
    // Extract token from request headers
    const { token } = req.headers;

    // Check if token exists
    if (!token) {
        return res.json({ 
            success: false, 
            message: 'Not Authorized Login Again' 
        });
    }

    try {
        // Verify the token using your JWT_SECRET from environment variables
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach the user ID to the request body so it can be used by the controller
        req.body.userId = token_decode.id;
        
        // Move to the next middleware or controller
        next();

    } catch (error) {
        console.log(error);
        res.json({ 
            success: false, 
            message: error.message 
        });
    }
};

module.exports = authUser;