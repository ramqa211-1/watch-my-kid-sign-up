import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PrivacyPolicyProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PrivacyPolicy = ({ open, onOpenChange }: PrivacyPolicyProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-right">מדיניות הפרטיות</DialogTitle>
          <DialogDescription className="text-right">
            הגנת הפרטיות שלך חשובה לנו. נא קרא את מדיניות הפרטיות שלנו
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="text-right space-y-6 text-sm leading-relaxed">
            <div>
              <h3 className="font-semibold text-base mb-2">1. כללי</h3>
              <p className="text-muted-foreground">
                מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים, מגנים ומשתפים 
                את המידע האישי שלך בעת השימוש בשירות "Watch My Kid". אנו מחויבים 
                להגן על פרטיותך ולשמור על המידע האישי שלך.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">2. מידע שאנו אוספים</h3>
              <p className="text-muted-foreground">
                אנו אוספים מידע שאתה מספק לנו מרצונך, לרבות:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mr-4 mt-2 space-y-1">
                <li>שם מלא</li>
                <li>כתובת דוא"ל</li>
                <li>מספר טלפון</li>
                <li>שם הילד (אופציונלי)</li>
                <li>אמצעי קשר מועדף</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">3. שימוש במידע</h3>
              <p className="text-muted-foreground">
                אנו משתמשים במידע שאספנו למטרות הבאות:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mr-4 mt-2 space-y-1">
                <li>יצירת קשר עם המשתמש</li>
                <li>מתן השירות והתמיכה הטכנית</li>
                <li>שיפור השירות והחוויה</li>
                <li>שליחת עדכונים והתראות רלוונטיות</li>
                <li>עמידה בדרישות חוקיות</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">4. הגנת המידע</h3>
              <p className="text-muted-foreground">
                אנו נוקטים אמצעי אבטחה טכניים וארגוניים מתאימים כדי להגן על המידע 
                האישי שלך מפני גישה לא מורשית, שימוש, שינוי או חשיפה. עם זאת, 
                אין מערכת אבטחה מושלמת, ואנו לא יכולים להבטיח אבטחה מוחלטת.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">5. שיתוף מידע</h3>
              <p className="text-muted-foreground">
                אנו לא מוכרים, משכירים או מעבירים את המידע האישי שלך לצדדים שלישיים 
                למטרות שיווק. אנו עשויים לשתף מידע רק במקרים הבאים:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mr-4 mt-2 space-y-1">
                <li>עם הסכמתך המפורשת</li>
                <li>כאשר נדרש על פי חוק או צו בית משפט</li>
                <li>עם ספקי שירותים המסייעים לנו להפעיל את השירות (תחת הסכמי סודיות)</li>
                <li>להגנה על זכויותינו, רכושנו או ביטחוננו</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">6. זכויותיך</h3>
              <p className="text-muted-foreground">
                בהתאם לחוק הגנת הפרטיות, התשמ"א-1981, יש לך זכויות הבאות:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mr-4 mt-2 space-y-1">
                <li>זכות לעיין במידע האישי שלך</li>
                <li>זכות לבקש תיקון או מחיקה של מידע</li>
                <li>זכות להתנגד לעיבוד המידע</li>
                <li>זכות לבקש העברת המידע</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">7. עוגיות וטכנולוגיות מעקב</h3>
              <p className="text-muted-foreground">
                אנו עשויים להשתמש בטכנולוגיות מעקב שונות, לרבות עוגיות, כדי לשפר 
                את החוויה שלך באתר. אתה יכול להגדיר את הדפדפן שלך לדחות עוגיות, 
                אך זה עשוי להשפיע על תפקוד האתר.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">8. שמירת מידע</h3>
              <p className="text-muted-foreground">
                אנו שומרים את המידע האישי שלך כל עוד הוא נחוץ למטרות המפורטות 
                במדיניות זו, או כנדרש על פי חוק. לאחר מכן, המידע יימחק או יועבר 
                למצב אנונימי.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">9. שינויים במדיניות</h3>
              <p className="text-muted-foreground">
                אנו שומרים לעצמנו את הזכות לעדכן מדיניות פרטיות זו מעת לעת. 
                שינויים משמעותיים יפורסמו באתר, ואנו נשלח לך הודעה אם נדרש.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">10. יצירת קשר</h3>
              <p className="text-muted-foreground">
                לשאלות, בקשות או הערות בנוגע למדיניות פרטיות זו או למימוש זכויותיך, 
                אנא צור קשר עם השירות באמצעות הפרטים המופיעים באתר.
              </p>
            </div>

            <div className="text-xs text-muted-foreground pt-4 border-t">
              <p>תאריך עדכון אחרון: {new Date().toLocaleDateString('he-IL')}</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

