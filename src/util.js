const {
  GoogleSpreadsheet,
  GoogleSpreadsheetRow
} = require('google-spreadsheet');

async function getSheet(options) {
  const sheet = new GoogleSpreadsheet(options.sheet);

  await sheet.useServiceAccountAuth({
    client_email: options.email,
    private_key: options.key
  });
  await sheet.loadInfo();

  return sheet;
}

function getWorksheetId(sheet, idOrNameOrIndex) {
  let sheetId, worksheet;

  switch (typeof idOrNameOrIndex) {
    case 'string':
      worksheet = sheet.sheetsByIndex.find(
        worksheet =>
          worksheet.title === idOrNameOrIndex ||
          worksheet.sheetId.toString() === idOrNameOrIndex
      );
      sheetId = worksheet ? worksheet.sheetId.toString() : undefined;
      break;
    case 'number':
      sheetId = sheet.sheetsByIndex[idOrNameOrIndex]
        ? sheet.sheetsByIndex[idOrNameOrIndex].sheetId
        : undefined;
      break;
    default:
      break;
  }

  return sheetId;
}

async function getWorksheetFormulas(worksheet, options = {}) {
  const formulas = {};
  await worksheet.loadCells(
    options.all
      ? `A1:${worksheet.lastColumnLetter}${worksheet.rowCount}`
      : `A${worksheet._headerRowIndex}:${worksheet.lastColumnLetter}${worksheet._headerRowIndex}`
  );

  worksheet._cells.forEach(row => {
    row.forEach(cell => {
      if (cell.formula) {
        formulas[cell.a1Address] = {
          formula: cell.formula,
          note: cell.note
        };
      }
    });
  });

  return formulas;
}

function getWorksheet(sheet, idOrNameOrIndex) {
  const worksheetId = getWorksheetId(sheet, idOrNameOrIndex);
  const worksheet = sheet.sheetsById[worksheetId];

  return worksheet;
}

function getConditionalFormulas(sheet) {
  return sheet.axios.get(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheet.spreadsheetId}?fields=sheets(properties(title,sheetId),conditionalFormats)`
  );
}

module.exports = {
  getSheet,
  getWorksheet,
  getWorksheetId,
  getWorksheetFormulas,
  getConditionalFormulas
};
