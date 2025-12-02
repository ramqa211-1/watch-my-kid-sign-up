import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Loader2, Shield } from "lucide-react";

interface FormData {
  parentName: string;
  email: string;
  phone: string;
  childName: string;
  preferredContact: "email" | "phone";
}

export const RegistrationForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    parentName: "",
    email: "",
    phone: "",
    childName: "",
    preferredContact: "email",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.parentName.trim()) {
      newErrors.parentName = "יש להזין שם מלא";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "יש להזין כתובת דוא\"ל";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "כתובת דוא\"ל לא תקינה";
    }

    const phoneRegex = /^[\d\-\+\(\)\s]{9,}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "יש להזין מספר טלפון";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "מספר טלפון לא תקין";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

    setIsSubmitting(true);

    try {
      // Get Google Apps Script URL from environment variable
      const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
      
      if (!scriptUrl) {
        throw new Error("Google Script URL לא מוגדר");
      }

      // Prepare data with timestamp
      const submissionData = {
        parentName: formData.parentName,
        email: formData.email,
        phone: formData.phone,
        childName: formData.childName || "",
        preferredContact: formData.preferredContact,
        timestamp: new Date().toISOString(),
      };

      // Send data to Google Apps Script
      const response = await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors", // Required for Google Apps Script
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      // Note: no-cors mode doesn't allow reading response, so we assume success
      // The script will handle the data and return success
      
      console.log("Form submitted to Google Sheets:", submissionData);
      
      toast({
        title: "ההרשמה הושלמה בהצלחה!",
        description: "מעביר אותך לדף הבא...",
      });

      setTimeout(() => {
        navigate("/thank-you");
      }, 1000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "שגיאה",
        description: "משהו השתבש. אנא נסה שוב.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Parent Name */}
      <div className="space-y-2">
        <Label htmlFor="parentName" className="text-base">
          שם ההורה המלא <span className="text-destructive">*</span>
        </Label>
        <Input
          id="parentName"
          type="text"
          value={formData.parentName}
          onChange={(e) => handleChange("parentName", e.target.value)}
          placeholder="שם מלא"
          className={`text-base ${errors.parentName ? "border-destructive" : ""}`}
          disabled={isSubmitting}
        />
        {errors.parentName && (
          <p className="text-sm text-destructive">{errors.parentName}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-base">
          כתובת דוא"ל <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="example@email.com"
          className={`text-base ${errors.email ? "border-destructive" : ""}`}
          disabled={isSubmitting}
          dir="ltr"
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-base">
          מספר טלפון <span className="text-destructive">*</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="050-1234567"
          className={`text-base ${errors.phone ? "border-destructive" : ""}`}
          disabled={isSubmitting}
          dir="ltr"
        />
        {errors.phone && (
          <p className="text-sm text-destructive">{errors.phone}</p>
        )}
      </div>

      {/* Child Name (Optional) */}
      <div className="space-y-2">
        <Label htmlFor="childName" className="text-base text-muted-foreground">
          שם הילד/ה (אופציונלי)
        </Label>
        <Input
          id="childName"
          type="text"
          value={formData.childName}
          onChange={(e) => handleChange("childName", e.target.value)}
          placeholder="שם פרטי"
          className="text-base"
          disabled={isSubmitting}
        />
      </div>

      {/* Preferred Contact */}
      <div className="space-y-3">
        <Label className="text-base text-muted-foreground">
          אמצעי יצירת קשר מועדף
        </Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="preferredContact"
              value="email"
              checked={formData.preferredContact === "email"}
              onChange={(e) => handleChange("preferredContact", e.target.value)}
              disabled={isSubmitting}
              className="w-4 h-4 text-primary"
            />
            <span className="text-base">דוא"ל</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="preferredContact"
              value="phone"
              checked={formData.preferredContact === "phone"}
              onChange={(e) => handleChange("preferredContact", e.target.value)}
              disabled={isSubmitting}
              className="w-4 h-4 text-primary"
            />
            <span className="text-base">טלפון</span>
          </label>
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
            <span>שלח פרטים והתחל הגנה</span>
          </>
        )}
      </Button>
    </form>
  );
};
