// Google Apps Script for Jimmy's Auto Care Lead Generation

// INSTRUCTIONS:
// 1. Create a new Google Sheet.
// 2. Go to Extensions > Apps Script.
// 3. Delete any code there and paste this entire code.
// 4. Save the project.
// 5. Click "Deploy" > "New deployment".
// 6. Select type: "Web app".
// 7. Execute as: "Me".
// 8. Who has access: "Anyone".
// 9. Click Deploy and Authorize the app.
// 10. Copy the Web app URL and paste it into index.html at the scriptURL placeholder.

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // If sheet is empty, add headers
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp", 
      "Name", 
      "Phone", 
      "Address", 
      "Tool Used", 
      "Vehicle Make", 
      "Vehicle Model", 
      "Vehicle Year", 
      "Mileage"
    ]);
  }
  
  try {
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(),
      data.Name,
      data.Phone,
      data.Address,
      data.ToolUsed,
      data.VehicleMake,
      data.VehicleModel,
      data.VehicleYear,
      data.Mileage
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (optional, for testing)
function doGet(e) {
  return ContentService.createTextOutput("Google Sheets Backend is Active.");
}
