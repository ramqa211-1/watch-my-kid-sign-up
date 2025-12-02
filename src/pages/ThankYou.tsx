import { Button } from "@/components/ui/button";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { useEffect } from "react";

const ThankYou = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 -z-10" />
      
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="animate-scale-in mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full gradient-hero mb-6">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              תודה רבה!
            </h1>
            
            <div className="bg-card rounded-2xl p-8 shadow-soft border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                צעד אחרון להגנה על ילדך
              </h2>
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                הפרטים שלך הועברו בהצלחה למערכת שלנו. כעת, לחץ על הכפתור למטה כדי לעבור לאפליקציה הרשמית של "Watch My Kid" ולהתחיל בתהליך ההתקנה והאימות.
              </p>

              <Button 
                size="lg" 
                variant="hero"
                className="w-full md:w-auto text-lg px-8 py-6 h-auto"
                onClick={() => {
                  // Replace with actual app URL
                  window.open('https://watchmykid.app', '_blank');
                }}
              >
                <span>מעבר לאפליקציה הרשמית</span>
                <ExternalLink className="w-5 h-5" />
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-6 bg-muted/50 rounded-xl border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                מה קורה עכשיו?
              </h3>
              <ul className="text-right space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">1</span>
                  <span>הורדת האפליקציה הרשמית במכשיר הילד</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">2</span>
                  <span>הגדרת הרשאות הנחוצות לסריקת WhatsApp</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">3</span>
                  <span>קבלת התראות על פעילות חשודה בזמן אמת</span>
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <a 
                href="/" 
                className="text-primary hover:text-primary-light transition-colors underline-offset-4 hover:underline"
              >
                חזרה לדף הבית
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
