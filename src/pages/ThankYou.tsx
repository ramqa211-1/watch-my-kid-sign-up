import { useEffect } from "react";
import logo from "@/assets/logo.png";

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
          {/* Logo */}
          <div className="animate-scale-in mb-8">
            <div className="flex justify-center mb-6">
              <img 
                src={logo} 
                alt="Watch My Kid Logo" 
                className="h-32 md:h-40 lg:h-48 w-auto object-contain"
              />
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
                הפרטים שלך הועברו בהצלחה למערכת שלנו. אנחנו נעבור על הכל והמשך נשלח לך פרטים נוספים במייל על ביצוע ההתחברות וההליך.
              </p>
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-6 bg-muted/50 rounded-xl border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                מה קורה עכשיו?
              </h3>
              <ul className="text-right space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">1</span>
                  <span>לאחר אימות הפרטים ישלחו פרטים נוספים במייל</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">2</span>
                  <span>בגדול סורקים QR מהוואצפ של הילד ומחכים לאישור האימות</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">3</span>
                  <span>מעתה ואליך תקבל ניטור על הודעות פוגעניות או דברים מאיימים שנשלחו אל הילד שלכם באופן מיידי</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
