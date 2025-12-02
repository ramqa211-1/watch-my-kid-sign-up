# הוראות פרסום ל-GitHub Pages

## מה תוקן

1. ✅ הוסף `base: "/watch-my-kid-sign-up/"` ל-`vite.config.ts`
2. ✅ עודכן React Router עם `basename="/watch-my-kid-sign-up"`
3. ✅ נוצר קובץ `404.html` ל-SPA routing
4. ✅ נוצר GitHub Actions workflow לפרסום אוטומטי

## שתי דרכים לפרסום

### דרך 1: GitHub Actions (מומלץ - אוטומטי)

1. ודא שהקוד שלך ב-branch `main` או `master`
2. Push את כל השינויים:
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push
   ```
3. ב-GitHub, לך ל-**Settings** → **Pages**
4. תחת **Source**, בחר **GitHub Actions**
5. ה-workflow יבנה ויפרסם את האתר אוטומטית

### דרך 2: Manual Deployment (ידני)

1. בנה את הפרויקט:
   ```bash
   npm run build
   # או
   bun run build
   ```

2. ודא שיש תיקייה `dist` עם הקבצים המבונים

3. ב-GitHub, לך ל-**Settings** → **Pages**

4. תחת **Source**, בחר:
   - **Branch**: `main` (או `master`)
   - **Folder**: `/dist`

5. לחץ **Save**

6. העלה את תיקיית `dist` ל-branch נפרד (למשל `gh-pages`):
   ```bash
   # אם אתה משתמש ב-gh-pages branch
   git subtree push --prefix dist origin gh-pages
   
   # או העלה ידנית את תיקיית dist
   ```

## פתרון בעיות

### האתר לא נטען / דף לבן

1. **ודא שה-base path נכון**: צריך להיות `/watch-my-kid-sign-up/` (עם סלאש בסוף)
2. **בדוק את ה-console בדפדפן**: לחץ F12 ובדוק אם יש שגיאות
3. **ודא שה-build רץ בהצלחה**: הרץ `npm run build` מקומית ובדוק שאין שגיאות

### Routes לא עובדים (404)

- קובץ `404.html` צריך להיות ב-`public/` ויועתק אוטומטית ל-`dist/`
- ודא ש-React Router מוגדר עם `basename="/watch-my-kid-sign-up"`

### תמונות/קבצים לא נטענים

- ודא שכל הנתיבים מתחילים עם `/watch-my-kid-sign-up/`
- בדוק את ה-`base` ב-`vite.config.ts`

## בדיקה מקומית

לפני הפרסום, תוכל לבדוק את ה-build מקומית:

```bash
npm run build
npm run preview
```

זה יריץ את האתר המבונה על `http://localhost:4173` עם ה-base path הנכון.

## הערות חשובות

- **Base Path**: כל הנתיבים צריכים להתחיל עם `/watch-my-kid-sign-up/`
- **Environment Variables**: ודא ש-`VITE_GOOGLE_SCRIPT_URL` מוגדר ב-GitHub Secrets אם אתה משתמש ב-GitHub Actions
- **Build Time**: ה-build יכול לקחת כמה דקות ב-GitHub Actions

