export interface Subject {
  name: string;
  code: string;
  credits: number;
  marks: number;
  grade: string;
  gradePoints: number;
}

export interface Semester {
  number: number;
  subjects: Subject[];
  sgpa: number;
  totalCredits: number;
}

export interface Student {
  id: string;
  name: string;
  branch: string;
  batch: string;
  email: string;
  enrollmentDate: string;
  photoUrl?: string;
  semesters: Semester[];
  cgpa: number;
  totalCredits: number;
}

const gradeToPoints: Record<string, number> = {
  'A+': 10,
  'A': 9,
  'B+': 8,
  'B': 7,
  'C+': 6,
  'C': 5,
  'D': 4,
  'F': 0,
};

const getGrade = (marks: number): string => {
  if (marks >= 90) return 'A+';
  if (marks >= 80) return 'A';
  if (marks >= 70) return 'B+';
  if (marks >= 60) return 'B';
  if (marks >= 50) return 'C+';
  if (marks >= 40) return 'C';
  if (marks >= 30) return 'D';
  return 'F';
};

const calculateSGPA = (subjects: Subject[]): number => {
  const totalGradePoints = subjects.reduce((acc, sub) => acc + sub.gradePoints * sub.credits, 0);
  const totalCredits = subjects.reduce((acc, sub) => acc + sub.credits, 0);
  return totalCredits > 0 ? Math.round((totalGradePoints / totalCredits) * 100) / 100 : 0;
};

const calculateCGPA = (semesters: Semester[]): number => {
  const totalGradePoints = semesters.reduce((acc, sem) => {
    return acc + sem.subjects.reduce((subAcc, sub) => subAcc + sub.gradePoints * sub.credits, 0);
  }, 0);
  const totalCredits = semesters.reduce((acc, sem) => acc + sem.totalCredits, 0);
  return totalCredits > 0 ? Math.round((totalGradePoints / totalCredits) * 100) / 100 : 0;
};

const generateSubjects = (semNumber: number): Subject[] => {
  const semesterSubjects: Record<number, { name: string; code: string; credits: number }[]> = {
    1: [
      { name: 'Engineering Mathematics I', code: 'MA101', credits: 4 },
      { name: 'Engineering Physics', code: 'PH101', credits: 4 },
      { name: 'Engineering Chemistry', code: 'CH101', credits: 4 },
      { name: 'Programming Fundamentals', code: 'CS101', credits: 3 },
      { name: 'Engineering Graphics', code: 'ME101', credits: 3 },
      { name: 'Communication Skills', code: 'HS101', credits: 2 },
    ],
    2: [
      { name: 'Engineering Mathematics II', code: 'MA102', credits: 4 },
      { name: 'Data Structures', code: 'CS102', credits: 4 },
      { name: 'Digital Electronics', code: 'EC101', credits: 4 },
      { name: 'Object Oriented Programming', code: 'CS103', credits: 3 },
      { name: 'Environmental Science', code: 'ES101', credits: 3 },
      { name: 'Workshop Practice', code: 'ME102', credits: 2 },
    ],
    3: [
      { name: 'Discrete Mathematics', code: 'MA201', credits: 4 },
      { name: 'Database Management Systems', code: 'CS201', credits: 4 },
      { name: 'Computer Organization', code: 'CS202', credits: 4 },
      { name: 'Operating Systems', code: 'CS203', credits: 4 },
      { name: 'Technical Writing', code: 'HS201', credits: 2 },
    ],
    4: [
      { name: 'Probability & Statistics', code: 'MA202', credits: 4 },
      { name: 'Design & Analysis of Algorithms', code: 'CS204', credits: 4 },
      { name: 'Computer Networks', code: 'CS205', credits: 4 },
      { name: 'Software Engineering', code: 'CS206', credits: 3 },
      { name: 'Microprocessors', code: 'CS207', credits: 3 },
    ],
    5: [
      { name: 'Theory of Computation', code: 'CS301', credits: 4 },
      { name: 'Compiler Design', code: 'CS302', credits: 4 },
      { name: 'Artificial Intelligence', code: 'CS303', credits: 4 },
      { name: 'Web Technologies', code: 'CS304', credits: 3 },
      { name: 'Elective I', code: 'CSE01', credits: 3 },
    ],
    6: [
      { name: 'Machine Learning', code: 'CS305', credits: 4 },
      { name: 'Distributed Systems', code: 'CS306', credits: 4 },
      { name: 'Information Security', code: 'CS307', credits: 4 },
      { name: 'Cloud Computing', code: 'CS308', credits: 3 },
      { name: 'Elective II', code: 'CSE02', credits: 3 },
    ],
    7: [
      { name: 'Deep Learning', code: 'CS401', credits: 4 },
      { name: 'Big Data Analytics', code: 'CS402', credits: 4 },
      { name: 'Internet of Things', code: 'CS403', credits: 3 },
      { name: 'Elective III', code: 'CSE03', credits: 3 },
      { name: 'Project Phase I', code: 'CS490', credits: 4 },
    ],
    8: [
      { name: 'Blockchain Technology', code: 'CS404', credits: 3 },
      { name: 'Ethics in Computing', code: 'HS401', credits: 2 },
      { name: 'Elective IV', code: 'CSE04', credits: 3 },
      { name: 'Project Phase II', code: 'CS491', credits: 8 },
      { name: 'Internship', code: 'CS492', credits: 4 },
    ],
  };

  const subjects = semesterSubjects[semNumber] || [];
  return subjects.map(sub => {
    const marks = Math.floor(Math.random() * 40) + 60; // 60-100 marks
    const grade = getGrade(marks);
    return {
      ...sub,
      marks,
      grade,
      gradePoints: gradeToPoints[grade],
    };
  });
};

