const {verifyToken} = require("../services/user");
module.exports = () => (req, res, next) =>{
    const token = req.headers['x-authorization'];
    try{
        if(token){
            const userData = verifyToken(token);
            req.user = userData;
            console.log(req.user);
        }
    } catch(err){
        console.log('Invalid token');
    }
    next();
}