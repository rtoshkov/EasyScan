// Determines if one request to API or 2 should be made
// The second one is to sore automatically info in column #Serial

const googleApi = require("../services/googleSheets");

async function recordAnalyzer(record, plusDelete = false) {

    if(plusDelete) {
        let [_, result] = await Promise.all([
            await googleApi.deleteFromFile(
                record.deleteFrom,
                record.sheetName,
                record.data,
            ),
            await googleApi.writeToFile(
                record.sheetAddress,
                record.sheetName,
                record.columnName,
                record.data,
                record.givenTo,
            )
        ]);

        return result;
    }

    if (record.save && record.columnName !== "serial") {
        let [_, result] = await Promise.all([
            await googleApi.writeToFile(
                record.sheetAddress,
                record.sheetName,
                "serial",
                record.data,
                record.givenTo,
            ),
            await googleApi.writeToFile(
                record.sheetAddress,
                record.sheetName,
                record.columnName,
                record.data,
                record.givenTo,
            )
        ]);
        return result;
    }

    return googleApi.writeToFile(
        record.sheetAddress,
        record.sheetName,
        record.columnName,
        record.data,
        record.givenTo,
    );
}

module.exports = recordAnalyzer;