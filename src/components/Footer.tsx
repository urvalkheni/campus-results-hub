import { GraduationCap, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-serif font-bold text-foreground">EduResult</span>
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-destructive fill-destructive" /> for students
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} EduResult. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
