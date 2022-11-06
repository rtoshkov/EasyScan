const router = require('express').Router();
const requestValidator = require('../utils/requestValidator');
const {isUser} = require("../middleware/isUser");
const recordAnalyzer = require("../utils/recordAnalyzer");

router.post('/', isUser(), async (req, res) => {
        try {
            const record = requestValidator(req);
            const response = await recordAnalyzer(record);

            res.json({
                'status': `the data has been sent to ${record.sheetAddress} inventory File `,
                'notSaved': response.info,
                'sheet': record.sheetName,
            });
        } catch
            (err) {
            //TODO streamline errors
            res.status(400).json(`${err}`);
        }
    }
)


router.post('/transfer', isUser(), async (req, res) => {
        try {
            const record = requestValidator(req, true);
            const response = await recordAnalyzer(record, true);

            res.json({
                'status': `the data has been sent to ${record.sheetAddress} inventory File + deleted from every column on ${record.deleteFrom} - ${record.sheetName}`,
                'notSaved': response.info,
                'sheet': record.sheetName,
            });
        } catch
            (err) {
            //TODO streamline errors
            res.status(400).json(`${err}`);
        }
    }
)


module.exports = router;