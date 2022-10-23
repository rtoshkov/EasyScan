const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {JWT_SECRET} = require('../config');

const User = require('../models/User');

const notAllowed = [];

function createToken(user){
    const signToken = jwt.sign({
        username: user.username,
        _id:user._id,
    }, JWT_SECRET);

    return{
        username: user.username,
        _id: user._id,
        accessToken: signToken,
    }
}

async function register(username, password){
    const existing = await User.findOne({username: new RegExp(`^${username}$`, 'i')});

    if(existing){
        //TODO Streamline Erorrs
        throw new Error('Username already exists');
    }

    const user = new User({
        username,
        hashedPassword: await bcrypt.hash(password, 10),
    })

    await user.save();
    return createToken(user);
}


async function login(username,password){
    const user = await User.findOne({username: new RegExp(`^${username}$`, 'i')});

    if(!user){
        //TODO Streamline Erorrs
        throw new Error('Incorrect username or password');
    }

    const match = await bcrypt.compare(password, user.hashedPassword);

    if(!match){
        throw new Error('Incorrect username or password');
    }

    return createToken(user);
}

async function logout(token){
    notAllowed.push(token);
}

function verifyToken(token){
    if (notAllowed.includes(token)){
        //TODO Streamline Erorrs
        throw new Error('Token is invalid');
    }
    const payload = jwt.verify(token, JWT_SECRET);
    return {
        username: payload.username,
        _id: payload._id,
        accessToken: token,
    }
}


module.exports = {
    login,
    register,
    verifyToken,
    logout,
}