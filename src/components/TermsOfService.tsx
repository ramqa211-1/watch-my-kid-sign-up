import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TermsOfServiceProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TermsOfService = ({ open, onOpenChange }: TermsOfServiceProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-right">תנאי השימוש</DialogTitle>
          <DialogDescription className="text-right">
            נא קרא בעיון את תנאי השימוש לפני השימוש בשירות
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="text-right space-y-6 text-sm leading-relaxed">
            <div>
              <h3 className="font-semibold text-base mb-2">1. כללי</h3>
              <p className="text-muted-foreground">
                תנאי שימוש אלו ("התנאים") חלים על השימוש בשירות "Watch My Kid" ("השירות"). 
                על ידי השימוש בשירות, אתה מסכים לתנאים אלו. אם אינך מסכים לתנאים אלו, 
                אנא אל תשתמש בשירות.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">2. תיאור השירות</h3>
              <p className="text-muted-foreground">
                השירות מספק כלים לניטור והגנה על ילדים ברשת החברתית. השירות מיועד 
                לשימוש הורים ואפוטרופוסים חוקיים בלבד. השימוש בשירות כפוף להסכמה 
                מפורשת של ההורה/אפוטרופוס.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">3. הגבלות שימוש</h3>
              <p className="text-muted-foreground">
                אתה מתחייב לא להשתמש בשירות למטרות בלתי חוקיות או בלתי מוסריות. 
                אסור להשתמש בשירות כדי להפר זכויות של אחרים, לרבות זכויות פרטיות, 
                זכויות יוצרים או זכויות אחרות.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">4. אחריות</h3>
              <p className="text-muted-foreground">
                השירות מסופק "כפי שהוא" ללא כל אחריות מפורשת או משתמעת. 
                אנו לא מתחייבים שהשירות יהיה ללא שגיאות, בטוח לחלוטין או יענה על 
                כל הדרישות שלך. השימוש בשירות הוא על אחריותך הבלעדית.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">5. הגבלת אחריות</h3>
              <p className="text-muted-foreground">
                במידה המקסימלית המותרת על פי הדין, אנו לא נהיה אחראים לכל נזק ישיר, 
                עקיף, מקרי, מיוחד או תוצאתי הנובע מהשימוש או אי יכולת להשתמש בשירות, 
                לרבות אובדן נתונים, רווחים או נזקים אחרים.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">6. שינויים בתנאים</h3>
              <p className="text-muted-foreground">
                אנו שומרים לעצמנו את הזכות לשנות, לעדכן או להסיר חלקים מתנאים אלו 
                בכל עת. שינויים ייכנסו לתוקף מייד עם פרסומם באתר. המשך השימוש בשירות 
                לאחר שינויים מהווה הסכמה לתנאים המעודכנים.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">7. ביטול השירות</h3>
              <p className="text-muted-foreground">
                אנו שומרים לעצמנו את הזכות להפסיק או להשהות את השירות בכל עת, 
                ללא הודעה מוקדמת, מכל סיבה שהיא, לרבות הפרה של תנאים אלו.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">8. דין שולט</h3>
              <p className="text-muted-foreground">
                תנאים אלו כפופים לחוקי מדינת ישראל. כל מחלוקת הנובעת מתנאים אלו 
                תיפתר בפני בתי המשפט המוסמכים בישראל.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">9. יצירת קשר</h3>
              <p className="text-muted-foreground">
                לשאלות או הערות בנוגע לתנאים אלו, אנא צור קשר עם השירות באמצעות 
                הפרטים המופיעים באתר.
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

