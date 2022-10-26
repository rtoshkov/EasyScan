const router = require('express').Router();
const {isUser} = require("../middleware/isUser");
const {saveToNotion} = require("../services/notion");

router.post('/', isUser(), async (req, res) => {
        try {
            if(req.body.data === undefined || !Array.isArray(req.body.data)) {
                throw new Error('data property is required and it has to be array')
            }

            const result = await saveToNotion(req.body.data);
            res.json({message:'success', url: result.url});

        } catch
            (err) {
            //TODO streamline errors
            res.status(400).json(`${err}`);
        }
    }
)


module.exports = router;

