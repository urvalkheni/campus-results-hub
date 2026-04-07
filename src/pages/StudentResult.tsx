import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Edit } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StudentCard from '@/components/StudentCard';
import SemesterTabs from '@/components/SemesterTabs';
import PDFDownload from '@/components/PDFDownload';
import Leaderboard from '@/components/Leaderboard';
import PerformanceAnalytics from '@/components/PerformanceAnalytics';
import MarkChangeRequestDialog from '@/components/MarkChangeRequestDialog';
import { Button } from '@/components/ui/button';
import { findStudentById, Student, getAllStudents } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

const StudentResult = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [student, setStudent] = useState<Student | null>(null);
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [markRequestDialogOpen, setMarkRequestDialogOpen] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (studentId) {
        const foundStudent = findStudentById(studentId);
        const students = getAllStudents();
        
        if (foundStudent) {
          setStudent(foundStudent);
          setAllStudents(students);
        } else {
          toast({
            variant: 'destructive',
            title: 'Student Not Found',
            description: `No student found with ID: ${studentId}`,
          });
          navigate('/');
        }
      }
      
      setIsLoading(false);
    };

    fetchStudent();
  }, [studentId, navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col gradient-hero">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading student data...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!student) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col gradient-hero">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Search
            </Button>
            <div className="flex gap-2">
              <Button
                onClick={() => setMarkRequestDialogOpen(true)}
                className="gap-2 gradient-primary"
              >
                <Edit className="h-4 w-4" />
                Request Mark Change
              </Button>
              <PDFDownload student={student} />
            </div>
          </div>

          {/* Student Information */}
          <div className="space-y-6">
            <StudentCard student={student} />
            
            {/* Performance Analytics */}
            <PerformanceAnalytics student={student} allStudents={allStudents} />
            
            {/* Leaderboard */}
            <Leaderboard currentStudent={student} allStudents={allStudents} />
            
            {/* Semester Results */}
            <SemesterTabs semesters={student.semesters} />
          </div>

          {/* Mark Change Request Dialog */}
          <MarkChangeRequestDialog
            open={markRequestDialogOpen}
            onOpenChange={setMarkRequestDialogOpen}
            student={student}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StudentResult;
