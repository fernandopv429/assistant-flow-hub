import { Button } from "@/components/ui/button";
import { Calendar, User, Bell, Menu, LogOut } from "lucide-react";

interface HeaderProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
  onSignIn: () => void;
  onSignOut: () => void;
}

export const Header = ({ user, onSignIn, onSignOut }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Assistant Flow Hub
            </h1>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </a>
          <a href="#calendar" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Agenda
          </a>
          <a href="#clients" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Clientes
          </a>
          <a href="#integrations" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Integrações
          </a>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>
              
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted">
                <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="text-sm">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-muted-foreground text-xs">{user.email}</p>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onSignOut}
                className="text-muted-foreground hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button onClick={onSignIn} variant="hero">
              Entrar com Google
            </Button>
          )}
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};