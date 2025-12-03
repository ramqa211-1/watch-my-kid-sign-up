// Google Apps Script Code
// העתק את הקוד הזה ל-Google Apps Script Editor

// כתובת המייל לקבלת התראות
const NOTIFICATION_EMAIL = 'raiservices211@gmail.com';

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
    
    // שליחת התראה במייל
    sendEmailNotification(data);
    
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

function sendEmailNotification(data) {
  try {
    const subject = 'התראה: רישום חדש ב-Watch My Kid';
    const body = `
היי,

נרשם משתמש חדש בטופס ההרשמה:

פרטי ההורה:
- שם: ${data.parentName || 'לא צוין'}
- אימייל: ${data.email || 'לא צוין'}
- טלפון: ${data.phone || 'לא צוין'}

פרטי הילד:
- שם הילד: ${data.childName || 'לא צוין'}

אמצעי קשר מועדף: ${data.preferredContact === 'email' ? 'דוא"ל' : 'טלפון'}

תאריך ושעה: ${new Date(data.timestamp || new Date()).toLocaleString('he-IL')}

---
שירות Watch My Kid
    `.trim();
    
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: subject,
      body: body
    });
  } catch (error) {
    // אם יש שגיאה בשליחת המייל, לא נכשיל את כל התהליך
    console.error('Error sending email notification:', error);
  }
}

