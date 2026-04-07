import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Check, X, Eye, Clock } from 'lucide-react';
import { getPendingRequests, approveRequest, rejectRequest, MarkChangeRequest } from '@/lib/requestData';
import { useToast } from '@/hooks/use-toast';

export default function PendingRequestsPanel() {
  const { toast } = useToast();
  const [requests, setRequests] = useState<MarkChangeRequest[]>(getPendingRequests());
  const [selectedRequest, setSelectedRequest] = useState<MarkChangeRequest | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewAction, setReviewAction] = useState<'approve' | 'reject'>('approve');
  const [reviewComments, setReviewComments] = useState('');

  const handleReviewClick = (request: MarkChangeRequest, action: 'approve' | 'reject') => {
    setSelectedRequest(request);
    setReviewAction(action);
    setReviewDialogOpen(true);
  };

  const handleReviewSubmit = () => {
    if (!selectedRequest) return;

    if (reviewAction === 'approve') {
      approveRequest(selectedRequest.id, 'Admin', reviewComments || undefined);
      toast({
        title: 'Request Approved',
        description: `Mark change for ${selectedRequest.studentName} has been approved.`,
      });
    } else {
      rejectRequest(selectedRequest.id, 'Admin', reviewComments || undefined);
      toast({
        variant: 'destructive',
        title: 'Request Rejected',
        description: `Mark change request has been rejected.`,
      });
    }

    // Refresh the list
    setRequests(getPendingRequests());
    setReviewDialogOpen(false);
    setReviewComments('');
    setSelectedRequest(null);
  };

  return (
    <>
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-serif text-xl flex items-center gap-2">
                <Clock className="h-5 w-5 text-warning" />
                Pending Mark Change Requests
              </CardTitle>
              <CardDescription>Review and approve/reject student mark change requests</CardDescription>
            </div>
            <Badge variant="outline" className="text-lg px-3 py-1">
              {requests.length} Pending
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No pending requests at the moment.
            </div>
          ) : (
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="font-semibold">Request ID</TableHead>
                    <TableHead className="font-semibold">Student</TableHead>
                    <TableHead className="font-semibold">Subject</TableHead>
                    <TableHead className="font-semibold text-center">Current</TableHead>
                    <TableHead className="font-semibold text-center">Requested</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id} className="hover:bg-muted/30">
                      <TableCell>
                        <Badge variant="secondary">{request.id}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{request.studentName}</div>
                          <div className="text-sm text-muted-foreground">{request.studentId}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{request.subjectCode}</div>
                          <div className="text-sm text-muted-foreground">Sem {request.semester}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">{request.currentMarks}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={
                            request.requestedMarks > request.currentMarks
                              ? 'bg-success/10 text-success border-success/20'
                              : 'bg-destructive/10 text-destructive border-destructive/20'
                          }
                        >
                          {request.requestedMarks}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(request.requestDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-primary"
                            onClick={() => {
                              setSelectedRequest(request);
                              setReviewAction('approve');
                            }}
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-success"
                            onClick={() => handleReviewClick(request, 'approve')}
                            title="Approve"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => handleReviewClick(request, 'reject')}
                            title="Reject"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              {reviewAction === 'approve' ? 'Approve Request' : 'Reject Request'}
            </DialogTitle>
            <DialogDescription>
              {reviewAction === 'approve'
                ? 'Confirm approval of this mark change request.'
                : 'Provide a reason for rejecting this request.'}
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <div className="text-sm text-muted-foreground">Student</div>
                  <div className="font-medium">{selectedRequest.studentName}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Subject</div>
                  <div className="font-medium">{selectedRequest.subjectCode}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Current Marks</div>
                  <div className="font-medium">{selectedRequest.currentMarks}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Requested Marks</div>
                  <div className="font-medium">{selectedRequest.requestedMarks}</div>
                </div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Student's Reason</Label>
                <div className="mt-1 p-3 bg-muted rounded-md text-sm">{selectedRequest.reason}</div>
              </div>
              <div>
                <Label htmlFor="comments">Review Comments {reviewAction === 'reject' && '(Required)'}</Label>
                <Textarea
                  id="comments"
                  placeholder="Add your comments..."
                  value={reviewComments}
                  onChange={(e) => setReviewComments(e.target.value)}
                  rows={3}
                  required={reviewAction === 'reject'}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setReviewDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              className={reviewAction === 'approve' ? 'bg-success hover:bg-success/90' : 'bg-destructive hover:bg-destructive/90'}
              onClick={handleReviewSubmit}
              disabled={reviewAction === 'reject' && !reviewComments}
            >
              {reviewAction === 'approve' ? 'Approve' : 'Reject'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
