import { User, Mail, Calendar, Award, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Student } from '@/lib/mockData';

interface StudentCardProps {
  student: Student;
}

const StudentCard = ({ student }: StudentCardProps) => {
  const getCGPAColor = (cgpa: number) => {
    if (cgpa >= 9) return 'bg-success text-success-foreground';
    if (cgpa >= 8) return 'bg-accent text-accent-foreground';
    if (cgpa >= 7) return 'bg-primary text-primary-foreground';
    if (cgpa >= 6) return 'bg-warning text-warning-foreground';
    return 'bg-destructive text-destructive-foreground';
  };

  return (
    <Card className="overflow-hidden shadow-card animate-slide-up">
      <div className="gradient-primary p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-foreground/20 backdrop-blur">
            <User className="h-10 w-10 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h2 className="font-serif text-2xl font-bold text-primary-foreground">
              {student.name}
            </h2>
            <p className="text-primary-foreground/80 mt-1">{student.branch}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-none">
                {student.id}
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-none">
                {student.batch}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className={`inline-flex flex-col items-center justify-center rounded-xl px-4 py-3 ${getCGPAColor(student.cgpa)}`}>
              <span className="text-xs font-medium opacity-90">CGPA</span>
              <span className="text-2xl font-bold">{student.cgpa}</span>
            </div>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium text-foreground truncate">{student.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Enrolled</p>
              <p className="text-sm font-medium text-foreground">
                {new Date(student.enrollmentDate).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <BookOpen className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Total Credits</p>
              <p className="text-sm font-medium text-foreground">{student.totalCredits}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentCard;
