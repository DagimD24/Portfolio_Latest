import { motion } from 'framer-motion';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import { CheckCircle2 } from 'lucide-react';

export default function About() {
  const { data, loading, error } = usePortfolioData();

  if (loading) {
    return (
      <section id="about" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-foreground/30 border-t-foreground mx-auto"></div>
          <p className="mt-4 text-muted-foreground font-display">Loading about section...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="about" className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>Error loading about section: {error}</p>
        </div>
      </section>
    );
  }
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-foreground/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-foreground/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
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
                Get to know me
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                <span className="font-display text-foreground">
                  About
                </span>
                <span className="font-display ml-3">Me</span>
              </h2>
            </motion.div>
          </div>

          {/* Single Paragraph Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-base md:text-lg lg:text-xl text-foreground/80 leading-relaxed text-center font-sans">
              {data?.about?.description || 'No description available.'}
            </p>
            {data?.about?.highlights && data.about.highlights.length > 1 && (
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.about.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="group bg-foreground/5 hover:bg-foreground/10 p-5 rounded-xl text-left border border-foreground/10 hover:border-foreground/30 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="font-display text-foreground/90">{highlight}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}