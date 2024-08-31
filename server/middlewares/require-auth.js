const jwt = require('jsonwebtoken')
const User = require('../models/user')


const requireAuth =  async(req, res, next) => {

    try{
        console.log("inside middleware")
    
        // Read the token off the cookie
        const token = req.cookies.Authorization;
    
    
        // Decode the token
        var decoded = jwt.verify(token, process.env.SECRET_KEY);


        // Check expiration
        if(Date.now() > decoded.exp) res.sendStatus(401)
    
    
        // Find the user with the decoded token - (which contains the user id)
        const user = await User.findById(decoded.sub)
        if(!user) return res.sendStatus(401)  // 401 => unauthorized
    

        // attach user to the request
        req.user = user
    
        // continue
        next()

    }catch(err){
        console.log(err)
        return res.sendStatus(401) // 401 => unauthorized
    }
    

}

module.exports = requireAuth