import { useState } from 'react';
import { Lock, LogIn, LogOut, Users, Plus, Pencil, Trash2, Search, Eye } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { getAllStudents, Student, mockStudents } from '@/lib/mockData';
import StudentDialog from '@/components/StudentDialog';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import SemesterMarksTable from '@/components/SemesterMarksTable';
import BulkOperations from '@/components/BulkOperations';
import PendingRequestsPanel from '@/components/PendingRequestsPanel';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState<Student[]>(getAllStudents());
  const [studentDialogOpen, setStudentDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [viewingSemesterTable, setViewingSemesterTable] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple demo authentication
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      toast({
        title: 'Login Successful',
        description: 'Welcome to the admin panel.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid credentials. Try admin/admin123',
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    toast({
      title: 'Logged Out',
      description: 'You have been logged out successfully.',
    });
  };

  const handleAddStudent = () => {
    setSelectedStudent(null);
    setStudentDialogOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setStudentDialogOpen(true);
  };

  const handleSaveStudent = (studentData: Partial<Student>) => {
    if (selectedStudent) {
      // Edit existing student
      setStudents(students.map(s => s.id === selectedStudent.id ? { ...s, ...studentData } : s));
      toast({
        title: 'Student Updated',
        description: `${studentData.name}'s record has been updated successfully.`,
      });
    } else {
      // Add new student
      const newStudent: Student = {
        ...studentData as Student,
        semesters: [],
        cgpa: 0,
        totalCredits: 0,
        enrollmentDate: new Date().toISOString().split('T')[0],
      };
      setStudents([...students, newStudent]);
      toast({
        title: 'Student Added',
        description: `${studentData.name} has been added successfully.`,
      });
    }
  };

  const handleDeleteClick = (student: Student) => {
    setStudentToDelete(student);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (studentToDelete) {
      setStudents(students.filter(s => s.id !== studentToDelete.id));
      toast({
        title: 'Student Deleted',
        description: `${studentToDelete.name}'s record has been deleted.`,
      });
      setStudentToDelete(null);
    }
  };

  const filteredStudents = students.filter(
    student =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.branch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col gradient-hero">
        <Header />
        
        <main className="flex-1 flex items-center justify-center py-12">
          <Card className="w-full max-w-md shadow-xl animate-slide-up">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary">
                  <Lock className="h-7 w-7 text-primary-foreground" />
                </div>
              </div>
              <CardTitle className="font-serif text-2xl">Admin Login</CardTitle>
              <CardDescription>
                Enter your credentials to access the admin panel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Username
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12"
                  />
                </div>
                <Button type="submit" className="w-full h-12 gradient-primary gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Demo credentials: admin / admin123
                </p>
              </form>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col gradient-hero">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          {/* Admin Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-serif text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage students and their academic records</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Students', value: students.length, icon: Users },
              { label: 'Departments', value: new Set(students.map(s => s.branch)).size, icon: Users },
              { label: 'Avg. CGPA', value: students.length > 0 ? (students.reduce((a, s) => a + s.cgpa, 0) / students.length).toFixed(2) : '0', icon: Users },
              { label: 'Total Credits', value: students.reduce((a, s) => a + s.totalCredits, 0), icon: Users },
            ].map((stat, index) => (
              <Card key={stat.label} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <stat.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Semester-wise Marks Table View */}
          {viewingSemesterTable && students.length > 0 && (
            <div className="mb-8">
              <SemesterMarksTable student={students[0]} />
            </div>
          )}

          {/* Pending Requests Panel */}
          <div className="mb-8">
            <PendingRequestsPanel />
          </div>

          {/* Student Management */}
          <Card className="shadow-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="font-serif text-xl">Student Management</CardTitle>
                  <CardDescription>View and manage all student records</CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setViewingSemesterTable(!viewingSemesterTable)}
                    className="gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    {viewingSemesterTable ? 'Hide' : 'View'} Semester Table
                  </Button>
                  <Button onClick={handleAddStudent} className="gap-2 gradient-primary">
                    <Plus className="h-4 w-4" />
                    Add Student
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Bulk Operations */}
              <div className="mb-4">
                <BulkOperations students={students} />
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, ID, or branch..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Table */}
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50 hover:bg-muted/50">
                      <TableHead className="font-semibold">Student ID</TableHead>
                      <TableHead className="font-semibold">Name</TableHead>
                      <TableHead className="font-semibold hidden md:table-cell">Branch</TableHead>
                      <TableHead className="font-semibold hidden sm:table-cell">Batch</TableHead>
                      <TableHead className="font-semibold text-center">CGPA</TableHead>
                      <TableHead className="font-semibold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id} className="hover:bg-muted/30">
                        <TableCell>
                          <Badge variant="secondary">{student.id}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">
                          {student.branch}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-muted-foreground">
                          {student.batch}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            className={
                              student.cgpa >= 8
                                ? 'bg-success/10 text-success border-success/20'
                                : student.cgpa >= 6
                                ? 'bg-primary/10 text-primary border-primary/20'
                                : 'bg-warning/10 text-warning border-warning/20'
                            }
                          >
                            {student.cgpa}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleEditStudent(student)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => handleDeleteClick(student)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredStudents.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No students found matching your search.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />

      {/* Dialogs */}
      <StudentDialog
        open={studentDialogOpen}
        onOpenChange={setStudentDialogOpen}
        onSave={handleSaveStudent}
        student={selectedStudent}
      />
      
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        studentName={studentToDelete?.name || ''}
      />
    </div>
  );
};

export default Admin;
