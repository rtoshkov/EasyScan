const {GoogleSpreadsheet} = require('google-spreadsheet');
const {KEY} = require('../config');
const sheetMapper = require('../utils/googleSheetMapper');
const CELL_POSITION = require('../utils/cellPosition');

async function getSheetInfo(sheetAddress, sheetName, sheetColumn, data, givenTo) {
    let info = {};
    const doc = new GoogleSpreadsheet(sheetMapper(sheetAddress));
    await doc.useServiceAccountAuth({
        client_email: KEY.client_email,
        private_key: KEY.private_key,
    })

    await doc.loadInfo();
    const sheet = await doc.sheetsByTitle[sheetName];
    const column = CELL_POSITION[sheetName][sheetColumn];
    const givenToColumn = CELL_POSITION[sheetName]['givenTo']
    await sheet.loadCells(`${givenToColumn}2:${column}`);
    let cells = await sheet.getCellsInRange(`${column}2:${column}`) || [];

    const allCellsString = cells.join(' ');
    let nextCell = cells.length + 2;
    data.forEach((serial) => {
        if (serial && allCellsString.toLowerCase().includes(serial.toLowerCase())) {
            info[serial] = `already in that column`;
        } else {
            sheet.getCellByA1(`${column}${nextCell}`).value = serial;
            sheetColumn === 'given'
                ? sheet.getCellByA1(`${givenToColumn}${nextCell}`).value = givenTo
                : null;
            nextCell++;
        }
    })

    await sheet.saveUpdatedCells();
    return {
        sheet,
        info
    };
}


module.exports = {
    getSheetInfo,
}