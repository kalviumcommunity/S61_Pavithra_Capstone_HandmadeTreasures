const jwt = require('jsonwebtoken');
const adminModel = require('../Admin/adminSchema');  
const secretKey = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send({ message: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        const admin = await adminModel.findById(decoded.id);

        if (!admin) {
            throw new Error();
        }

        req.admin = { id: admin._id, email: admin.email };
        next();
    } catch (error) {
        console.error('Error authenticating admin:', error);
        res.status(401).send({ message: 'Invalid or expired token' });
    }
};

module.exports = verifyToken;
