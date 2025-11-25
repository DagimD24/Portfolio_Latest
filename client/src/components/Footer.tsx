import { usePortfolioData } from '@/hooks/usePortfolioData';
import { Github, Linkedin, Twitter, Mail, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const { data, loading, error } = usePortfolioData();
  
  if (loading) {
    return (
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary mx-auto"></div>
        </div>
      </footer>
    );
  }

  const socialIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    email: Mail,
    instagram: Instagram
  };

  const socialLinks = data?.personal?.social ? Object.entries(data.personal.social).map(([key, url]) => ({
    name: key,
    url: url as string,
    icon: socialIcons[key] || null
  })).filter(link => link.icon) : [];

  const currentYear = new Date().getFullYear();
  const copyrightText = data?.footer?.copyright || `© ${currentYear} ${data?.personal?.name || 'Portfolio'}. All rights reserved.`;

  return (
    <footer className="border-t border-border py-12 px-6 bg-background/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Social Links */}
          {socialLinks.length > 0 && (
            <motion.div 
              className="flex gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {socialLinks.map(({ name, url, icon: Icon }) => (
                <motion.a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ y: -2 }}
                  aria-label={name}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>
          )}

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-sm text-muted-foreground text-center" data-testid="text-copyright">
              {copyrightText}
            </p>
          </motion.div>

          {/* Optional Footer Navigation */}
          {data?.footer?.links && data.footer.links.length > 0 && (
            <motion.nav
              className="flex flex-wrap justify-center gap-4 mt-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {data.footer.links.map((link: { name: string; url: string }) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </motion.nav>
          )}
        </div>
      </div>
    </footer>
  );
}
