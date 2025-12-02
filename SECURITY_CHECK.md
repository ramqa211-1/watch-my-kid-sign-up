# בדיקת אבטחה - קבצים רגישים

## ✅ קבצים שכבר ב-.gitignore (מוגנים)

- `.env` - קבצי משתני סביבה
- `node_modules/` - תלויות
- `dist/`, `build/` - קבצי build
- קבצי cache ו-temp
- קבצי IDE ו-OS

## ⚠️ קבצים שצריך לבדוק

### 1. `supabase/config.toml`
**מיקום**: `supabase/config.toml`  
**תוכן**: `project_id = "sqcqoipzyhsqjywwbpwc"`  
**רמת רגישות**: נמוכה-בינונית  
**הסבר**: זהו project_id של Supabase. זה לא סודי בפני עצמו, אבל אם אתה רוצה להיות זהיר, אפשר להוסיף את הקובץ ל-.gitignore.

**המלצה**: אם אתה משתמש ב-Supabase רק לצורך פיתוח מקומי, אפשר להוסיף את `supabase/config.toml` ל-.gitignore. אם אתה משתף את הקובץ עם צוות, זה בסדר להשאיר אותו.

### 2. `README.md`
**מיקום**: `README.md`  
**תוכן**: מכיל URL של Lovable project: `https://lovable.dev/projects/12d0cbb0-b673-4b35-aa9f-70dd49d9c29f`  
**רמת רגישות**: נמוכה  
**הסבר**: זהו קישור לפרויקט שלך ב-Lovable. זה לא רגיש בפני עצמו, אבל זה מידע פרטי.

**המלצה**: אם אתה הופך את הריפו לציבורי, שקול להסיר או לערוך את ה-URL הזה אם אתה לא רוצה שאחרים יראו אותו.

## ✅ משתני סביבה שצריכים להיות ב-.env (לא ב-git)

הקבצים הבאים **חייבים** להיות ב-`.env` ולא להישמר ב-git:

1. **`VITE_GOOGLE_SCRIPT_URL`** - URL של Google Apps Script Web App
2. **`VITE_SUPABASE_URL`** - URL של Supabase project (אם משתמשים)
3. **`VITE_SUPABASE_PUBLISHABLE_KEY`** - מפתח פרסום של Supabase (אם משתמשים)

## 🚨 בעיה קריטית שנמצאה!

**קובץ `.env` כבר נשמר ב-git!** זה מסוכן מאוד לפני הפיכה לציבורי.

### פעולה דחופה נדרשת:

1. **הסר את `.env` מה-git (אבל שמור אותו מקומית)**:
   ```bash
   git rm --cached .env
   git commit -m "Remove .env from git tracking"
   ```

2. **אם כבר push-ת את הקובץ ל-remote**, תצטרך להסיר אותו גם משם:
   ```bash
   git push origin <branch-name>
   ```

3. **אם כבר יש היסטוריה עם `.env`**, תצטרך לנקות את ההיסטוריה:
   ```bash
   # זה יסיר את הקובץ מכל ההיסטוריה
   git filter-branch --force --index-filter "git rm --cached --ignore-unmatch .env" --prune-empty --tag-name-filter cat -- --all
   ```

4. **לאחר ההסרה**, ודא שה-.gitignore מעודכן (כבר עשינו את זה ✅)

## 📋 רשימת בדיקה לפני הפיכה לציבורי

- [x] `.env` ב-.gitignore
- [x] כל סוגי קבצי `.env.*` ב-.gitignore
- [x] `node_modules/` ב-.gitignore
- [x] קבצי build ב-.gitignore
- [x] קבצי cache ב-.gitignore
- [ ] **הסר את `.env` מה-git (פעולה דחופה!)**
- [ ] בדוק אם `supabase/config.toml` צריך להיות ב-.gitignore
- [ ] בדוק אם `README.md` מכיל מידע פרטי שאתה רוצה להסיר
- [ ] ודא שאין API keys או secrets בקוד המקור

## 🔍 פקודות לבדיקה

לפני הפיכה לציבורי, הרץ את הפקודות הבאות:

```bash
# בדוק אם יש קבצי .env ב-git
git ls-files | grep -E "\.env$|\.env\."

# בדוק אם יש מילות מפתח רגישות בקוד
grep -r "VITE_GOOGLE_SCRIPT_URL\|VITE_SUPABASE" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx"

# בדוק את ה-.gitignore
cat .gitignore
```

## 🛡️ המלצות נוספות

1. **יצירת `.env.example`**: צור קובץ `.env.example` עם כל המשתנים הנדרשים (ללא הערכים האמיתיים) כדי שאחרים יידעו מה צריך להגדיר.

2. **הסרת מידע רגיש מהיסטוריה**: אם כבר שמרת קבצים רגישים ב-git, השתמש ב-`git filter-branch` או `git filter-repo` כדי להסיר אותם מהיסטוריה.

3. **סריקת קוד**: לפני הפיכה לציבורי, סרוק את הקוד עם כלים כמו:
   - `git-secrets` (AWS)
   - `truffleHog`
   - `gitleaks`

4. **בדיקת קבצי config**: ודא שאין API keys או secrets בקובצי config כמו `vite.config.ts`, `package.json`, וכו'.

