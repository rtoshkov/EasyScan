const {SHEETS} = require("../config");

function sheetMapper(sheetName){
    const mapper = {
        telus: SHEETS.TELUS_INVENTORY,
        infinity: SHEETS.INFINITY_INVENTORY,
        plovdiv: SHEETS.PLOVDIV_INVENTORY,
        testTelus: SHEETS.TEST_TELUS_INVENTORY,
        testInfinity: SHEETS.TEST_INFINITY_INVENTORY,
        testPlovdiv: SHEETS.TEST_PLOVDIV_INVENTORY,
    }

    if (mapper[sheetName]){
        return mapper[sheetName];
    }
    return null;
}

module.exports = sheetMapper;