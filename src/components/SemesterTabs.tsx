import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, Award, BookOpen } from 'lucide-react';
import type { Semester } from '@/lib/mockData';

interface SemesterTabsProps {
  semesters: Semester[];
}

const SemesterTabs = ({ semesters }: SemesterTabsProps) => {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
        return 'bg-success/10 text-success border-success/20';
      case 'A':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'B+':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'B':
        return 'bg-secondary text-secondary-foreground border-secondary';
      case 'C+':
      case 'C':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'D':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-destructive/10 text-destructive border-destructive/20';
    }
  };

  const getSGPAColor = (sgpa: number) => {
    if (sgpa >= 9) return 'text-success';
    if (sgpa >= 8) return 'text-accent';
    if (sgpa >= 7) return 'text-primary';
    return 'text-foreground';
  };

  return (
    <Card className="shadow-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <CardHeader className="pb-4">
        <CardTitle className="font-serif text-xl flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Semester-wise Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="1" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto gap-1 bg-muted/50 p-1">
            {semesters.map((sem) => (
              <TabsTrigger
                key={sem.number}
                value={String(sem.number)}
                className="text-xs sm:text-sm py-2 data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground"
              >
                Sem {sem.number}
              </TabsTrigger>
            ))}
          </TabsList>

          {semesters.map((semester) => (
            <TabsContent key={semester.number} value={String(semester.number)} className="mt-6">
              <div className="space-y-6">
                {/* Semester Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">SGPA</p>
                      <p className={`text-xl font-bold ${getSGPAColor(semester.sgpa)}`}>
                        {semester.sgpa}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <BookOpen className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Credits</p>
                      <p className="text-xl font-bold text-foreground">{semester.totalCredits}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                      <Award className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Subjects</p>
                      <p className="text-xl font-bold text-foreground">{semester.subjects.length}</p>
                    </div>
                  </div>
                </div>

                {/* Results Table */}
                <div className="rounded-lg border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50 hover:bg-muted/50">
                        <TableHead className="font-semibold text-foreground">Subject</TableHead>
                        <TableHead className="font-semibold text-foreground text-center">Code</TableHead>
                        <TableHead className="font-semibold text-foreground text-center">Credits</TableHead>
                        <TableHead className="font-semibold text-foreground text-center">Marks</TableHead>
                        <TableHead className="font-semibold text-foreground text-center">Grade</TableHead>
                        <TableHead className="font-semibold text-foreground text-center">Points</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {semester.subjects.map((subject, index) => (
                        <TableRow key={index} className="hover:bg-muted/30">
                          <TableCell className="font-medium text-foreground">
                            {subject.name}
                          </TableCell>
                          <TableCell className="text-center text-muted-foreground">
                            {subject.code}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline" className="bg-background">
                              {subject.credits}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center font-medium text-foreground">
                            {subject.marks}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge className={`${getGradeColor(subject.grade)} border`}>
                              {subject.grade}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center font-medium text-foreground">
                            {subject.gradePoints}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SemesterTabs;
