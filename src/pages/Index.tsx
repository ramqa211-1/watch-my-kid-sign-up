import { useState } from "react";
import { RegistrationForm } from "@/components/RegistrationForm";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import { TermsOfService } from "@/components/TermsOfService";
import { PrivacyPolicy } from "@/components/PrivacyPolicy";
import { Shield, Eye, Bell, Lock } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import logo from "@/assets/logo.png";

const Index = () => {
  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 -z-10" />
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Logo Header */}
        <div className="max-w-6xl mx-auto mb-12 md:mb-16 text-center">
          <img 
            src={logo} 
            alt="Watch My Kid Logo" 
            className="h-32 md:h-40 lg:h-48 w-auto mx-auto object-contain"
          />
        </div>

        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-12 md:mb-16">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Text Content */}
            <div className="text-right space-y-6 animate-slide-up order-2 md:order-1">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Shield className="w-4 h-4" />
                <span>הגנה מתקדמת לילדים ברשת</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                רישום לשירות
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                הגנה על ילדך ברשת החברתית - מעקב חכם אחר תוכן פוגעני, בריונות רשת והטרדות
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-right">
                    <h3 className="font-semibold text-foreground">ניטור חכם</h3>
                    <p className="text-sm text-muted-foreground">זיהוי אוטומטי של תוכן מזיק</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="text-right">
                    <h3 className="font-semibold text-foreground">התראות בזמן אמת</h3>
                    <p className="text-sm text-muted-foreground">עדכונים מיידיים על פעילות חשודה</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-right">
                    <h3 className="font-semibold text-foreground">פרטיות מובטחת</h3>
                    <p className="text-sm text-muted-foreground">הצפנה מלאה של כל המידע</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-right">
                    <h3 className="font-semibold text-foreground">הגנה מתמשכת</h3>
                    <p className="text-sm text-muted-foreground">מעקב 24/7 ללא הפסקה</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="animate-fade-in order-1 md:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-strong">
                <img 
                  src={heroImage} 
                  alt="הורה וילד משתמשים בסמארטפון יחד בצורה בטוחה"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Registration Section */}
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Privacy Notice */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <PrivacyNotice />
          </div>

          {/* Registration Form */}
          <div className="bg-card rounded-2xl p-6 md:p-8 lg:p-10 shadow-medium border border-border animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-right mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                טופס הרשמה
              </h2>
              <p className="text-muted-foreground">
                מלא את הפרטים הבאים כדי להתחיל להגן על ילדך ברשת
              </p>
            </div>
            
            <RegistrationForm />
          </div>

          {/* Additional Info */}
          <div className="text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p>
              בשליחת הטופס אתה מסכים ל
              <button
                type="button"
                onClick={() => setTermsOpen(true)}
                className="text-primary hover:text-primary-light underline mx-1 cursor-pointer"
              >
                תנאי השימוש
              </button>
              ול
              <button
                type="button"
                onClick={() => setPrivacyOpen(true)}
                className="text-primary hover:text-primary-light underline mx-1 cursor-pointer"
              >
                מדיניות הפרטיות
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TermsOfService open={termsOpen} onOpenChange={setTermsOpen} />
      <PrivacyPolicy open={privacyOpen} onOpenChange={setPrivacyOpen} />
    </div>
  );
};

export default Index;
