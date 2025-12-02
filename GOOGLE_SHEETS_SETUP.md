# הוראות הגדרת Google Sheets

## שלב 1: יצירת Google Sheet

1. פתח [Google Sheets](https://sheets.google.com)
2. צור גיליון חדש
3. בשורה הראשונה (כותרות), הזן את העמודות הבאות:
   - **A1**: שם הורה
   - **B1**: אימייל
   - **C1**: טלפון
   - **D1**: שם ילד
   - **E1**: אמצעי קשר מועדף
   - **F1**: תאריך ושעה

## שלב 2: יצירת Google Apps Script

1. בגיליון, לחץ על **Extensions** → **Apps Script**
2. מחליף את כל הקוד בקוד הבא:

```javascript
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
```

3. לחץ על **Save** (שמור) - תן שם לפרויקט, למשל "Watch My Kid Form Handler"

## שלב 3: פרסום Script כ-Web App

1. לחץ על **Deploy** → **New deployment**
2. לחץ על האייקון של ⚙️ (Settings) ליד "Select type"
3. בחר **Web app**
4. מלא את הפרטים:
   - **Description**: "Form submission handler"
   - **Execute as**: בחר את החשבון שלך
   - **Who has access**: בחר **Anyone** (חשוב!)
5. לחץ על **Deploy**
6. **העתק את ה-URL** שמופיע (נראה כמו: `https://script.google.com/macros/s/.../exec`)
7. לחץ על **Authorize access** והרשא את הסקריפט לגשת ל-Google Sheets

## שלב 4: הגדרת הפרויקט

1. בפרויקט שלך, צור קובץ `.env` בתיקיית השורש של הפרויקט
2. הוסף את השורה הבאה לקובץ (החלף את ה-URL ב-URL שקבלת):
   ```
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
3. הפעל מחדש את שרת הפיתוח (`npm run dev` או `bun dev`)

## בדיקה

1. מלא את הטופס באתר
2. שלח את הטופס
3. בדוק את הגיליון - הנתונים אמורים להופיע בשורה חדשה

## פתרון בעיות

- **הנתונים לא נשמרים**: ודא שהסקריפט מפורסם כ-Web App עם גישה "Anyone"
- **שגיאת CORS**: ודא שהסקריפט מפורסם נכון ושהקוד משתמש ב-`doPost`
- **נתונים לא מופיעים**: בדוק את ה-URL ב-`.env` והרץ מחדש את השרת

