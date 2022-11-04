const {GoogleSpreadsheet} = require('google-spreadsheet');
const {KEY} = require('../config');
const sheetMapper = require('../utils/googleSheetMapper');
const CELL_POSITION = require('../utils/cellPosition');

function stringifyTrimAndLower(word){
    return word.toString().trim().toLowerCase()
}

async function getFile(sheetAddress){
    const doc = new GoogleSpreadsheet(sheetMapper(sheetAddress));
    await doc.useServiceAccountAuth({
        client_email: KEY.client_email,
        private_key: KEY.private_key,
    })
    await doc.loadInfo()
    return doc;
}

async function writeToFile(sheetAddress, sheetName, sheetColumn, data, givenTo) {
    let doc = await getFile(sheetAddress);
    const sheet = await doc.sheetsByTitle[sheetName];
    const column = CELL_POSITION[sheetName][sheetColumn];
    const givenToColumn = CELL_POSITION[sheetName]['givenTo']
    await sheet.loadCells(`${givenToColumn}2:${column}`);
    let cells = await sheet.getCellsInRange(`${column}2:${column}`) || [];
    const allCellsString = cells.map((cell) => cell.join(''));
    let nextCell = cells.length + 2;
    let info = {};

    data.forEach((serial) => {
        const isAlreadyIncluded = allCellsString.findIndex(
            (cell) => stringifyTrimAndLower(cell) === stringifyTrimAndLower(serial)
        )
        if (serial && !(isAlreadyIncluded === -1)) {
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

// async function deleteFromFile(sheetAddress, sheetName, data, destination){
//     let doc = await getFile(sheetAddress);
//
// }

module.exports = {
    writeToFile,
}