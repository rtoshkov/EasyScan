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
    const givenToColumn = CELL_POSITION[sheetName]['givenTo'];
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

async function deleteFromFile(sheetAddress, sheetName, data){
    let doc = await getFile(sheetAddress);
    const sheet = await doc.sheetsByTitle[sheetName];
    let columns = CELL_POSITION.COLUMNS_W_SERIALS;

    columns.forEach((columnName) => {
        deleteFromColumn(columnName, sheet, sheetName, data);
    })

}


async function deleteFromColumn(columnName, sheet, sheetName, data){
    let matchIndexes = [];
    const column = CELL_POSITION[sheetName][columnName];
    const givenToColumn = CELL_POSITION[sheetName]['givenTo'];
    await sheet.loadCells(`${givenToColumn}:${column}`);
    let cells = await sheet.getCellsInRange(`${column}:${column}`) || [];
    const allCellsString = cells.map((cell) => cell.join(''));

    data.forEach((item) => {
        const index = allCellsString.findIndex(
            (cell) => stringifyTrimAndLower(cell) === stringifyTrimAndLower(item));
        index !== -1 ? matchIndexes.push(index) : null
    })

    matchIndexes.forEach((index) => {
        console.log(index)
        sheet.getCellByA1(`${column}${index + 1}`).value = '';
    })

    await sheet.saveUpdatedCells();
}

module.exports = {
    writeToFile,
    deleteFromFile,
}