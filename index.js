const commandLineArgs = require('command-line-args');
const {
  getSheet,
  getWorksheetFormulas,
  getWorksheetId
} = require('./src/util');

const CLI_OPTIONS = [
  { name: 'sheet', type: String },
  { name: 'worksheet', type: String },
  { name: 'key', type: String },
  { name: 'email', type: String },
  { name: 'all', type: Boolean, defaultValue: false }
];

(async () => {
  const options = commandLineArgs(CLI_OPTIONS);
  const sheet = await getSheet(options);

  const formulasBySheet = {};
  if (!options.worksheet) {
    for (let i = 0, len = sheet.sheetsByIndex.length; i < len; i++) {
      const worksheet = sheet.sheetsByIndex[i];
      formulasBySheet[worksheet.title] = await getWorksheetFormulas(worksheet, {
        all: options.all
      });
    }
  } else {
    const worksheet = getWorksheetId(sheet, options.worksheet);
    formulasBySheet[worksheet.title] = await getWorksheetFormulas(worksheet, {
      all: options.all
    });
  }
})();
