import { Student } from '@/lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PerformanceAnalyticsProps {
  student: Student;
  allStudents: Student[];
}

export default function PerformanceAnalytics({ student, allStudents }: PerformanceAnalyticsProps) {
  // Calculate average CGPA
  const avgCGPA = allStudents.reduce((sum, s) => sum + s.cgpa, 0) / allStudents.length;
  
  // Calculate performance vs average
  const performanceDiff = student.cgpa - avgCGPA;
  const performancePercent = ((performanceDiff / avgCGPA) * 100).toFixed(1);
  
  // Get semester-wise trend
  const semesterTrend = student.semesters.slice(-3).map(s => s.sgpa);
  const isImproving = semesterTrend.length >= 2 && semesterTrend[semesterTrend.length - 1] > semesterTrend[0];
  const isDeclining = semesterTrend.length >= 2 && semesterTrend[semesterTrend.length - 1] < semesterTrend[0];
  
  // Calculate highest and lowest performing semesters
  const sortedBySGPA = [...student.semesters].sort((a, b) => b.sgpa - a.sgpa);
  const bestSemester = sortedBySGPA[0];
  const worstSemester = sortedBySGPA[sortedBySGPA.length - 1];
  
  // Calculate students ahead and behind
  const sortedStudents = [...allStudents].sort((a, b) => b.cgpa - a.cgpa);
  const currentRank = sortedStudents.findIndex(s => s.id === student.id) + 1;
  const studentsAhead = currentRank - 1;
  const studentsBehind = allStudents.length - currentRank;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Performance vs Class Average */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Performance Comparison</CardTitle>
          <CardDescription>Your CGPA vs class average</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Your CGPA</span>
              <Badge className="bg-primary text-primary-foreground text-base px-3 py-1">
                {student.cgpa.toFixed(2)}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Class Average</span>
              <Badge variant="outline" className="text-base px-3 py-1">
                {avgCGPA.toFixed(2)}
              </Badge>
            </div>
            <div className="pt-3 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Difference</span>
                <div className="flex items-center gap-2">
                  {performanceDiff > 0 ? (
                    <TrendingUp className="h-4 w-4 text-success" />
                  ) : performanceDiff < 0 ? (
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  ) : (
                    <Minus className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className={`font-bold ${
                    performanceDiff > 0 ? 'text-success' : performanceDiff < 0 ? 'text-destructive' : 'text-muted-foreground'
                  }`}>
                    {performanceDiff > 0 ? '+' : ''}{performanceDiff.toFixed(2)} ({performanceDiff > 0 ? '+' : ''}{performancePercent}%)
                  </span>
                </div>
              </div>
              {performanceDiff > 0 ? (
                <p className="text-xs text-success mt-2">
                  You're performing above the class average! Keep it up! 🎉
                </p>
              ) : performanceDiff < 0 ? (
                <p className="text-xs text-muted-foreground mt-2">
                  There's room for improvement. Focus on weak areas! 💪
                </p>
              ) : (
                <p className="text-xs text-muted-foreground mt-2">
                  You're at the class average. Push harder to excel! 🎯
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Semester Trend */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Semester Trend</CardTitle>
          <CardDescription>Your recent performance trend</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Best Semester</span>
              <div className="text-right">
                <Badge className="bg-success text-success-foreground">
                  Sem {bestSemester.number}: {bestSemester.sgpa.toFixed(2)}
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Needs Improvement</span>
              <div className="text-right">
                <Badge variant="outline" className="text-warning border-warning/20">
                  Sem {worstSemester.number}: {worstSemester.sgpa.toFixed(2)}
                </Badge>
              </div>
            </div>
            <div className="pt-3 border-t border-border">
              <div className="flex items-center gap-2">
                {isImproving ? (
                  <>
                    <TrendingUp className="h-5 w-5 text-success" />
                    <div>
                      <div className="font-medium text-success">Improving Trend</div>
                      <div className="text-xs text-muted-foreground">
                        Your recent performance is getting better! 📈
                      </div>
                    </div>
                  </>
                ) : isDeclining ? (
                  <>
                    <TrendingDown className="h-5 w-5 text-destructive" />
                    <div>
                      <div className="font-medium text-destructive">Declining Trend</div>
                      <div className="text-xs text-muted-foreground">
                        Focus more to improve your grades! 📉
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Minus className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Stable Performance</div>
                      <div className="text-xs text-muted-foreground">
                        Maintain consistency and aim higher! 📊
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ranking Position */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Class Standing</CardTitle>
          <CardDescription>Your position in the class</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Current Rank</span>
              <Badge className="bg-primary text-primary-foreground text-xl px-4 py-1">
                #{currentRank}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-foreground">{studentsAhead}</div>
                <div className="text-xs text-muted-foreground">Ahead of you</div>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-foreground">{studentsBehind}</div>
                <div className="text-xs text-muted-foreground">Behind you</div>
              </div>
            </div>
            <div className="pt-3 border-t border-border">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Target className="h-4 w-4" />
                <span>
                  {studentsAhead === 0
                    ? "You're at the top! Maintain your position! 🏆"
                    : studentsAhead <= 3
                    ? "You're very close to the top! Keep pushing! 🔥"
                    : `Work hard to beat ${studentsAhead} students ahead! 💪`}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Improvement Suggestions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Improvement Goals</CardTitle>
          <CardDescription>Areas to focus on</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
              <div className="font-medium text-sm mb-1">Target CGPA</div>
              <div className="text-2xl font-bold text-primary">
                {(student.cgpa + 0.5).toFixed(2)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Aim for +0.5 improvement
              </div>
            </div>
            <div className="text-xs text-muted-foreground space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Review subjects from Semester {worstSemester.number}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Maintain consistency from Semester {bestSemester.number}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Study with top {Math.min(3, studentsAhead)} rankers for insights</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
