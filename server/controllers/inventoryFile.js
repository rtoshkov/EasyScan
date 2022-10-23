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
            givenTo: req.body.givenTo,
        }

        const result = await googleApi.getSheetInfo(
            record.sheetAddress,
            record.sheetName,
            record.columnName,
            record.data,
            record.givenTo,
        );
        res.json({
            'status': `the data has been sent to ${record.sheetAddress} inventory File `,
            'notSaved': result.info,
            'sheet': record.sheetName,
        });

    }catch(err){
        //TODO streamline errors
        res.status(400).json(`${err}`);
    }
})



module.exports = router;