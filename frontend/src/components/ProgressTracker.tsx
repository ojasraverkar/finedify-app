import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Target, 
  BookOpen, 
  TrendingUp,
  Award,
  Calendar,
  Clock
} from "lucide-react";

const ProgressTracker = () => {
  const achievements = [
    { name: "First Trade", icon: Target, earned: true },
    { name: "Risk Master", icon: Trophy, earned: true },
    { name: "Diversification Expert", icon: TrendingUp, earned: false },
    { name: "Algorithm Trader", icon: Award, earned: false }
  ];

  const weeklyGoal = {
    target: 5,
    completed: 3,
    unit: "lessons"
  };

  return (
    <section id="progress" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Track Your Learning Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Monitor your progress, earn achievements, and stay motivated with 
            personalized learning analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Overall Progress */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span>Overall Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">68%</div>
                <p className="text-sm text-muted-foreground">Course Completion</p>
              </div>
              
              <Progress value={68} className="h-3" />
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Completed Lessons</span>
                  <span className="font-medium">34/50</span>
                </div>
                <div className="flex justify-between">
                  <span>Quiz Scores</span>
                  <span className="font-medium text-success">85% avg</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Invested</span>
                  <span className="font-medium">24 hours</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Goal */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-success" />
                <span>Weekly Goal</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-success mb-2">
                  {weeklyGoal.completed}/{weeklyGoal.target}
                </div>
                <p className="text-sm text-muted-foreground">
                  {weeklyGoal.unit} this week
                </p>
              </div>
              
              <Progress 
                value={(weeklyGoal.completed / weeklyGoal.target) * 100} 
                className="h-3" 
              />
              
              <div className="text-center">
                <Badge variant="secondary" className="gradient-success text-white">
                  {weeklyGoal.target - weeklyGoal.completed} more to goal
                </Badge>
              </div>

              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>3 days remaining</span>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="shadow-soft md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-warning" />
                <span>Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div 
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      achievement.earned 
                        ? 'bg-success/10 border border-success/20' 
                        : 'bg-muted/50 border border-muted'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      achievement.earned 
                        ? 'bg-success text-white' 
                        : 'bg-muted-foreground/20 text-muted-foreground'
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`font-medium text-sm ${
                        achievement.earned ? 'text-success' : 'text-muted-foreground'
                      }`}>
                        {achievement.name}
                      </div>
                      {achievement.earned && (
                        <div className="text-xs text-success/70">Earned</div>
                      )}
                    </div>
                  </div>
                );
              })}
              
              <div className="pt-2 text-center text-xs text-muted-foreground">
                2 of 4 achievements earned
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Streak */}
        <Card className="mt-8 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Learning Streak</h3>
                <p className="text-muted-foreground text-sm">
                  Keep your momentum going! You're on a great streak.
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary mb-2">7</div>
                <p className="text-sm text-muted-foreground">days</p>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2 mt-6">
              {[...Array(7)].map((_, i) => (
                <div 
                  key={i}
                  className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium ${
                    i < 7 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProgressTracker;