// Google Apps Script Code
// העתק את הקוד הזה ל-Google Apps Script Editor

// כתובת המייל לקבלת התראות
const NOTIFICATION_EMAIL = 'raiservices211@gmail.com';

// פונקציה לבדיקת מייל קיים (GET request)
function doGet(e) {
  try {
    // קבלת פרמטר המייל מה-URL
    const email = e.parameter.email;
    
    if (!email) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Email parameter is required'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // חיפוש המייל בגיליון "users"
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName('users');
    
    if (!sheet) {
      // אם הגיליון לא קיים, המשתמש לא נרשם
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          exists: false,
          message: 'User not registered'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // חיפוש המייל בעמודה השנייה (אימייל)
    const data = sheet.getDataRange().getValues();
    const emailColumnIndex = 1; // עמודה B (אינדקס 1)
    
    // דילוג על שורת הכותרות (שורה 0)
    for (let i = 1; i < data.length; i++) {
      const rowEmail = data[i][emailColumnIndex];
      if (rowEmail && rowEmail.toString().toLowerCase().trim() === email.toLowerCase().trim()) {
        // מייל נמצא - המשתמש נרשם
        return ContentService
          .createTextOutput(JSON.stringify({
            success: true,
            exists: true,
            message: 'User is registered'
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // מייל לא נמצא
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        exists: false,
        message: 'User not registered'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    // קבלת הנתונים מהטופס
    const data = JSON.parse(e.postData.contents);
    
    // בדיקה איזה סוג טופס זה
    const formType = data.type || 'registration'; // ברירת מחדל: טופס הרשמה
    
    if (formType === 'setup') {
      // טופס הגדרה - נשלח לגיליון "installtion"
      handleSetupForm(data);
    } else {
      // טופס הרשמה - נשלח לגיליון "users"
      handleRegistrationForm(data);
    }
    
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

// טיפול בטופס הרשמה (הטופס הראשי)
function handleRegistrationForm(data) {
  // קבלת הגיליון "users"
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName('users');
  
  // אם הגיליון לא קיים, ניצור אותו
  if (!sheet) {
    sheet = spreadsheet.insertSheet('users');
    // הוספת כותרות
    sheet.appendRow([
      'שם הורה',
      'אימייל',
      'טלפון',
      'שם ילד',
      'אמצעי קשר מועדף',
      'תאריך ושעה'
    ]);
    // עיצוב הכותרות
    const headerRange = sheet.getRange(1, 1, 1, 6);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285F4');
    headerRange.setFontColor('#FFFFFF');
  }
  
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
  sendRegistrationEmailNotification(data);
}

// טיפול בטופס הגדרה
function handleSetupForm(data) {
  // קבלת הגיליון "installtion" (Setup)
  // אם הגיליון לא קיים, ניצור אותו
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName('installtion');
  
  if (!sheet) {
    // אם הגיליון לא קיים, ניצור אותו
    sheet = spreadsheet.insertSheet('installtion');
    // הוספת כותרות
    sheet.appendRow([
      'אימייל',
      'טלפון של הורה/מפקח',
      'הערות',
      'הצליח סריקה QR?'
    ]);
    // עיצוב הכותרות
    const headerRange = sheet.getRange(1, 1, 1, 4);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4CAF50');
    headerRange.setFontColor('#FFFFFF');
  }
  
  // המרת ערך boolean לעברית
  const qrScanStatus = data.qrScanSuccessful ? 'כן' : 'לא';
  
  // הוספת שורה חדשה עם הנתונים
  sheet.appendRow([
    data.email || '', // הוספת המייל לטופס ההתקנה
    data.parentPhone || '',
    data.notes || '',
    qrScanStatus
  ]);
  
  // שליחת התראה במייל
  sendSetupEmailNotification(data);
}

// שליחת התראה על טופס הרשמה
function sendRegistrationEmailNotification(data) {
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

// שליחת התראה על טופס הגדרה
function sendSetupEmailNotification(data) {
  try {
    const qrScanSuccessful = data.qrScanSuccessful === true;
    const qrStatus = qrScanSuccessful ? 'כן' : 'לא';
    
    // בחירת נושא ומסר בהתאם לסטטוס ההתקנה
    let subject, statusMessage;
    
    if (qrScanSuccessful) {
      subject = '✅ התקנה הצליחה - Watch My Kid';
      statusMessage = `
🎉 מעולה! המשתמש דיווח שההתקנה הצליחה בהצלחה.

המשתמש סרק את ה-QR Code וחיבר את ה-WhatsApp של הילד לאפליקציה.
כל המערכות פעילות והניטור החל לפעול.
      `.trim();
    } else {
      subject = '⚠️ דיווח על בעיה בהתקנה - Watch My Kid';
      statusMessage = `
⚠️ המשתמש דיווח שההתקנה לא הצליחה.

יש צורך לבדוק את הבעיה ולהיענות למשתמש בהקדם.
      `.trim();
    }
    
    const body = `
${statusMessage}

פרטי המשתמש:
- אימייל: ${data.email || 'לא צוין'}
- טלפון של הורה/מפקח: ${data.parentPhone || 'לא צוין'}
- הצליח סריקה QR: ${qrStatus}
${data.notes ? `- הערות: ${data.notes}` : '- הערות: אין הערות'}

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
    console.error('Error sending setup email notification:', error);
  }
}

