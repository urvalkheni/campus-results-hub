import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (studentId: string) => void;
  isLoading?: boolean;
}

const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [studentId, setStudentId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId.trim()) {
      onSearch(studentId.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Enter Student ID (e.g., CSE2021001)"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="h-14 pl-12 pr-4 text-base bg-card border-border shadow-card focus:shadow-card-hover transition-shadow"
          />
        </div>
        <Button 
          type="submit" 
          size="lg"
          className="h-14 px-8 gradient-primary shadow-card hover:shadow-card-hover transition-all"
          disabled={isLoading || !studentId.trim()}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <Search className="h-5 w-5 mr-2" />
              Search
            </>
          )}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mt-3 text-center">
        Try: CSE2021001, CSE2021002, ECE2021001, or ME2021001
      </p>
    </form>
  );
};

export default SearchBar;
