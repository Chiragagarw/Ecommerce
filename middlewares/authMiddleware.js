const User = require('../model/user');
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.SECRET);
            console.log(decoded); // This will include user._id

            const user = await User.findById(decoded.id).select('-password'); // Exclude the password field
            if (!user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            req.user = user; // Attach the user to the request object
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
            console.log(error);
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

module.exports = { protect, admin };
