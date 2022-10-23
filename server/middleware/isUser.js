function isUser() {
    return (req,res,next) => {
        if (!req.user){
            res.status(491).json({message: 'Not authorized - please login'})
        } else {
            next();
        }
    }
}

module.exports = {
    isUser,
}