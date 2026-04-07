import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Student, Subject } from '@/lib/mockData';
import { addRequest } from '@/lib/requestData';
import { useToast } from '@/hooks/use-toast';

interface MarkChangeRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student;
}

export default function MarkChangeRequestDialog({ open, onOpenChange, student }: MarkChangeRequestDialogProps) {
  const { toast } = useToast();
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [requestedMarks, setRequestedMarks] = useState<string>('');
  const [reason, setReason] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const semester = student.semesters.find(s => s.number === Number(selectedSemester));
    const subject = semester?.subjects.find(s => s.code === selectedSubject);

    if (!subject) return;

    addRequest({
      studentId: student.id,
      studentName: student.name,
      semester: Number(selectedSemester),
      subjectCode: subject.code,
      subjectName: subject.name,
      currentMarks: subject.marks,
      requestedMarks: Number(requestedMarks),
      reason,
    });

    toast({
      title: 'Request Submitted',
      description: 'Your mark change request has been submitted for admin approval.',
    });

    // Reset form
    setSelectedSemester('');
    setSelectedSubject('');
    setRequestedMarks('');
    setReason('');
    onOpenChange(false);
  };

  // Get subjects for selected semester
  const availableSubjects: Subject[] = selectedSemester
    ? student.semesters.find(s => s.number === Number(selectedSemester))?.subjects || []
    : [];

  // Get current marks for selected subject
  const currentSubject = availableSubjects.find(s => s.code === selectedSubject);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Request Mark Change</DialogTitle>
          <DialogDescription>
            Submit a request to update your marks. Admin approval is required.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="semester">Semester</Label>
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger id="semester">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {student.semesters.map((sem) => (
                    <SelectItem key={sem.number} value={String(sem.number)}>
                      Semester {sem.number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedSemester && (
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSubjects.map((subject) => (
                      <SelectItem key={subject.code} value={subject.code}>
                        {subject.code} - {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {currentSubject && (
              <>
                <div className="grid gap-2">
                  <Label>Current Marks</Label>
                  <div className="p-3 bg-muted rounded-md">
                    <span className="font-semibold">{currentSubject.marks}</span> / 100
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="requestedMarks">Requested Marks</Label>
                  <Input
                    id="requestedMarks"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Enter new marks"
                    value={requestedMarks}
                    onChange={(e) => setRequestedMarks(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="reason">Reason for Change</Label>
                  <Textarea
                    id="reason"
                    placeholder="Explain why marks should be changed..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={4}
                    required
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="gradient-primary"
              disabled={!selectedSemester || !selectedSubject || !requestedMarks || !reason}
            >
              Submit Request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
