# פתרון בעיות - שגיאת 404 ב-GitHub Pages

## הבעיה
שגיאת 404 על `main.tsx` או קבצים אחרים ב-GitHub Pages.

## פתרון

### שלב 1: ודא שה-build רץ מחדש

אם אתה משתמש ב-GitHub Actions:

1. לך ל-GitHub → **Actions**
2. בדוק אם יש workflow שצריך לרוץ
3. אם יש, לחץ על **Run workflow** → **Run workflow**
4. חכה שה-build יסתיים

### שלב 2: בדוק את הגדרות GitHub Pages

1. לך ל-GitHub → **Settings** → **Pages**
2. ודא ש-**Source** מוגדר ל-**GitHub Actions** (לא Branch)
3. אם זה Branch, שנה ל-GitHub Actions

### שלב 3: Build מקומי ובדיקה

1. הרץ build מקומי:
   ```bash
   npm run build
   ```

2. בדוק את `dist/index.html` - הנתיבים צריכים להתחיל עם `/watch-my-kid-sign-up/`:
   ```html
   <script src="/watch-my-kid-sign-up/assets/index-XXXXX.js"></script>
   ```

3. בדוק מקומית:
   ```bash
   npm run preview
   ```
   האתר צריך לעבוד על `http://localhost:4173/watch-my-kid-sign-up/`

### שלב 4: נקה cache

אם עדיין לא עובד:

1. מחק את תיקיית `dist`:
   ```bash
   rm -rf dist
   # או ב-Windows:
   Remove-Item -Recurse -Force dist
   ```

2. בנה מחדש:
   ```bash
   npm run build
   ```

3. Push מחדש:
   ```bash
   git add .
   git commit -m "Rebuild with correct base path"
   git push
   ```

### שלב 5: בדוק את ה-console בדפדפן

1. פתח את האתר ב-GitHub Pages
2. לחץ F12 לפתיחת Developer Tools
3. לך ל-**Network** tab
4. רענן את הדף
5. בדוק איזה קבצים נכשלים (404)

אם אתה רואה שהקבצים מחפשים ב-`/assets/...` במקום `/watch-my-kid-sign-up/assets/...`, זה אומר שה-build לא רץ עם ה-base path הנכון.

## בדיקה מהירה

פתח את הקונסול בדפדפן (F12) ובדוק:
- אם השגיאה היא על `/src/main.tsx` → ה-build לא רץ או לא עודכן
- אם השגיאה היא על `/assets/...` → ה-base path לא מוגדר נכון
- אם השגיאה היא על `/watch-my-kid-sign-up/assets/...` → הכל תקין, אבל יש בעיה אחרת

## פתרון מהיר

אם אתה רוצה לפתור מהר:

1. מחק את `dist`
2. הרץ `npm run build`
3. ודא שב-`dist/index.html` הנתיבים מתחילים עם `/watch-my-kid-sign-up/`
4. Push את כל השינויים
5. המתן ל-GitHub Actions לבנות מחדש

