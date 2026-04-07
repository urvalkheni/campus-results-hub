import { Student } from '@/lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface SemesterMarksTableProps {
  student: Student;
}

export default function SemesterMarksTable({ student }: SemesterMarksTableProps) {
  // Get all semester numbers (1-8)
  const semesterNumbers = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="font-serif text-xl">Semester-wise SGPA Overview</CardTitle>
        <CardDescription>Complete academic performance across all semesters</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="font-semibold sticky left-0 bg-muted/50 z-10 min-w-[200px]">
                    Name
                  </TableHead>
                  {semesterNumbers.map((num) => (
                    <TableHead key={num} className="font-semibold text-center min-w-[100px]">
                      Sem {num}
                    </TableHead>
                  ))}
                  <TableHead className="font-semibold text-center min-w-[100px] bg-primary/5">
                    CGPA
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-muted/30">
                  <TableCell className="font-medium sticky left-0 bg-background z-10">
                    {student.name}
                  </TableCell>
                  {semesterNumbers.map((num) => {
                    const semester = student.semesters.find((s) => s.number === num);
                    return (
                      <TableCell key={num} className="text-center">
                        {semester ? (
                          <Badge
                            variant="outline"
                            className={
                              semester.sgpa >= 8
                                ? 'bg-success/10 text-success border-success/20'
                                : semester.sgpa >= 6
                                ? 'bg-primary/10 text-primary border-primary/20'
                                : 'bg-warning/10 text-warning border-warning/20'
                            }
                          >
                            {semester.sgpa.toFixed(2)}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">-</span>
                        )}
                      </TableCell>
                    );
                  })}
                  <TableCell className="text-center bg-primary/5">
                    <Badge
                      className={
                        student.cgpa >= 8
                          ? 'bg-success text-success-foreground'
                          : student.cgpa >= 6
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-warning text-warning-foreground'
                      }
                    >
                      {student.cgpa.toFixed(2)}
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
