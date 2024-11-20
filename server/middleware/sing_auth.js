const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const protect = async (req, res, next) => {
try {
  
    console.log("Authorization header:", req.headers.authorization);
  
    // Extract the token from the Authorization header
    let token = req.headers.authorization;
    
    // Check if the token starts with 'Bearer '
    if (token && token.startsWith("Bearer ")) {
      token = token.split(' ')[1];
    }
  
    console.log("Extracted Token:", token);
  
    if(!token) 
    return res.status(401).json({ message: 'Not authorized, token missing' });
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const users= await User.findById(decoded.userId).select('-password');
    console.log(users,"users");
    req.user=users;
    console.log(req.user._id,"idd");
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token invalid' });
  }
};

module.exports = { protect };
