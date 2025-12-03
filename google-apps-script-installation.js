// Google Apps Script Code - Installation Form Handler
// העתק את הקוד הזה ל-Google Apps Script Editor של קובץ ה-installation
// קובץ ה-Google Sheets: https://docs.google.com/spreadsheets/d/12K7v5WCvClIZos6kZ-vnol_XsKOg6QW-1oSXD_Qfi1I/edit

// כתובת המייל לקבלת התראות
const NOTIFICATION_EMAIL = 'raiservices211@gmail.com';

// ID של קובץ ה-Google Sheets (מהקישור למעלה)
const INSTALLATION_SHEET_ID = '12K7v5WCvClIZos6kZ-vnol_XsKOg6QW-1oSXD_Qfi1I';

// פונקציה לבדיקת מייל קיים (GET request)
// הערה: פונקציה זו צריכה לגשת לקובץ ה-users כדי לבדוק אם המייל נרשם
// תצטרך להגדיר את ה-ID של קובץ ה-users כאן
const USERS_SHEET_ID = 'YOUR_USERS_SHEET_ID_HERE'; // החלף ב-ID של קובץ ה-users

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
      // חיפוש המייל בקובץ ה-users (קובץ נפרד)
      const usersSpreadsheet = SpreadsheetApp.openById(USERS_SHEET_ID);
      const sheet = usersSpreadsheet.getSheetByName('users');
      
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
    
    console.log('Installation form received:', data);
    
    // בדיקה שהמייל נרשם בטופס הראשי (בקובץ ה-users)
    if (data.email) {
      const emailExists = checkEmailExistsInUsersSheet(data.email);
      
      if (!emailExists) {
        // המייל לא נרשם - החזרת שגיאה
        return ContentService
          .createTextOutput(JSON.stringify({
            success: false,
            error: 'EMAIL_NOT_REGISTERED',
            message: 'כתובת האימייל הזו לא נרשמה בטופס ההרשמה. אנא מלא קודם את טופס ההרשמה בעמוד הבית.'
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // אם המייל תקין, נמשיך לשליחה
    handleInstallationForm(data);
    console.log('Installation form processed successfully');
    
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

// פונקציה לבדיקת מייל בקובץ ה-users (מחזירה boolean)
function checkEmailExistsInUsersSheet(email) {
  if (!email) {
    return false;
  }
  
  try {
    // חיפוש המייל בקובץ ה-users (קובץ נפרד)
    const usersSpreadsheet = SpreadsheetApp.openById(USERS_SHEET_ID);
    const sheet = usersSpreadsheet.getSheetByName('users');
    
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
  } catch (error) {
    console.error('Error checking email in users sheet:', error);
    return false;
  }
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
    
    const emailExists = checkEmailExistsInUsersSheet(email);
    
    if (emailExists) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          exists: true,
          message: 'User is registered'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          exists: false,
          message: 'User not registered'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// טיפול בטופס התקנה
function handleInstallationForm(data) {
  // קבלת קובץ ה-Google Sheets של installation
  const spreadsheet = SpreadsheetApp.openById(INSTALLATION_SHEET_ID);
  
  // קבלת הגיליון הראשון (או גיליון בשם "installation" אם קיים)
  let sheet = spreadsheet.getSheetByName('installation');
  
  // אם הגיליון לא קיים, נשתמש בגיליון הראשון
  if (!sheet) {
    sheet = spreadsheet.getSheets()[0];
  }
  
  // בדיקה אם יש כותרות (אם הגיליון ריק או רק עם כותרות)
  const lastRow = sheet.getLastRow();
  
  if (lastRow === 0) {
    // הגיליון ריק - ניצור כותרות
    sheet.appendRow([
      'טלפון של הורה/מפקח',
      'אימייל',
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
  console.log('Appending row to installation sheet');
  sheet.appendRow([
    data.parentPhone || '',
    data.email || '',
    data.notes || '',
    qrScanStatus
  ]);
  
  console.log('Row appended successfully to installation sheet');
  
  // שליחת התראה במייל
  sendInstallationEmailNotification(data);
}

// שליחת התראה על טופס התקנה
function sendInstallationEmailNotification(data) {
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
    console.error('Error sending installation email notification:', error);
  }
}

