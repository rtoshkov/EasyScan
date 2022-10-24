const {SHEETS} = require("../config");

function sheetMapper(sheetName){
    const mapper = {
        telus: SHEETS.TELUS_INVENTORY,
        infinity: SHEETS.INFINITY_INVENTORY,
        plovdiv: SHEETS.PLOVDIV_INVENTORY,
    }

    if (mapper[sheetName]){
        return mapper[sheetName];
    }
    return null;
}

module.exports = sheetMapper;