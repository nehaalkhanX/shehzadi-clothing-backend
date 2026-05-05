const jwt = require('jsonwebtoken')

const adminAuth = async (req, res, next) => {

    try {

        const { token } = req.headers
        if (!token) {
            return res.status(400).json({
                message: "Not authorize please login as Admin"
            })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(400).json({
                message: "Not authorize please login as Admin"
            })
        }
        next()


    } catch(err) {
        console.log(err)
        res.status(401).json({
            message: err.message
        })
    }
}

module.exports = adminAuth;