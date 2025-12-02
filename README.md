# Watch My Kid - טופס הרשמה

שירות הגנה מתקדם על ילדים ברשת החברתית. ניטור חכם של WhatsApp, זיהוי תוכן פוגעני והתראות בזמן אמת.

## טכנולוגיות

פרויקט זה נבנה עם:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## התקנה והרצה

### דרישות מוקדמות

- Node.js (מומלץ להתקין עם [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm או bun

### שלבי התקנה

```sh
# שלב 1: שכפל את הריפוזיטורי
git clone <YOUR_GIT_URL>

# שלב 2: עבור לתיקיית הפרויקט
cd watchKidForm

# שלב 3: התקן את התלויות
npm install
# או
bun install

# שלב 4: הפעל את שרת הפיתוח
npm run dev
# או
bun dev
```

האפליקציה תרוץ על `http://localhost:8080`

## הגדרת Google Sheets

לחיבור הטופס ל-Google Sheets, עקוב אחר ההוראות בקובץ `GOOGLE_SHEETS_SETUP.md`.

## בנייה לפרודקשן

```sh
npm run build
# או
bun run build
```

הקבצים המבונים יופיעו בתיקייה `dist/`.

## רישיון

פרויקט זה הוא פרטי.
