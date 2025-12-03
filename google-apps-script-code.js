// Google Apps Script Code - Registration Form Handler
// העתק את הקוד הזה ל-Google Apps Script Editor של קובץ ה-users

// כתובת המייל לקבלת התראות
const NOTIFICATION_EMAIL = 'raiservices211@gmail.com';

// פונקציה לבדיקת מייל קיים (GET request)
function doGet(e) {
  try {
    // קבלת פרמטר המייל מה-URL
    const email = e.parameter.email;
    
    let result;
    
    if (!email) {
      result = {
        success: false,
        error: 'Email parameter is required'
      };
    } else {
      // חיפוש המייל בגיליון "users"
      const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = spreadsheet.getSheetByName('users');
      
      if (!sheet) {
        // אם הגיליון לא קיים, המשתמש לא נרשם
        result = {
          success: true,
          exists: false,
          message: 'User not registered'
        };
      } else {
        // חיפוש המייל בעמודה השנייה (אימייל)
        const data = sheet.getDataRange().getValues();
        const emailColumnIndex = 1; // עמודה B (אינדקס 1)
        
        let found = false;
        // דילוג על שורת הכותרות (שורה 0)
        for (let i = 1; i < data.length; i++) {
          const rowEmail = data[i][emailColumnIndex];
          if (rowEmail && rowEmail.toString().toLowerCase().trim() === email.toLowerCase().trim()) {
            // מייל נמצא - המשתמש נרשם
            found = true;
            break;
          }
        }
        
        if (found) {
          result = {
            success: true,
            exists: true,
            message: 'User is registered'
          };
        } else {
          // מייל לא נמצא
          result = {
            success: true,
            exists: false,
            message: 'User not registered'
          };
        }
      }
    }
    
    // החזרת תשובה עם CORS headers
    return ContentService
      .createTextOutput(JSON.stringify(result))
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
    
    console.log('Registration form received:', data);
    
    // בדיקה אם זה בקשת בדיקת מייל
    if (data.type === 'checkEmail') {
      // בדיקת מייל - החזרת תשובה מיידית
      return checkEmailInSheet(data.email);
    }
    
    // טופס הרשמה - נשלח לגיליון "users"
    console.log('Processing registration form');
    handleRegistrationForm(data);
    
    // החזרת תשובה מוצלחת
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // במקרה של שגיאה
    console.error('Error in doPost:', error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// פונקציה לבדיקת מייל בגיליון (מחזירה boolean)
function checkEmailExistsInSheet(email) {
  if (!email) {
    return false;
  }
  
  // חיפוש המייל בגיליון "users"
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('users');
  
  if (!sheet) {
    // אם הגיליון לא קיים, המשתמש לא נרשם
    return false;
  }
  
  // חיפוש המייל בעמודה השנייה (אימייל)
  const data = sheet.getDataRange().getValues();
  const emailColumnIndex = 1; // עמודה B (אינדקס 1)
  
  // דילוג על שורת הכותרות (שורה 0)
  for (let i = 1; i < data.length; i++) {
    const rowEmail = data[i][emailColumnIndex];
    if (rowEmail && rowEmail.toString().toLowerCase().trim() === email.toLowerCase().trim()) {
      // מייל נמצא - המשתמש נרשם
      return true;
    }
  }
  
  // מייל לא נמצא
  return false;
}

// פונקציה לבדיקת מייל בגיליון (מחזירה ContentService.TextOutput)
function checkEmailInSheet(email) {
  try {
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


