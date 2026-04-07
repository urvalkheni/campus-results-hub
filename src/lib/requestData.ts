export interface MarkChangeRequest {
  id: string;
  studentId: string;
  studentName: string;
  semester: number;
  subjectCode: string;
  subjectName: string;
  currentMarks: number;
  requestedMarks: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
  reviewedBy?: string;
  reviewDate?: string;
  reviewComments?: string;
}

// Mock pending requests
export const mockRequests: MarkChangeRequest[] = [
  {
    id: 'REQ001',
    studentId: 'CSE2021001',
    studentName: 'Rahul Kumar Singh',
    semester: 3,
    subjectCode: 'CS201',
    subjectName: 'Database Management Systems',
    currentMarks: 72,
    requestedMarks: 78,
    reason: 'Answer sheet re-evaluation found calculation error',
    status: 'pending',
    requestDate: '2024-12-20',
  },
  {
    id: 'REQ002',
    studentId: 'CSE2021002',
    studentName: 'Priya Sharma',
    semester: 2,
    subjectCode: 'CS102',
    subjectName: 'Data Structures',
    currentMarks: 68,
    requestedMarks: 74,
    reason: 'Internal marks not added correctly',
    status: 'pending',
    requestDate: '2024-12-21',
  },
];

export const addRequest = (request: Omit<MarkChangeRequest, 'id' | 'requestDate' | 'status'>) => {
  const newRequest: MarkChangeRequest = {
    ...request,
    id: `REQ${String(mockRequests.length + 1).padStart(3, '0')}`,
    requestDate: new Date().toISOString().split('T')[0],
    status: 'pending',
  };
  mockRequests.push(newRequest);
  return newRequest;
};

export const approveRequest = (requestId: string, adminName: string, comments?: string) => {
  const request = mockRequests.find(r => r.id === requestId);
  if (request) {
    request.status = 'approved';
    request.reviewedBy = adminName;
    request.reviewDate = new Date().toISOString().split('T')[0];
    request.reviewComments = comments;
  }
  return request;
};

export const rejectRequest = (requestId: string, adminName: string, comments?: string) => {
  const request = mockRequests.find(r => r.id === requestId);
  if (request) {
    request.status = 'rejected';
    request.reviewedBy = adminName;
    request.reviewDate = new Date().toISOString().split('T')[0];
    request.reviewComments = comments;
  }
  return request;
};

export const getRequestsByStudentId = (studentId: string) => {
  return mockRequests.filter(r => r.studentId === studentId);
};

export const getPendingRequests = () => {
  return mockRequests.filter(r => r.status === 'pending');
};
