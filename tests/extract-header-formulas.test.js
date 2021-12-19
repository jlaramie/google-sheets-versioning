const {
  getSheet,
  getWorksheetFormulas,
  getWorksheetId,
  getWorksheet,
  getConditionalFormulas
} = require('../src/util');

describe('test functions', () => {
  require('dotenv').config();
  const key = process.env.GOOGLE_PRIVATE_KEY;
  const email = process.env.GOOGLE_CLIENT_EMAIL;
  const sheetKey = process.env.GOOGLE_SHEET_KEY;
  const config = {
    email,
    key,
    sheet: sheetKey
  };

  let sheet, worksheetId, worksheet;

  it('get sheet', async () => {
    sheet = await getSheet(config);
    expect(sheet).toBeTruthy();
  });

  it('get worksheet id', async () => {
    worksheetId = getWorksheetId(sheet, 'Sheet1');
    expect(worksheetId).toBeTruthy();
  });

  it('get worksheet', async () => {
    worksheet = getWorksheet(sheet, worksheetId);

    expect(worksheet).toBeTruthy();
  });

  it('get worksheet formulas', async () => {
    const formulas = await getWorksheetFormulas(worksheet, {});

    console.error(JSON.stringify(formulas));

    expect(formulas).toBeTruthy();

    expect(formulas).toMatchObject({
      B1: {
        formula:
          '=ARRAYFORMULA(IF(ROW($A:$A)=1,"Value", IF($A:$A<>"",TRUE,"")))',
        note: 'Returns TRUE if ID is not blank'
      }
    });
  });

  it('get conditional formulas', async () => {
    const formulas = await getConditionalFormulas(sheet, {});

    console.error(JSON.stringify(formulas));

    expect(formulas).toBeTruthy();
  });
});
