import { AlertCircle } from "lucide-react";

export const PrivacyNotice = () => {
  return (
    <div className="bg-primary/5 border-2 border-primary/20 rounded-xl p-6 md:p-8 shadow-soft">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <AlertCircle className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 space-y-3 text-right">
          <h3 className="text-xl font-bold text-foreground">
            📝 הצהרת פרטיות חשובה
          </h3>
          <div className="space-y-4 text-base text-foreground/90 leading-relaxed">
            <p className="font-semibold">
              אנו רוצים להדגיש כי אתר זה אינו אוסף, שומר או מעבד את תוכן הודעות ה-WhatsApp של ילדך או כל מידע פוגעני שעלול להתגלות.
            </p>
            <p>
              תפקידנו הוא <span className="font-semibold text-primary">תיווך והפניה בלבד</span>. הנתונים שאתה מזין בטופס (שם, מייל, טלפון) נשמרים לצורך העברתם המאובטחת לשירות "Watch My Kid" הרשמי, אשר מבצע את הסריקה בפועל <span className="font-semibold">לאחר אישורך והתקנת האפליקציה במכשיר הילד.</span>
            </p>
            <p>
              אנו מתחייבים לאבטח את פרטי הקשר שלך ולמחוק אותם מהמאגר שלנו ברגע שהקשר עם האפליקציה נוצר.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
