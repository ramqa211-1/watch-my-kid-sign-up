# הוראות הגדרת Google Sheets

הפרויקט משתמש בשני קבצי Google Sheets נפרדים:
1. **קובץ users** - לשמירת נתוני הרשמה
2. **קובץ installation** - לשמירת נתוני התקנה

כל קובץ צריך סקריפט Google Apps Script נפרד.

---

## חלק 1: הגדרת קובץ ה-Users (הרשמה)

### שלב 1: יצירת Google Sheet

1. פתח [Google Sheets](https://sheets.google.com)
2. צור גיליון חדש
3. שנה את שם הגיליון ל-"users" (אם לא קיים כבר)
4. בשורה הראשונה (כותרות), הזן את העמודות הבאות:
   - **A1**: שם הורה
   - **B1**: אימייל
   - **C1**: טלפון
   - **D1**: שם ילד
   - **E1**: אמצעי קשר מועדף
   - **F1**: תאריך ושעה

### שלב 2: יצירת Google Apps Script עבור Users

1. בגיליון, לחץ על **Extensions** → **Apps Script**
2. העתק את כל הקוד מקובץ `google-apps-script-code.js` והדבק ב-Apps Script Editor
3. לחץ על **Save** (שמור) - תן שם לפרויקט, למשל "Watch My Kid Registration Handler"

### שלב 3: פרסום Script כ-Web App (Users)

1. לחץ על **Deploy** → **New deployment**
2. לחץ על האייקון של ⚙️ (Settings) ליד "Select type"
3. בחר **Web app**
4. מלא את הפרטים:
   - **Description**: "Registration form handler"
   - **Execute as**: בחר את החשבון שלך
   - **Who has access**: בחר **Anyone** (חשוב!)
5. לחץ על **Deploy**
6. **העתק את ה-URL** שמופיע (נראה כמו: `https://script.google.com/macros/s/.../exec`)
7. לחץ על **Authorize access** והרשא את הסקריפט לגשת ל-Google Sheets **וגם ל-Gmail** (לשליחת התראות במייל)
8. **שמור את ה-URL הזה** - תצטרך אותו להגדרת משתנה הסביבה `VITE_GOOGLE_SCRIPT_URL`

### שלב 4: קבלת Sheet ID של קובץ ה-Users

1. בקובץ ה-Google Sheets, העתק את ה-ID מה-URL
2. ה-URL נראה כך: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
3. **שמור את ה-ID הזה** - תצטרך אותו להגדרת סקריפט ה-installation

---

## חלק 2: הגדרת קובץ ה-Installation (התקנה)

### שלב 1: יצירת Google Sheet

1. פתח [Google Sheets](https://sheets.google.com)
2. צור גיליון חדש
3. שנה את שם הגיליון ל-"installation"
4. בשורה הראשונה (כותרות), הזן את העמודות הבאות:
   - **A1**: טלפון של הורה/מפקח
   - **B1**: אימייל
   - **C1**: הערות
   - **D1**: הצליח סריקה QR?

**או** השתמש בקישור הקיים: https://docs.google.com/spreadsheets/d/12K7v5WCvClIZos6kZ-vnol_XsKOg6QW-1oSXD_Qfi1I/edit

### שלב 2: יצירת Google Apps Script עבור Installation

1. בגיליון, לחץ על **Extensions** → **Apps Script**
2. העתק את כל הקוד מקובץ `google-apps-script-installation.js` והדבק ב-Apps Script Editor
3. **חשוב:** עדכן את המשתנים הבאים בקוד:
   - `INSTALLATION_SHEET_ID` - כבר מוגדר ל-`'12K7v5WCvClIZos6kZ-vnol_XsKOg6QW-1oSXD_Qfi1I'`
   - `USERS_SHEET_ID` - החלף ב-ID של קובץ ה-users שקיבלת בחלק 1, שלב 4
4. לחץ על **Save** (שמור) - תן שם לפרויקט, למשל "Watch My Kid Installation Handler"

### שלב 3: פרסום Script כ-Web App (Installation)

1. לחץ על **Deploy** → **New deployment**
2. לחץ על האייקון של ⚙️ (Settings) ליד "Select type"
3. בחר **Web app**
4. מלא את הפרטים:
   - **Description**: "Installation form handler"
   - **Execute as**: בחר את החשבון שלך
   - **Who has access**: בחר **Anyone** (חשוב!)
5. לחץ על **Deploy**
6. **העתק את ה-URL** שמופיע (נראה כמו: `https://script.google.com/macros/s/.../exec`)
7. לחץ על **Authorize access** והרשא את הסקריפט לגשת ל-Google Sheets **וגם ל-Gmail** (לשליחת התראות במייל)
8. **שמור את ה-URL הזה** - תצטרך אותו להגדרת משתנה הסביבה `VITE_GOOGLE_SCRIPT_INSTALLATION_URL`

---

## חלק 3: הגדרת משתני הסביבה

### שלב 1: הגדרת משתני הסביבה בפרויקט

1. בפרויקט שלך, צור קובץ `.env` בתיקיית השורש של הפרויקט (אם עדיין לא קיים)
2. הוסף את השורות הבאות לקובץ (החלף את ה-URLs ב-URLs שקבלת):

```env
# URL של סקריפט ה-Users (הרשמה)
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_USERS_SCRIPT_ID/exec

# URL של סקריפט ה-Installation (התקנה)
VITE_GOOGLE_SCRIPT_INSTALLATION_URL=https://script.google.com/macros/s/YOUR_INSTALLATION_SCRIPT_ID/exec
```

3. הפעל מחדש את שרת הפיתוח (`npm run dev` או `bun dev`)

### שלב 2: הגדרת משתני הסביבה ב-GitHub Secrets (לפריסה)

1. לך ל-GitHub → **Settings** → **Secrets and variables** → **Actions**
2. לחץ על **New repository secret** והוסף:
   - **Name**: `VITE_GOOGLE_SCRIPT_URL`
   - **Secret**: ה-URL של סקריפט ה-users
3. לחץ על **New repository secret** שוב והוסף:
   - **Name**: `VITE_GOOGLE_SCRIPT_INSTALLATION_URL`
   - **Secret**: ה-URL של סקריפט ה-installation

---

## בדיקה

### בדיקת טופס הרשמה:
1. מלא את טופס ההרשמה באתר
2. שלח את הטופס
3. בדוק את קובץ ה-users - הנתונים אמורים להופיע בשורה חדשה
4. בדוק את תיבת הדואר הנכנס - אמור להגיע מייל התראה ל-raiservices211@gmail.com

### בדיקת טופס התקנה:
1. ודא שהמייל נרשם בטופס ההרשמה
2. מלא את טופס ההתקנה באתר (עם אותו מייל)
3. שלח את הטופס
4. בדוק את קובץ ה-installation - הנתונים אמורים להופיע בשורה חדשה
5. בדוק את תיבת הדואר הנכנס - אמור להגיע מייל התראה ל-raiservices211@gmail.com

---

## התראות במייל

הסקריפטים שולחים אוטומטית התראה במייל בכל פעם שמישהו ממלא טופס. המייל נשלח ל-`raiservices211@gmail.com` וכולל את כל הפרטים.

**חשוב:** בעת ההרשאה, ודא שאתה מאשר גם גישה ל-Gmail לשליחת המיילים.

---

## פתרון בעיות

### הנתונים לא נשמרים:
- ודא שהסקריפט מפורסם כ-Web App עם גישה "Anyone"
- בדוק שה-URL נכון ב-`.env`
- בדוק את ה-logs ב-Apps Script Editor (View → Logs)

### שגיאת CORS:
- ודא שהסקריפט מפורסם נכון
- ודא שהקוד משתמש ב-`doPost` ו-`doGet`

### נתונים לא מופיעים:
- בדוק את ה-URLs ב-`.env` והרץ מחדש את השרת
- בדוק שהגיליון נקרא בשם הנכון ("users" או "installation")
- בדוק את ה-logs ב-Apps Script Editor

### טופס ההתקנה לא עובד:
- ודא שהמייל נרשם קודם בטופס ההרשמה
- ודא ש-`USERS_SHEET_ID` מוגדר נכון בסקריפט ה-installation
- ודא ש-`VITE_GOOGLE_SCRIPT_INSTALLATION_URL` מוגדר ב-`.env`

---

## סיכום הקבצים

- **google-apps-script-code.js** - סקריפט עבור טופס הרשמה (users)
- **google-apps-script-installation.js** - סקריפט עבור טופס התקנה (installation)

כל סקריפט צריך להיות מועתק לקובץ Google Sheets המתאים ולפורסם כ-Web App נפרד.
