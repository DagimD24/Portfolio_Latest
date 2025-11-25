
import { motion } from 'framer-motion';
import { usePortfolioData } from '@/hooks/usePortfolioData';

interface Skill {
  name: string;
  level: number;
  logo?: string;
  color?: string;
  bgGradient?: string;
}



// Default metadata for skills
interface SkillMetadata {
  logo: string;
  color: string;
  bgGradient: string;
}

const skillMetadata: Record<string, SkillMetadata> = {
  'React': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    color: '#61DAFB',
    bgGradient: 'from-cyan-500/10 to-blue-500/10',
  },
  'TypeScript': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
    color: '#3178C6',
    bgGradient: 'from-blue-500/10 to-blue-600/10',
  },
  'JavaScript': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    color: '#F7DF1E',
    bgGradient: 'from-yellow-400/10 to-yellow-500/10',
  },
  'HTML/CSS': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    color: '#E34F26',
    bgGradient: 'from-orange-500/10 to-red-500/10',
  },
  'Tailwind CSS': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
    color: '#06B6D4',
    bgGradient: 'from-cyan-400/10 to-teal-500/10',
  },
  'Next.js': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
    color: '#000000',
    bgGradient: 'from-gray-500/10 to-gray-700/10',
  },
  'Node.js': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    color: '#339933',
    bgGradient: 'from-green-500/10 to-green-600/10',
  },
  'Express': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
    color: '#000000',
    bgGradient: 'from-gray-700/10 to-gray-900/10',
  },
  'Python': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    color: '#3776AB',
    bgGradient: 'from-blue-600/10 to-blue-800/10',
  },
  'PostgreSQL': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
    color: '#336791',
    bgGradient: 'from-blue-500/10 to-blue-700/10',
  },
  'MongoDB': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
    color: '#47A248',
    bgGradient: 'from-green-500/10 to-green-700/10',
  },
  'REST APIs': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg',
    color: '#E0234E',
    bgGradient: 'from-red-500/10 to-pink-500/10',
  },
  'Go': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg',
    color: '#00ADD8',
    bgGradient: 'from-cyan-400/10 to-cyan-600/10',
  },
  'Git': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    color: '#F05032',
    bgGradient: 'from-red-500/10 to-orange-500/10',
  },
  'Docker': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
    color: '#2496ED',
    bgGradient: 'from-blue-400/10 to-blue-600/10',
  },
  'DigitalOcean': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/digitalocean/digitalocean-original.svg',
    color: '#0080FF',
    bgGradient: 'from-blue-400/10 to-blue-600/10',
  },
  'Frappe Framework': {
    logo: 'https://3x594zub0b.ufs.sh/f/2igJYTwT7E14UmoTxGhay4mkAEv9hHCYPogZjDO5cndbJ6l0',
    color: '#2496ED',
    bgGradient: 'from-blue-400/10 to-blue-600/10',
  },
  'ERPNext': {
    logo: 'https://3x594zub0b.ufs.sh/f/2igJYTwT7E14hJav7TS2zIvxYTE041i3QVwoS7F9bDNCrpWM',
    color: '#0080FF',
    bgGradient: 'from-blue-400/10 to-blue-600/10',
  },
  'GitHub': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
    color: '#181717',
    bgGradient: 'from-gray-500/10 to-gray-700/10',
  },
  'Figma': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
    color: '#F24E1E',
    bgGradient: 'from-orange-500/10 to-red-500/10',
  }
};

// Fallback for unknown skills
const getSkillMetadata = (name: string) => {
  return skillMetadata[name] || {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/codepen/codepen-plain.svg',
    color: '#666666',
    bgGradient: 'from-gray-400/10 to-gray-600/10',
  };
};

// Skill data will be loaded from portfolio-data.json

interface SkillCardProps {
  name: string;
  logo?: string;
  color?: string;
  bgGradient?: string;
  index: number;
}

function SkillCard({ name, index }: SkillCardProps) {
  const metadata = getSkillMetadata(name);
  const skill = {
    name,
    logo: metadata.logo,
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ margin: '-50px' }}
      transition={{
        duration: 0.4,
        delay: index * 0.03,
        type: 'spring',
        stiffness: 120,
      }}
      className="flex flex-col items-center gap-2"
      data-testid={`skill-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <img
        src={skill.logo}
        alt={`${skill.name} logo`}
        className="w-10 h-10 md:w-12 md:h-12 object-contain"
      />
      <span className="text-xs md:text-sm font-display font-semibold text-foreground text-center">
        {name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const { data, loading, error } = usePortfolioData();

  if (loading) {
    return (
      <section id="skills" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading skills...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="skills" className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error loading skills: {error}</div>
      </section>
    );
  }

  const { frontend = [], backend = [], tools = [], languages = [] } = data?.skills || {};

  const allSkills = Array.from(
    new Map(
      [
        ...frontend,
        ...backend,
        ...tools,
        ...(languages || []),
      ].map((skill) => [skill.name, skill])
    ).values()
  );
  return (
    <section id="skills" className="px-6 py-16 md:py-20">
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
                What I work with
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                <span className="font-display text-foreground">
                  Skills
                </span>
                <span className="font-display ml-3">&</span>
                <span className="font-display text-foreground ml-3">
                  Technologies
                </span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-sans">
                A showcase of the tools and technologies I use to bring ideas to life
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
              {allSkills.map((skill, index) => (
                <SkillCard
                  key={skill.name}
                  name={skill.name}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
