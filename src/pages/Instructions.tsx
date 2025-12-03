import { useState } from "react";
import { SetupForm } from "@/components/SetupForm";
import { Shield, Lock, AlertCircle, DollarSign } from "lucide-react";
import logo from "@/assets/logo.png";

const Instructions = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 -z-10" />
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Logo Header */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <img 
            src={logo} 
            alt="Watch My Kid Logo" 
            className="h-32 md:h-40 lg:h-48 w-auto mx-auto object-contain mb-8"
          />
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              הוראות התקנה
            </h1>
            <p className="text-xl text-muted-foreground">
              מדריך מפורט להתקנת האפליקציה וחיבור WhatsApp
            </p>
          </div>

          {/* Important Notes */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-medium border border-border space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-primary" />
              דגשים חשובים לפני הליך ההתקנה
            </h2>

            {/* Privacy Notice */}
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
              <div className="flex items-start gap-4">
                <Lock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="text-right space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">הגנת הפרטיות</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">חשוב להבין:</strong> אנו <strong>לא אוספים שום מידע</strong> מה-WhatsApp של הילד 
                    ולא חשופים לשיחות. אנו <strong>שומרים על הפרטיות המלאה</strong> של המשתמש. 
                    השירות נועד <strong>רק לאמצעי בטיחות</strong> לאיתור הודעות פוגעניות שנשלחו אל הילד שלכם.
                  </p>
                </div>
              </div>
            </div>

            {/* Pricing Notice */}
            <div className="bg-secondary/5 rounded-xl p-6 border border-secondary/20">
              <div className="flex items-start gap-4">
                <DollarSign className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <div className="text-right space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">עלות השירות</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    עלות האפליקציה החודשית היא <strong className="text-foreground">15 דולר</strong>. 
                    זהו העלות המינימלית התפעולית שעולה לנו לתחזק את המערכת ושאר השירותים שעליהם אנו משלמים. 
                    <strong className="text-foreground"> אין לנו שום מטרת רווח</strong> - כל העלות היא רק לכיסוי הוצאות התפעול.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Installation Steps */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-medium border border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
              <Shield className="w-6 h-6 text-primary" />
              הליך ההתקנה
            </h2>

            <div className="space-y-6 text-right">
              {/* Step 1 */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground">
                  שלב 1: קבלת QR Code
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  לאחר הרישום, תקבל QR Code מיוחד. QR Code זה הוא המפתח לחיבור מכשיר הילד לאפליקציה.
                </p>
              </div>

              {/* Step 2 */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground">
                  שלב 2: סריקת QR Code מ-WhatsApp של הילד
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  התהליך זהה לחיבור מכשיר ל-WhatsApp Web:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground mr-4">
                  <li>פתח את WhatsApp במכשיר הילד</li>
                  <li>לחץ על תפריט (שלוש נקודות בפינה הימנית העליונה)</li>
                  <li>בחר "מכשירים מקושרים" או "Linked Devices"</li>
                  <li>לחץ על "קשר מכשיר" או "Link a Device"</li>
                  <li>סרוק את ה-QR Code שקיבלת מהאפליקציה</li>
                  <li>המתן לאישור החיבור</li>
                </ol>
              </div>

              {/* Step 3 */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground">
                  שלב 3: הגדרת מספר טלפון להתראות
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  לאחר החיבור, הגדר את מספר הטלפון של ההורה או המפקח שיקבל התראות בזמן אמת 
                  על הודעות פוגעניות שנשלחו אל הילד.
                </p>
              </div>

              {/* Step 4 */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground">
                  שלב 4: דיווח על בעיות
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  אם נתקלת בבעיות כלשהן במהלך ההתקנה או החיבור, אנא ציין אותן בטופס למטה. 
                  נשמח לעזור לך לפתור כל בעיה.
                </p>
              </div>
            </div>
          </div>

          {/* Setup Form */}
          <div className="bg-card rounded-2xl p-6 md:p-8 lg:p-10 shadow-medium border border-border">
            <div className="text-right mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                טופס הגדרת ניטור
              </h2>
              <p className="text-muted-foreground">
                מלא את הפרטים הבאים כדי להשלים את ההתקנה
              </p>
            </div>
            
            <SetupForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;

