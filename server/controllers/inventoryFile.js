const router = require('express').Router();
const googleApi = require('../services/googleSheets');

router.post('/', async (req,res) => {
    //TODO create request validator
    try{
        const record = {
            sheetAddress: req.body.sheetAddress,
            sheetName: req.body.sheetName,
            columnName: req.body.columnName,
            data: req.body.data,
        }

        const result = await googleApi.getSheetInfo(record.sheetAddress, record.sheetName);
        res.json(result);

    }catch(err){
        res.status(400).json(`Oppps Error on our end! ${err}`);
    }
})


// router.post('/', async(req,res)=>{
//     const figure = {};
//     try{
//
//     }
// })


module.exports = router;