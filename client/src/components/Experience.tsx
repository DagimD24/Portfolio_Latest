import { motion } from 'framer-motion';
import { usePortfolioData } from '@/hooks/usePortfolioData';

interface Experience {
  id: number;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

// Format date to display as 'Month YYYY'
const formatDate = (dateString: string) => {
  if (!dateString) return 'Present';
  const date = new Date(dateString);
  // Check if date is valid
  if (isNaN(date.getTime())) return dateString; // Return original string if invalid date
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

// Calculate duration between two dates
const getDuration = (startDate: string, endDate: string | null, isCurrent: boolean) => {
  if (isCurrent || !endDate) {
    return `${formatDate(startDate)} - Present`;
  }
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

// Helper function to safely access array items
const safeMap = <T,>(arr: T[] | undefined, callback: (item: T, index: number) => React.ReactNode) => {
  if (!Array.isArray(arr)) return null;
  return arr.map(callback);
};

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

function ExperienceCard({ experience, index }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative pl-8 pb-12 last:pb-0"
      data-testid={`experience-${experience.id}`}
    >
      <div className="absolute left-0 top-0 w-3 h-3 bg-foreground rounded-full" />
      <div className="absolute left-[5px] top-3 bottom-0 w-0.5 bg-foreground/30" />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-display font-semibold text-foreground">
            {experience.position}
          </h3>
          <span className="text-sm text-muted-foreground">
            {getDuration(experience.startDate, experience.endDate, experience.current)}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <p className="text-foreground/80 font-medium">{experience.company}</p>
          <p className="text-sm text-muted-foreground">{experience.location}</p>
        </div>
        <p className="text-sm text-foreground/80">{experience.description}</p>
        {experience.achievements && experience.achievements.length > 0 && (
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-4">
            {safeMap(experience.achievements, (achievement, i) => (
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

export default function Experience() {
  const { data, loading, error } = usePortfolioData();

  if (loading) {
    return (
      <section id="experience" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading experience...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="experience" className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error loading experience: {error}</div>
      </section>
    );
  }

  const experiences = data?.experience || [];

  return (
    <section id="experience" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <span className="text-muted-foreground font-display text-sm md:text-base uppercase tracking-widest mb-4 block">
              My Journey
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              <span className="font-display text-foreground">
                Experience
              </span>
            </h2>
          </div>

          {experiences.length > 0 ? (
            <div className="space-y-8">
              {experiences.map((experience, index) => (
                <ExperienceCard key={experience.id} experience={experience} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No experience to display.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
