# הגדרת GitHub Secrets עבור Google Script URL

## הבעיה
השגיאה "Google Script URL לא מוגדר" מופיעה כי משתנה הסביבה `VITE_GOOGLE_SCRIPT_URL` לא מוגדר ב-GitHub Pages.

## פתרון

### שלב 1: קבל את ה-URL של Google Apps Script

אם עדיין לא יצרת את ה-Google Apps Script, עקוב אחר ההוראות ב-`GOOGLE_SHEETS_SETUP.md`.

אם כבר יצרת, ה-URL נראה כך:
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### שלב 2: הוסף את ה-URL ל-GitHub Secrets

1. לך ל-GitHub → **Settings** → **Secrets and variables** → **Actions**

2. לחץ על **New repository secret**

3. מלא את הפרטים:
   - **Name**: `VITE_GOOGLE_SCRIPT_URL`
   - **Secret**: הדבק את ה-URL של Google Apps Script (לדוגמה: `https://script.google.com/macros/s/ABC123/exec`)

4. לחץ **Add secret**

### שלב 3: Trigger מחדש את ה-Build

לאחר הוספת ה-Secret:

1. לך ל-GitHub → **Actions**
2. לחץ על ה-workflow האחרון
3. לחץ על **Run workflow** → **Run workflow**
4. חכה שה-build יסתיים

### שלב 4: בדיקה

1. פתח את האתר ב-GitHub Pages
2. נסה למלא ולשלוח את הטופס
3. בדוק שאין שגיאה בקונסול

## הערות חשובות

- **ה-Secret נשמר בצורה מאובטחת** - רק GitHub Actions יכול לגשת אליו
- **ה-URL לא יופיע בקוד** - הוא מוזרק רק בזמן ה-build
- **אם תשנה את ה-URL**, תצטרך לעדכן את ה-Secret ולהריץ build מחדש

## פתרון בעיות

אם עדיין יש שגיאה אחרי הוספת ה-Secret:

1. **ודא שה-Secret נקרא בדיוק**: `VITE_GOOGLE_SCRIPT_URL` (case-sensitive)
2. **ודא שה-URL נכון**: בדוק שהוא מתחיל ב-`https://script.google.com/macros/s/`
3. **ודא שה-build רץ מחדש**: לך ל-Actions ובדוק שה-build האחרון הצליח
4. **נקה cache בדפדפן**: לחץ `Ctrl + F5` ל-hard refresh

