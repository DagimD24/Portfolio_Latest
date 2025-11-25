import { motion } from 'framer-motion';
import { usePortfolioData } from '@/hooks/usePortfolioData';

interface Education {
  id: number;
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
  achievements: string[];
}

// Format date to display as 'Month YYYY'
const formatDate = (dateString: string) => {
  if (!dateString) return 'Present';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

// Get duration string
const getDuration = (startDate: string, endDate: string) => {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

// Helper function to safely access array items
const safeMap = <T,>(arr: T[] | undefined, callback: (item: T, index: number) => React.ReactNode) => {
  if (!Array.isArray(arr)) return null;
  return arr.map(callback);
};

interface EducationCardProps {
  education: Education;
  index: number;
}

function EducationCard({ education, index }: EducationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative pl-8 pb-12 last:pb-0"
      data-testid={`education-${education.id}`}
    >
      <div className="absolute left-0 top-0 w-3 h-3 bg-foreground rounded-full" />
      <div className="absolute left-[5px] top-3 bottom-0 w-0.5 bg-foreground/30" />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-display font-semibold text-foreground">
            {education.degree}
          </h3>
          <span className="text-sm text-muted-foreground">
            {getDuration(education.startDate, education.endDate)}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <p className="text-foreground/80 font-medium">{education.institution}</p>
          <p className="text-sm text-muted-foreground">{education.location}</p>
        </div>
        {education.gpa && (
          <p className="text-sm text-foreground/80">GPA: {education.gpa}</p>
        )}
        {education.achievements && education.achievements.length > 0 && (
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-4">
            {safeMap(education.achievements, (achievement, i) => (
              <li key={i} className="leading-relaxed">
                {achievement}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

export default function Education() {
  const { data, loading, error } = usePortfolioData();

  if (loading) {
    return (
      <section id="education" className="px-6 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading education...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="education" className="px-6 py-16">
        <div className="text-red-500">Error loading education: {error}</div>
      </section>
    );
  }

  const educationList = data?.education || [];

  return (
    <section id="education" className="px-6 py-16">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <span className="text-muted-foreground font-display text-sm md:text-base uppercase tracking-widest mb-4 block">
              Academic Background
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              <span className="font-display text-foreground">
                Education
              </span>
            </h2>
          </div>

          {educationList.length > 0 ? (
            <div className="space-y-8">
              {educationList.map((education, index) => (
                <EducationCard key={education.id} education={education} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No education to display.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
