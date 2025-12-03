import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, Home } from "lucide-react";
import logo from "@/assets/logo.png";

export const Header = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="Watch My Kid Logo" 
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            <Link to="/">
              <Button
                variant={isActive("/") ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <Home className="w-4 h-4" />
                <span>דף הבית</span>
              </Button>
            </Link>
            <Link to="/instructions">
              <Button
                variant={isActive("/instructions") ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <Settings className="w-4 h-4" />
                <span>הוראות התקנה</span>
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

