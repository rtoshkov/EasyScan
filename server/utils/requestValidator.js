const sheetMapper = require('./googleSheetMapper');
const CELLS_POZITION = require('./cellPosition');

function requestValidator(req){
    const sheet = sheetMapper(req.body.sheetAddress);
    const COLUMS = [
        'returned',
        'given',
        'serial',
    ]
    if(sheet == null){
        throw new Error(`no such sheet file: ${req.body.sheetAddress}`);
    }

    if(CELLS_POZITION[req.body.sheetName] === undefined){
        throw new Error(`i don't have a record for the following sheet: ${req.body.sheetName}`);
    }

    if(!COLUMS.includes(req.body.columnName)){
        throw new Error(`I don't have a record for the following column: ${req.body.columnName}`);
    }

    if(!Array.isArray(req.body.data)){
        throw new Error(`The data you send is incompatible. It has to be string array`)
    }

    if(typeof req.body.givenTo !== 'string'){
        throw new Error(`givenTo is mandatory field. Use empty string if not needed`)
    }

    if (req.body.save === undefined) {
        req.body.save = false;
    }

    // Convert to Set then back to Array
    let eliminateDuplicate = new Set(req.body.data);

    return {
        sheetAddress: req.body.sheetAddress,
        sheetName: req.body.sheetName,
        columnName: req.body.columnName.toLowerCase(),
        data: Array.from(eliminateDuplicate),
        givenTo: req.body.givenTo,
        save: req.body.save,
    }
}

module.exports = requestValidator;