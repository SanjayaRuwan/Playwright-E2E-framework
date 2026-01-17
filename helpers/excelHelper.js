const xlsx = require('xlsx');

// Export a reusable function that reads Excel data
export function getExcelData(filePath, sheetName) {
  // Read the Excel file into memory
  const workbook = xlsx.readFile(filePath);
   // Access the specific sheet by name
  const worksheet = workbook.Sheets[sheetName];
  // Convert the sheet data into a JSON array
  // Each row becomes a JavaScript object with column headers as keys
  const jsonData = xlsx.utils.sheet_to_json(worksheet, { defval: '' }); // ensures undefined cells return ''
  // Normalize the data: convert non-string values to strings
  return jsonData.map(row => {
    Object.keys(row).forEach(key => {
      if (typeof row[key] !== 'string') { // Force all cell values to be string
        row[key] = String(row[key]);
      }
    });
    return row;
  });
}
