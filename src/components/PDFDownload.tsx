import { Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { Student } from '@/lib/mockData';

interface PDFDownloadProps {
  student: Student;
}

const PDFDownload = ({ student }: PDFDownloadProps) => {
  const { toast } = useToast();

  const generatePDFContent = () => {
    let content = `
STUDENT ACADEMIC REPORT
========================

STUDENT INFORMATION
-------------------
Name: ${student.name}
Student ID: ${student.id}
Branch: ${student.branch}
Batch: ${student.batch}
Email: ${student.email}
Enrollment Date: ${new Date(student.enrollmentDate).toLocaleDateString()}

ACADEMIC PERFORMANCE
--------------------
Overall CGPA: ${student.cgpa}
Total Credits: ${student.totalCredits}

SEMESTER-WISE RESULTS
---------------------
`;

    student.semesters.forEach((semester) => {
      content += `
SEMESTER ${semester.number}
SGPA: ${semester.sgpa} | Credits: ${semester.totalCredits}
${'─'.repeat(60)}
`;
      content += `${'Subject'.padEnd(40)}${'Code'.padEnd(10)}${'Credits'.padEnd(10)}${'Marks'.padEnd(10)}${'Grade'.padEnd(8)}${'Points'}\n`;
      content += `${'─'.repeat(60)}\n`;
      
      semester.subjects.forEach((subject) => {
        content += `${subject.name.padEnd(40)}${subject.code.padEnd(10)}${String(subject.credits).padEnd(10)}${String(subject.marks).padEnd(10)}${subject.grade.padEnd(8)}${subject.gradePoints}\n`;
      });
      content += '\n';
    });

    content += `
============================
Generated on: ${new Date().toLocaleString()}
EduResult Student Portal
============================
`;
    return content;
  };

  const handleDownload = () => {
    const content = generatePDFContent();
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${student.id}_academic_report.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: 'Download Started',
      description: 'Your academic report is being downloaded.',
    });
  };

  return (
    <Button
      onClick={handleDownload}
      variant="outline"
      className="gap-2 shadow-card hover:shadow-card-hover transition-all"
    >
      <Download className="h-4 w-4" />
      Download Report
    </Button>
  );
};

export default PDFDownload;
