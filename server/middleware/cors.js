module.exports = () => (req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', ['X-Authorization', 'Content-Type']);
    res.setHeader('Access-Control-Allow-Methods', ['POST', 'GET', 'PUT', 'DELETE', 'HEAD', 'OPTIONS']);
    next();
}