const generateSemesters = (): Semester[] => {
  const semesters: Semester[] = [];
  for (let i = 1; i <= 8; i++) {
    const subjects = generateSubjects(i);
    const totalCredits = subjects.reduce((acc, sub) => acc + sub.credits, 0);
    semesters.push({
      number: i,
      subjects,
      sgpa: calculateSGPA(subjects),
      totalCredits,
    });
  }
  return semesters;
};

export const mockStudents: Student[] = [
  {
    id: 'CSE2021001',
    name: 'Rahul Kumar Singh',
    branch: 'Computer Science & Engineering',
    batch: '2021-2025',
    email: 'rahul.singh@university.edu',
    enrollmentDate: '2021-08-15',
    semesters: generateSemesters(),
    cgpa: 0,
    totalCredits: 0,
  },
  {
    id: 'CSE2021002',
    name: 'Priya Sharma',
    branch: 'Computer Science & Engineering',
    batch: '2021-2025',
    email: 'priya.sharma@university.edu',
    enrollmentDate: '2021-08-15',
    semesters: generateSemesters(),
    cgpa: 0,
    totalCredits: 0,
  },
  {
    id: 'ECE2021001',
    name: 'Amit Patel',
    branch: 'Electronics & Communication',
    batch: '2021-2025',
    email: 'amit.patel@university.edu',
    enrollmentDate: '2021-08-15',
    semesters: generateSemesters(),
    cgpa: 0,
    totalCredits: 0,
  },
  {
    id: 'ME2021001',
    name: 'Sneha Gupta',
    branch: 'Mechanical Engineering',
    batch: '2021-2025',
    email: 'sneha.gupta@university.edu',
    enrollmentDate: '2021-08-15',
    semesters: generateSemesters(),
    cgpa: 0,
    totalCredits: 0,
  },
];

// Calculate CGPA for all students
mockStudents.forEach(student => {
  student.cgpa = calculateCGPA(student.semesters);
  student.totalCredits = student.semesters.reduce((acc, sem) => acc + sem.totalCredits, 0);
});

export const findStudentById = (id: string): Student | undefined => {
  return mockStudents.find(student => student.id.toLowerCase() === id.toLowerCase());
};

export const getAllStudents = (): Student[] => {
  return mockStudents;
};
