import { Student } from '@/lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, TrendingUp, Award } from 'lucide-react';

interface LeaderboardProps {
  currentStudent?: Student;
  allStudents: Student[];
}

export default function Leaderboard({ currentStudent, allStudents }: LeaderboardProps) {
  // Sort students by CGPA in descending order
  const sortedStudents = [...allStudents].sort((a, b) => b.cgpa - a.cgpa);
  
  // Get current student's rank
  const currentStudentRank = currentStudent 
    ? sortedStudents.findIndex(s => s.id === currentStudent.id) + 1 
    : null;

  // Calculate percentile
  const percentile = currentStudentRank 
    ? Math.round((1 - (currentStudentRank - 1) / sortedStudents.length) * 100)
    : null;

  // Get top 5 students
  const topStudents = sortedStudents.slice(0, 5);

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-serif text-xl flex items-center gap-2">
              <Trophy className="h-5 w-5 text-warning" />
              Class Leaderboard
            </CardTitle>
            <CardDescription>Top performers based on CGPA</CardDescription>
          </div>
          {currentStudent && currentStudentRank && (
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">#{currentStudentRank}</div>
              <div className="text-xs text-muted-foreground">Your Rank</div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Current Student Stats */}
        {currentStudent && (
          <div className="mb-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-foreground">{currentStudent.cgpa.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">Your CGPA</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">#{currentStudentRank}</div>
                <div className="text-xs text-muted-foreground">Rank</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">{percentile}%</div>
                <div className="text-xs text-muted-foreground">Percentile</div>
              </div>
            </div>
          </div>
        )}

        {/* Top Students List */}
        <div className="space-y-3">
          {topStudents.map((student, index) => {
            const isCurrentStudent = currentStudent?.id === student.id;
            const rank = index + 1;
            
            return (
              <div
                key={student.id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                  isCurrentStudent
                    ? 'bg-primary/10 border-primary/30 shadow-sm'
                    : 'bg-card border-border hover:bg-muted/30'
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex-shrink-0">
                    {rank === 1 && (
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                        <Trophy className="h-5 w-5 text-white" />
                      </div>
                    )}
                    {rank === 2 && (
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                    )}
                    {rank === 3 && (
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                    )}
                    {rank > 3 && (
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <span className="font-bold text-muted-foreground">#{rank}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground truncate">
                      {student.name}
                      {isCurrentStudent && (
                        <Badge variant="outline" className="ml-2 text-xs">You</Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground truncate">{student.id}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    className={
                      student.cgpa >= 9
                        ? 'bg-success text-success-foreground'
                        : student.cgpa >= 8
                        ? 'bg-primary text-primary-foreground'
                        : student.cgpa >= 7
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-warning text-warning-foreground'
                    }
                  >
                    {student.cgpa.toFixed(2)}
                  </Badge>
                  {rank <= 3 && <TrendingUp className="h-4 w-4 text-success" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Show current student if not in top 5 */}
        {currentStudent && currentStudentRank && currentStudentRank > 5 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10 border border-primary/30">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-bold text-primary">#{currentStudentRank}</span>
                </div>
                <div>
                  <div className="font-medium text-foreground">{currentStudent.name}</div>
                  <div className="text-sm text-muted-foreground">{currentStudent.id}</div>
                </div>
              </div>
              <Badge className="bg-primary text-primary-foreground">
                {currentStudent.cgpa.toFixed(2)}
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
