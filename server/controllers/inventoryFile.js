const router = require('express').Router();
const googleApi = require('../services/googleSheets');
const requestValidator = require('../utils/requestValidator');

router.post('/', async (req,res) => {
    try{
        const record = requestValidator(req);
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