const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user')

const signUp = async(req, res) => {
    try{
        // get the email and password off teh request body
        const{ email, password } = req.body

        // Generate a passwordHash
        const passwordHash = bcrypt.hashSync(password, 8);
    
        // Create a User with the Data
        await User.create({email, password : passwordHash})
    
        // Respond - 200 => Success
        res.sendStatus(200)

    }catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}

const login = async(req, res) => {

    try{
        // get the sent in email and password off the request body
        const{ email, password } = req.body

        console.log(email, password)
    
        // Find the user with the requested email
        const user = await User.findOne({email})
        if(!user){
            console.log("user not found")
            // 401 => unauthorized user
            return res.sendStatus(401)
        }
    
        // Compare sent-in password with the found-user passwwrodHash
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if(!passwordMatch){
            console.log("password do not match")
            // 401 => unauthorized user
            return res.sendStatus(401)
        }
    
        // If all the credentials are valid - Create a jwt token
        const millisecondsInADay = 24 * 60 * 60 * 1000;
        // const millisecondsInADay = 1000;
        const exp = Date.now() + (30 * millisecondsInADay);     //30 days expiration
        const jwtToken = jwt.sign(
            {
                sub: user._id ,     //Data we want to encrypt
                exp
            }, 
            process.env.SECRET_KEY      //Secret key which is used to encrypt the data
        );

        // Set the jwtToken as a cookie
        res.cookie("Authorization", jwtToken, {
            expires : new Date(Number(exp)),
            httpOnly : true,
            sameSite : 'lax',
            secure:process.env.NODE_ENV === 'production',
        })
    
        // send the jwt token
        res.sendStatus(200)

    }catch(err){
        console.log(err)
        res.sendStatus(401)
    }


}

const checkAuth = (req, res) => {
    try{
        console.log("req.user===========", req.user)
        res.sendStatus(200)
    }catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}

const logout = async(_, res) => {
    try{
        res.clearCookie("Authorization")
        res.sendStatus(200)
    }catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}

module.exports = {
    signUp,
    login,
    checkAuth,
    logout
}