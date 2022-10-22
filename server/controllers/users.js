const router = require('express').Router();
const api = require('../services/user');

router.post('/register', async(req,res)=> {
    try{
        //TODO Streamline Errors
        if(req.body.password.trim() === '' || req.body.username.trim() === ''){
            throw new Error('Username and password are required');
        }
        const result = await api.register(req.body.username.trim().toLowerCase(), req.body.password.trim());
        res.status(201).json(result);
    }catch(err){
        //TODO Streamline Errors
        res.status(400).json({message:`invalid parameters ... ${err}`})
    }
})

router.post('/login', async (req, res)=>{
    try{
        const result = await api.login(req.body.username.trim().toLowerCase(), req.body.password.trim());
        res.json(result);
    }catch(err){
        //TODO Streamline Errors
        res.status(400).json({message: 'Invalid username or password'})
    }
})

module.exports = router;