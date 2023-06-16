const fs = require('fs/promises');
const path = require('path');

require('dotenv').config();

const {
  getSheet,
  getWorksheetFormulas,
  getWorksheetId,
  getWorksheet
} = require('./src/util');

const key = process.env.GOOGLE_PRIVATE_KEY;
const email = process.env.GOOGLE_CLIENT_EMAIL;
const sheetKey = process.env.GOOGLE_SHEET_KEY;
const config = {
  email,
  key,
  sheet: sheetKey
};

(async () => {
  // const sheet = await getSheet(config);
  // const worksheetId = getWorksheetId(sheet, 'Sheet1');
  // const worksheet = getWorksheet(sheet, worksheetId);
  // const formulas = await getWorksheetFormulas(worksheet, {});

  const file = await fs.readFile(
    path.resolve(__dirname, './out/CC S4 Signup Responses/AllResponses.gse')
  );

  const { tokenize } = require('excel-formula-tokenizer');
  const { buildTree, visit } = require('excel-formula-ast');

  // const tokens = tokenize(file.toString(), {
  //   root: true
  // });

  var options = {
    language: 'de-DE'
  };
  let str =
    '={ {WENN(WAHR;1,1;1,2)\\IF(WAHR;1,1;1,2)}; {WENN(WAHR;1,1;1,2)\\WENN(WAHR;1,1;1,2)}';
  // str = '=WENN(WAHR;1,1;1,2)'
  str =
    '={{IF(TRUE,1.1,1.2), IF(TRUE,1.1,1.2)};{IF(TRUE,1.1,1.2), IF(TRUE,1.1,1.2)}}';
  // str = '={{1.1;1.2},{1.3;1.4}}';
  str = '{{1,2};{3,4}}';
  str = '{{1;2},{3;4}}';
  str = '{{1,1;1,2},{1,3;1,4}}';

  str = '{{1,1\\1,2};{1,3\\1,4}}';
  // str = '{{1,1;1,2}\\{1,3;1,4}}';
  // str = '={{1,1;1,2}\\{1,1;1,2}}';
  const tokens = tokenize(str, {
    ...options
  });
  // const tokens = tokenize('=WENN(true,1.1,1.2)', {
  //   // ...options
  // });

  // build tree
  // const tree = buildTree(tokens);

  debugger;

  console.log(JSON.stringify(tokens, null, 2));
})();
