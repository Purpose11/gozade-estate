import { useState } from "react";
import { Bell, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useLocation } from "react-router-dom";

interface TopbarProps {
  onSearchChange: (value: string) => void;
}

export const Topbar = ({ onSearchChange }: TopbarProps) => {
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => setShowSearch((prev) => !prev);

  const isDashboard = location.pathname === "/dashboard";

  return (
    <div className="h-16 border-b border-border bg-card px-4 sm:px-6 flex items-center justify-between">
   
      <div className="flex-1 max-w-xl">
        {/* Desktop Search */}
        {isDashboard && (
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search residents..."
              className="pl-10"
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        )}
      </div>


      <div className="flex items-center gap-1 sm:gap-2">
        {/* Mobile Search Icon */}
        {isDashboard && (
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={toggleSearch}
          >
            {showSearch ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </Button>
        )}

        <ThemeToggle />

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </Button>
      </div>

      {/* Mobile Search Overlay */}
      {showSearch && isDashboard && (
        <div className="absolute top-16 left-0 w-full bg-card border-b border-border px-4 py-2 sm:hidden z-20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search residents..."
              className="pl-10"
              onChange={(e) => onSearchChange(e.target.value)}
              autoFocus
            />
          </div>
        </div>
      )}
    </div>
  );
};
