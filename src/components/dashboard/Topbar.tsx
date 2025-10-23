import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useLocation } from "react-router-dom";

interface TopbarProps {
  onSearchChange: (value: string) => void;
}

export const Topbar = ({ onSearchChange }: TopbarProps) => {
  const location = useLocation();

  return (
    <div className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
      <div className="flex-1 max-w-xl">
        {location.pathname === "/dashboard" && ( <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search residents..."
            className="pl-10"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>) }
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </Button>
      </div>
    </div>
  );
};
