const {SHEETS} = require("../config");

function sheetMapper(sheetName){
    const mapper = {
        telus: SHEETS.TELUS_INVENTORY,
    }

    if (mapper[sheetName]){
        return mapper[sheetName];
    }
    return null;
}

module.exports = sheetMapper;