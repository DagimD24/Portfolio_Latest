import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePortfolioData } from '@/hooks/usePortfolioData';

// Tech stack logo mapping - keep this for fallback
const techLogos: { [key: string]: string } = {
  'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  'Stripe': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/stripe/stripe-original.svg',
  'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
  'WebSocket': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg',
  'Express': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
  'OpenAI API': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openai/openai-original.svg',
  'Redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg',
  'GraphQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg',
  'AWS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  'D3.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/d3js/d3js-original.svg',
  'HTML/CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
  'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg',
  'Material-UI': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg',
  'Chart.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chartjs/chartjs-original.svg',
  'MDX': 'https://mdxjs.com/logo.png',
  'JWT': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg',
  'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
  'Svelte': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg',
  'Go': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg',
};

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured online shopping platform with real-time inventory management, payment processing, and admin dashboard.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Collaborative task management tool with real-time updates, team workspaces, and progress tracking.',
    tech: ['Next.js', 'TypeScript', 'MongoDB', 'WebSocket'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'Car Rental Platform',
    description: 'Modern chat application integrated with AI for smart replies, sentiment analysis, and conversation summaries.',
    tech: ['React', 'Express', 'OpenAI API', 'Redis'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 4,
    title: 'Portfolio CMS',
    description: 'Content management system designed for developers and creatives to showcase their work with ease.',
    tech: ['Next.js', 'GraphQL', 'PostgreSQL', 'AWS'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 5,
    title: 'Analytics Dashboard',
    description: 'Real-time analytics dashboard with interactive charts, data visualization, and custom reporting.',
    tech: ['React', 'D3.js', 'Node.js', 'MongoDB'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 6,
    title: 'Social Media API',
    description: 'RESTful API for a social networking platform with authentication, posts, comments, and user relationships.',
    tech: ['Express', 'PostgreSQL', 'JWT', 'Docker'],
    liveUrl: '#',
    githubUrl: '#',
  },
];

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  techLogos: { [key: string]: string };
}

function ProjectCard({ project, index, techLogos }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: 'spring',
        stiffness: 80,
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2 },
      }}
      className="group relative border border-border/50 rounded-xl p-6 bg-card dark:bg-zinc-900/50 shadow-md hover:shadow-xl hover:border-border/80 transition-all duration-300 overflow-hidden flex flex-col h-full"
      data-testid={`card-project-${project.id}`}
    >
      {/* Decorative line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-foreground/70 transition-colors" data-testid={`text-project-name-${project.id}`}>
        {project.title}
      </h3>
      
      <p className="text-muted-foreground text-sm mb-6 leading-relaxed font-sans">
        {project.description}
      </p>

      <div className="mt-auto space-y-4">
        {/* Tech stack with logos */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-background/80 dark:bg-background/50 text-foreground/80 rounded-full border border-border/50"
              title={tech}
            >
              {techLogos[tech] ? (
                <img 
                  src={techLogos[tech]} 
                  alt={tech} 
                  className="w-3.5 h-3.5"
                />
              ) : null}
              <span>{tech}</span>
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <Button
            variant="default"
            size="sm"
            onClick={() => console.log('Live demo:', project.title)}
            data-testid={`button-live-demo-${project.id}`}
            className="flex-1 bg-foreground hover:bg-foreground/90 text-background font-display"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Live Demo
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log('GitHub:', project.title)}
            data-testid={`button-github-${project.id}`}
            className="flex-1 font-display border-foreground/30 hover:border-foreground/60 hover:bg-foreground/5"
          >
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { data, loading, error } = usePortfolioData();

  if (loading) {
    return (
      <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading projects...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error loading projects: {error}</div>
      </section>
    );
  }

  const projects = data?.projects || [];
  const featuredProjects = projects.filter(project => project.featured);
  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-muted-foreground font-display text-sm md:text-base uppercase tracking-widest mb-4 block">
                My Work
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                <span className="font-display text-foreground">
                  Featured
                </span>
                <span className="font-display ml-3">Projects</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-sans">
                A collection of my recent work showcasing full-stack development expertise
              </p>
            </motion.div>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {featuredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index} 
                  techLogos={techLogos} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No featured projects to display.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
