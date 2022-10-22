const {GoogleSpreadsheet} = require('google-spreadsheet');
const {KEY} = require('../config');
const sheetMapper = require('../utils/googleSheetMapper');

async function getSheetInfo(sheetAddress,sheetName){

    const doc = new GoogleSpreadsheet(sheetMapper(sheetAddress));
    await doc.useServiceAccountAuth({
        client_email: KEY.client_email,
        private_key: KEY.private_key,
    })
    await doc.loadInfo();
    const sheet = await doc.sheetsByTitle[sheetName];
    return sheet.getCellsInRange('A1:B1000');
}


module.exports = {
    getSheetInfo,
}