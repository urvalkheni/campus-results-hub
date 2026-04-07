import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Student } from '@/lib/mockData';

interface StudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (student: Partial<Student>) => void;
  student?: Student | null;
}

export default function StudentDialog({ open, onOpenChange, onSave, student }: StudentDialogProps) {
  const [formData, setFormData] = useState<Partial<Student>>({
    id: '',
    name: '',
    branch: '',
    batch: '',
    email: '',
  });

  useEffect(() => {
    if (student) {
      setFormData(student);
    } else {
      setFormData({
        id: '',
        name: '',
        branch: '',
        batch: '',
        email: '',
      });
    }
  }, [student, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  const branches = [
    'Computer Science & Engineering',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Information Technology',
  ];

  const batches = [
    '2021-2025',
    '2022-2026',
    '2023-2027',
    '2024-2028',
    '2025-2029',
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            {student ? 'Edit Student' : 'Add New Student'}
          </DialogTitle>
          <DialogDescription>
            {student ? 'Update student information below.' : 'Enter student information to add a new record.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="id">Student ID</Label>
              <Input
                id="id"
                placeholder="CSE2021001"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                disabled={!!student}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter student name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="student@university.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="branch">Branch</Label>
              <Select
                value={formData.branch}
                onValueChange={(value) => setFormData({ ...formData, branch: value })}
              >
                <SelectTrigger id="branch">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch} value={branch}>
                      {branch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="batch">Batch</Label>
              <Select
                value={formData.batch}
                onValueChange={(value) => setFormData({ ...formData, batch: value })}
              >
                <SelectTrigger id="batch">
                  <SelectValue placeholder="Select batch" />
                </SelectTrigger>
                <SelectContent>
                  {batches.map((batch) => (
                    <SelectItem key={batch} value={batch}>
                      {batch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-primary">
              {student ? 'Update Student' : 'Add Student'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
