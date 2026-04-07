import { Student } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Download, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BulkOperationsProps {
  students: Student[];
  onImport?: (data: any) => void;
}

export default function BulkOperations({ students, onImport }: BulkOperationsProps) {
  const { toast } = useToast();

  const handleExportCSV = () => {
    // Create CSV header
    const headers = ['Student ID', 'Name', 'Branch', 'Batch', 'Email', 'Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8', 'CGPA'];
    
    // Create CSV rows
    const rows = students.map(student => {
      const semesterSGPAs = Array.from({ length: 8 }, (_, i) => {
        const sem = student.semesters.find(s => s.number === i + 1);
        return sem ? sem.sgpa.toFixed(2) : '-';
      });
      
      return [
        student.id,
        student.name,
        student.branch,
        student.batch,
        student.email,
        ...semesterSGPAs,
        student.cgpa.toFixed(2),
      ];
    });

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `student_records_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: 'Export Successful',
      description: `Exported ${students.length} student records to CSV.`,
    });
  };

  const handleExportJSON = () => {
    const jsonContent = JSON.stringify(students, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `student_records_${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: 'Export Successful',
      description: `Exported ${students.length} student records to JSON.`,
    });
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        let data;

        if (file.name.endsWith('.json')) {
          data = JSON.parse(content);
        } else if (file.name.endsWith('.csv')) {
          // Basic CSV parsing
          const lines = content.split('\n');
          const headers = lines[0].split(',');
          data = lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.replace(/"/g, '').trim());
            const obj: any = {};
            headers.forEach((header, i) => {
              obj[header.trim()] = values[i];
            });
            return obj;
          });
        }

        if (onImport) {
          onImport(data);
        }

        toast({
          title: 'Import Successful',
          description: 'Student records have been imported.',
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Import Failed',
          description: 'Failed to parse the file. Please check the format.',
        });
      }
    };

    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={handleExportCSV} className="gap-2">
        <Download className="h-4 w-4" />
        Export CSV
      </Button>
      <Button variant="outline" onClick={handleExportJSON} className="gap-2">
        <Download className="h-4 w-4" />
        Export JSON
      </Button>
      <Button variant="outline" className="gap-2 relative">
        <Upload className="h-4 w-4" />
        Import Data
        <input
          type="file"
          accept=".csv,.json"
          onChange={handleImport}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </Button>
    </div>
  );
}
