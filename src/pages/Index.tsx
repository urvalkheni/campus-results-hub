import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Search, BarChart3, Shield, FileText } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import { findStudentById } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = async (studentId: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const student = findStudentById(studentId);
    
    if (student) {
      navigate(`/student/${studentId}`);
    } else {
      toast({
        variant: 'destructive',
        title: 'Student Not Found',
        description: `No student found with ID: ${studentId}. Please check and try again.`,
      });
    }
    
    setIsLoading(false);
  };

  const features = [
    {
      icon: Search,
      title: 'Quick Search',
      description: 'Find any student results instantly using their unique Student ID',
    },
    {
      icon: BarChart3,
      title: 'Detailed Analytics',
      description: 'View semester-wise performance with GPA calculations',
    },
    {
      icon: FileText,
      title: 'Download Reports',
      description: 'Export academic reports for official use',
    },
    {
      icon: Shield,
      title: 'Secure Access',
      description: 'Protected admin panel for authorized personnel only',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col gradient-hero">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 sm:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <div className="flex justify-center mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shadow-xl">
                  <GraduationCap className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Student Result Portal
              </h1>
              <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
                Access your complete academic record across all 8 semesters. 
                Enter your Student ID to view detailed results, grades, and GPA.
              </p>
              
              <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-card border-y border-border">
          <div className="container">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-center mb-12">
              Portal Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="p-6 rounded-xl bg-background border border-border shadow-card hover:shadow-card-hover transition-all animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Active Students', value: '2,500+' },
                { label: 'Departments', value: '12' },
                { label: 'Semesters', value: '8' },
                { label: 'Courses', value: '150+' },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center p-6 rounded-xl bg-card border border-border shadow-card animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <p className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
