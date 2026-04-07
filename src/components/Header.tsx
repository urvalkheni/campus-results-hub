import { GraduationCap, Settings, Moon, Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const Header = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold text-foreground">EduResult</span>
            <span className="text-xs text-muted-foreground">Student Portal</span>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <Link to="/">
            <Button
              variant={location.pathname === '/' ? 'secondary' : 'ghost'}
              size="sm"
              className="hidden sm:flex"
            >
              Home
            </Button>
          </Link>
          <Link to="/admin">
            <Button
              variant={location.pathname.startsWith('/admin') ? 'secondary' : 'ghost'}
              size="sm"
              className="gap-2"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Admin</span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
