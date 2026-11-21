const {test, expect} = require('@playwright/test')

const ExcelJs = require('exceljs');

async function WriteExcelTest(searchText, replaceText,change, filePath){
    
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet("Sheet1");
    const output = await readExcel(worksheet, searchText);

    const cell = worksheet.getCell(output.row, output.column+change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);

}

async function readExcel(worksheet, searchText){
    let output = {row:-1, column:-1};
    worksheet.eachRow((row, rowNumber)=>
        {
            row.eachCell((cell, colNumber)=>
            {
                if(cell.value === searchText)
                    {
                        output.row=rowNumber;
                        output.column=colNumber;
                    
                    }
                })
            });
        return output;
    }

//WriteExcelTest("Kivi", 599, {rowChange: 0, colChange: 2}, "C:/Users/tejas/Downloads/Exceldownload.xlsx");
test('Uplooad and download', async({page})=>
{

    const textSearch = "Mango";
    const updateValue = "499"
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', {name: "Download"}).click();
    const download = await downloadPromise;
    const filePath = "C:/Users/tejas/Downloads/download.xlsx";
    await download.saveAs(filePath)
    await WriteExcelTest(textSearch, updateValue, {rowChange: 0, colChange: 2}, filePath);
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles(filePath);
    const textLocator = await page.getByText(textSearch);
    const desriedRow = await page.getByRole('row').filter({has: textLocator});
    await expect(desriedRow.locator("#cell-4-undefined")).toContainText(updateValue);
});
