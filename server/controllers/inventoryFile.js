const router = require('express').Router();


router.get('/', async (req,res) => {
    try{
        const data = 'WORKING';
        res.json(data);
    }catch(err){
        res.status(400).json('Oppps Error on our end!');
    }
})


// router.post('/', async(req,res)=>{
//     const figure = {};
//     try{
//
//     }
// })


module.exports = router;