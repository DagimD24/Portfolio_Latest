import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import headshotImage from '@assets/headshot bitmoji.png';
import { ArrowRight, Download, Sparkles } from 'lucide-react';

interface HeroProps {
  onViewWork: () => void;
  onDownloadResume: () => void;
}

export default function Hero({ onViewWork, onDownloadResume }: HeroProps) {
  const { data, loading, error } = usePortfolioData();

  if (loading) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-foreground/30 border-t-foreground mx-auto"></div>
          <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-2 border-foreground/20"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error loading hero section</div>
      </section>
    );
  }

  const firstName = data?.personal?.name?.split(' ')[0] || 'Developer';
  const lastName = data?.personal?.name?.split(' ').slice(1).join(' ') || '';

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 relative">

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            {/* Greeting badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ amount: 0.6 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 mb-8"
            >
              
              <span className="text-sm font-medium font-display text-foreground">Available for work</span>
            </motion.div>

            {/* Main heading with mixed fonts */}
            <div className="mb-6">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg md:text-xl font-display text-muted-foreground mb-2"
              >
                Hello, I'm
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.6 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
              >
                <span className="font-display text-foreground">
                  {firstName}
                </span>
                {lastName && (
                  <span className="block font-display text-foreground mt-1">
                    {lastName}
                  </span>
                )}
              </motion.h1>
            </div>

            {/* Title with accent */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-foreground/90 mb-6"
            >
              <span className="relative">
                {data?.personal?.title || 'Full Stack Developer'}
              </span>
            </motion.h2>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed font-sans"
            >
              {data?.personal?.bio || 'I build modern, efficient, and scalable web applications.'}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4"
            >
              <Button
                size="lg"
                onClick={onViewWork}
                className="min-w-[200px] group bg-foreground hover:bg-foreground/90 text-background font-display font-medium shadow-lg shadow-foreground/25 hover:shadow-xl hover:shadow-foreground/30 transition-all duration-300"
                data-testid="button-view-work"
              >
                View My Work
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              {data?.personal?.resume && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="min-w-[200px] group font-display font-medium border-2 border-foreground/30 hover:border-foreground/60 hover:bg-foreground/5 transition-all duration-300"
                  data-testid="button-download-resume"
                >
                  <a 
                    href={data.personal.resume} 
                    download
                    onClick={onDownloadResume}
                  >
                    <Download className="mr-2 w-4 h-4 group-hover:animate-bounce-soft" />
                    Download Resume
                  </a>
                </Button>
              )}
            </motion.div>

            {/* Stats or social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: 0.6 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-12 flex items-center gap-8 justify-center md:justify-start"
            >
              <div className="text-center md:text-left">
                <p className="text-2xl md:text-3xl font-display font-bold text-foreground">2+</p>
                <p className="text-xs md:text-sm text-muted-foreground font-display">Years Experience</p>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center md:text-left">
                <p className="text-2xl md:text-3xl font-display font-bold text-foreground">15+</p>
                <p className="text-xs md:text-sm text-muted-foreground font-display">Projects Done</p>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center md:text-left">
                <p className="text-2xl md:text-3xl font-display font-bold text-foreground">10+</p>
                <p className="text-xs md:text-sm text-muted-foreground font-display">Happy Clients</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 100 }}
            className="flex justify-center md:justify-end"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              {/* Floating geometric decorations */}
              <motion.div
                animate={{ y: [-8, 8, -8], rotate: [0, 180, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-6 h-6 border-2 border-foreground/40 rotate-45"
              />
              <motion.div
                animate={{ y: [8, -8, 8], rotate: [360, 180, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 w-4 h-4 border-2 border-foreground/30 rounded-full"
              />
              <motion.div
                animate={{ x: [-5, 5, -5], y: [5, -5, 5] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 -left-8 w-3 h-3 bg-foreground/20 rounded-full"
              />
              <motion.div
                animate={{ x: [5, -5, 5], y: [-5, 5, -5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 -right-6 w-2 h-2 bg-foreground/30"
              />
              
              {/* Orbiting dashed ring */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-6 rounded-full border border-dashed border-foreground/15"
              />
              
              {/* Second orbiting ring - opposite direction */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-10 rounded-full border border-dotted border-foreground/10"
              />
              
              {/* Avatar container - elevated with shadow */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[22rem] lg:h-[22rem] rounded-full flex items-center justify-center overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_60px_rgba(255,255,255,0.12),0_10px_30px_rgba(255,255,255,0.08)]">
                {/* Bitmoji-style avatar */}
                <img
                  src={headshotImage}
                  alt={`${data?.personal?.name || 'Developer'} - Portfolio`}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
