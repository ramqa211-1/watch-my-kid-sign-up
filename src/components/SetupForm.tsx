import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Shield, CheckCircle2, Mail, AlertCircle } from "lucide-react";

interface SetupFormData {
  email: string;
  parentPhone: string;
  notes: string;
  qrScanSuccessful: boolean;
}

export const SetupForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);
  const [formData, setFormData] = useState<SetupFormData>({
    email: "",
    parentPhone: "",
    notes: "",
    qrScanSuccessful: false,
  });

  const [errors, setErrors] = useState<Partial<SetupFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<SetupFormData> = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "יש להזין כתובת אימייל";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "כתובת אימייל לא תקינה";
    }

    const phoneRegex = /^[\d\-\+\(\)\s]{9,}$/;
    if (!formData.parentPhone.trim()) {
      newErrors.parentPhone = "יש להזין מספר טלפון";
    } else if (!phoneRegex.test(formData.parentPhone)) {
      newErrors.parentPhone = "מספר טלפון לא תקין";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // בדיקת מייל מול Google Sheets
  // הערה: בגלל בעיות CORS עם Google Apps Script, נשתמש ב-no-cors mode
  // ולכן לא נוכל לקרוא את התשובה. הבדיקה תתבצע רק בעת השליחה.
  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
      if (!scriptUrl) {
        throw new Error("Google Script URL לא מוגדר");
      }

      // שימוש ב-POST request עם no-cors כדי להימנע מבעיות CORS
      // לא נוכל לקרוא את התשובה, אבל זה יעבוד
      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors", // no-cors כדי להימנע מבעיות CORS
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "checkEmail",
          email: email,
        }),
      });

      // בגלל no-cors, לא נוכל לקרוא את התשובה
      // נחזיר true כדי לאפשר המשך (הבדיקה האמיתית תתבצע בעת השליחה)
      return true;
    } catch (error) {
      console.error("Error checking email:", error);
      // אם יש שגיאה, נחזיר true כדי לא לחסום את המשתמש
      return true;
    }
  };

  // בדיקת מייל בעת שינוי
  // הערה: בגלל בעיות CORS, הבדיקה תתבצע רק בעת השליחה
  const handleEmailBlur = async () => {
    if (!formData.email.trim()) {
      setEmailVerified(null);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmailVerified(null);
      return;
    }

    // בגלל בעיות CORS, נסמן שהמייל תקין מבחינת פורמט
    // הבדיקה האמיתית תתבצע בעת השליחה
    setEmailVerified(null); // null = לא נבדק עדיין
    setIsCheckingEmail(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "שגיאה בטופס",
        description: "אנא תקן את השדות המסומנים",
        variant: "destructive",
      });
      return;
    }

    // הערה: בגלל בעיות CORS עם Google Apps Script, הבדיקה תתבצע בצד השרת
    // השרת יבדוק את המייל ויחזיר שגיאה אם המייל לא קיים
    // כאן נמשיך לשליחה - הבדיקה תתבצע בסקריפט

    setIsSubmitting(true);

    try {
      // Get Google Apps Script URL from environment variable
      const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
      
      if (!scriptUrl) {
        throw new Error("Google Script URL לא מוגדר");
      }

      // Prepare data with timestamp
      const submissionData = {
        type: "setup", // להבדיל מהטופס הראשי
        email: formData.email,
        parentPhone: formData.parentPhone,
        notes: formData.notes || "",
        qrScanSuccessful: formData.qrScanSuccessful,
        timestamp: new Date().toISOString(),
      };

      // Send data to Google Apps Script
      // הערה: בגלל בעיות CORS, נשתמש ב-no-cors mode
      // הבדיקה של המייל תתבצע בצד השרת
      const response = await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors", // Required for Google Apps Script (no CORS support)
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      // Note: no-cors mode doesn't allow reading response
      // הבדיקה של המייל תתבצע בצד השרת
      // אם המייל לא קיים, השרת לא ישמור את הנתונים
      console.log("Setup form submitted to Google Sheets:", submissionData);
      
      toast({
        title: "הטופס נשלח בהצלחה!",
        description: "תודה על מילוי הטופס. נחזור אליך בהקדם.",
      });

      // Reset form
      setFormData({
        email: "",
        parentPhone: "",
        notes: "",
        qrScanSuccessful: false,
      });
      setEmailVerified(null);
      
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error submitting setup form:", error);
      toast({
        title: "שגיאה",
        description: "משהו השתבש. אנא נסה שוב.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof SetupFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email - Required for verification */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-base">
          כתובת אימייל <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">
          יש להזין את אותה כתובת אימייל שהזנת בטופס ההרשמה
        </p>
        <div className="relative">
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => {
              handleChange("email", e.target.value);
              setEmailVerified(null); // איפוס הבדיקה בעת שינוי
            }}
            onBlur={handleEmailBlur}
            placeholder="example@email.com"
            className={`text-base pr-10 ${errors.email ? "border-destructive" : ""} ${emailVerified === true ? "border-green-500" : emailVerified === false ? "border-destructive" : ""}`}
            disabled={isSubmitting || isCheckingEmail}
            dir="ltr"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {isCheckingEmail ? (
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            ) : emailVerified === true ? (
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            ) : emailVerified === false ? (
              <AlertCircle className="w-4 h-4 text-destructive" />
            ) : (
              <Mail className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        </div>
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email}</p>
        )}
        {emailVerified === false && (
          <p className="text-sm text-destructive">
            כתובת האימייל הזו לא נרשמה בטופס ההרשמה. אנא מלא קודם את טופס ההרשמה בעמוד הבית.
          </p>
        )}
        {emailVerified === true && (
          <p className="text-sm text-green-600">
            ✓ המייל נמצא במערכת. ניתן להמשיך למילוי הטופס.
          </p>
        )}
      </div>

      {/* Parent Phone */}
      <div className="space-y-2">
        <Label htmlFor="parentPhone" className="text-base">
          מספר טלפון של ההורה/מפקח <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">
          מספר זה יקבל התראות בזמן אמת על הודעות פוגעניות
        </p>
        <Input
          id="parentPhone"
          type="tel"
          value={formData.parentPhone}
          onChange={(e) => handleChange("parentPhone", e.target.value)}
          placeholder="050-1234567"
          className={`text-base ${errors.parentPhone ? "border-destructive" : ""}`}
          disabled={isSubmitting}
          dir="ltr"
        />
        {errors.parentPhone && (
          <p className="text-sm text-destructive">{errors.parentPhone}</p>
        )}
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes" className="text-base">
          הערות / בעיות
        </Label>
        <p className="text-sm text-muted-foreground">
          אם נתקלת בבעיות במהלך ההתקנה או החיבור, אנא ציין כאן
        </p>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          placeholder="תיאור הבעיה או הערות נוספות..."
          className="text-base min-h-[120px]"
          disabled={isSubmitting}
        />
      </div>

      {/* QR Scan Success */}
      <div className="space-y-3">
        <div className="flex items-start space-x-3 space-x-reverse">
          <Checkbox
            id="qrScanSuccessful"
            checked={formData.qrScanSuccessful}
            onCheckedChange={(checked) => handleChange("qrScanSuccessful", checked === true)}
            disabled={isSubmitting}
            className="mt-1"
          />
          <div className="space-y-1">
            <Label
              htmlFor="qrScanSuccessful"
              className="text-base font-normal cursor-pointer"
            >
              הצלחתי לסרוק את ה-QR Code ולחבר את ה-WhatsApp של הילד לאפליקציה
            </Label>
            <p className="text-sm text-muted-foreground">
              סמן את התיבה הזו רק אם סיימת את תהליך החיבור בהצלחה
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="hero"
        size="lg"
        className="w-full text-lg py-6 h-auto font-semibold"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>שולח...</span>
          </>
        ) : (
          <>
            <Shield className="w-5 h-5" />
            <span>שלח פרטי הגדרה</span>
          </>
        )}
      </Button>
    </form>
  );
};

