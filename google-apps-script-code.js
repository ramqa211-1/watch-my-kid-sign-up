// Google Apps Script Code
// העתק את הקוד הזה ל-Google Apps Script Editor

function doPost(e) {
  try {
    // קבלת הנתונים מהטופס
    const data = JSON.parse(e.postData.contents);
    
    // קבלת הגיליון הפעיל
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // הוספת שורה חדשה עם הנתונים
    sheet.appendRow([
      data.parentName || '',
      data.email || '',
      data.phone || '',
      data.childName || '',
      data.preferredContact || '',
      new Date(data.timestamp || new Date())
    ]);
    
    // החזרת תשובה מוצלחת
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // במקרה של שגיאה
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

