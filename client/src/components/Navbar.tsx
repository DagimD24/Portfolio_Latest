import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import { Menu, X } from 'lucide-react';
import { usePortfolioData } from '@/hooks/usePortfolioData';

interface NavItem {
  id: string;
  label: string;
}

const defaultNavItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px', // Trigger when section is near top of viewport
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const { data } = usePortfolioData();
  const navItems = data?.navigation?.items || defaultNavItems;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('home')}
              className="text-2xl md:text-3xl hover:opacity-80 transition-all duration-200 px-2 py-1 group"
              data-testid="link-home"
            >
              <span className="font-accent text-foreground">
                {data?.personal?.name ? `${data.personal.name.split(' ')[0]}.dev` : 'Portfolio'}
              </span>
            </button>

            <div className="flex items-center gap-1">
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center gap-1">
                  {navItems.map((item) => (
                    <Button
                      key={item.id}
                      variant="ghost"
                      onClick={() => {
                        onNavigate(item.id);
                        setActiveSection(item.id);
                      }}
                      className={`rounded-full transition-all duration-300 ${
                        activeSection === item.id 
                          ? 'text-foreground bg-gradient-to-r from-foreground/10 via-foreground/5 to-transparent' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                      }`}
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
                
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <div className="md:hidden">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      className="text-foreground hover:bg-background/10"
                      aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                    >
                      {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Separate from navbar to avoid scroll glitches */}
      {isMobileMenuOpen && (
        <>
          <div className="md:hidden fixed top-0 right-0 h-full w-1/2 bg-background/30 backdrop-blur-sm border-l border-border/50 shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col items-center justify-center h-full py-8">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="lg"
                  onClick={() => {
                    setActiveSection(item.id);
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-lg font-medium transition-all duration-200 hover:scale-105 ${
                    activeSection === item.id 
                      ? 'text-foreground bg-primary/20 scale-105' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  data-testid={`mobile-link-${item.id}`}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Overlay backdrop */}
          <div 
            className="md:hidden fixed inset-0 bg-black/10 backdrop-blur-sm z-[55]"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </>
      )}
    </>
  );
}
