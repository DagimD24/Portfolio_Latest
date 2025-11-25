import type React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Send, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { usePortfolioData, type PortfolioData } from '@/hooks/usePortfolioData';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  testId: string;
}

const getSocialLinks = (personal: PortfolioData['personal'] | null | undefined): SocialLink[] => {
  if (!personal?.social) return [];
  
  const socials: {[key: string]: { icon: React.ComponentType<{ className?: string }>, testId: string }} = {
    github: { icon: Github, testId: 'link-github' },
    linkedin: { icon: Linkedin, testId: 'link-linkedin' },
    telegram: { icon: Send, testId: 'link-telegram' },
    email: { icon: Mail, testId: 'link-email' },
  };

  return Object.entries(personal.social)
    .filter(([key]) => key in socials)
    .map(([key, url]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      url: url as string,
      ...socials[key]
    }));
};

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const { data, loading, error } = usePortfolioData();
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
    toast({
      title: 'Message sent!',
      description: 'Thank you for reaching out. I\'ll get back to you soon.',
    });
    form.reset();
  };

  if (loading) {
    return (
      <section id="contact" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading contact information...</p>
        </div>
      </section>
    );
  }

  if (!data) {
    return null;
  }

  const personal = data.personal;
  const socialLinks = getSocialLinks(personal);

  if (error) {
    return (
      <section id="contact" className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          Error loading contact information: {error}
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-muted-foreground font-display text-sm md:text-base uppercase tracking-widest mb-4 block">
              Let's Connect
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              <span className="font-display text-foreground">
                Get in
              </span>
              <span className="font-display ml-3">Touch</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 font-sans">
              {data.contact.description || 'Have a question or want to work together? Feel free to reach out!'}
            </p>
            
            {/* Contact Details */}
            <div className="space-y-4">
              {personal.email && (
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-foreground mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground/80">Email</p>
                    <a 
                      href={`mailto:${personal.email}`}
                      className="text-foreground hover:underline"
                    >
                      {personal.email}
                    </a>
                  </div>
                </div>
              )}
              
              {personal.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-foreground mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground/80">Phone</p>
                    <a 
                      href={`tel:${personal.phone.replace(/\D/g, '')}`}
                      className="text-foreground hover:underline"
                    >
                      {personal.phone}
                    </a>
                  </div>
                </div>
              )}
              
              {personal.location && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-foreground mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground/80">Location</p>
                    <p className="text-foreground">{personal.location}</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="mt-8">
                <h3 className="text-foreground/80 mb-4">Connect with me</h3>
                <div className="flex gap-4">
                  {socialLinks.map(({ name, url, icon: Icon, testId }) => (
                    <motion.a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground transition-colors"
                      whileHover={{ y: -2 }}
                      data-testid={testId}
                      aria-label={name}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card p-8 rounded-lg shadow-lg"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          {...field}
                          data-testid="input-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          {...field}
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your message..."
                          className="resize-none h-32"
                          {...field}
                          data-testid="input-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  data-testid="button-submit"
                >
                  Send Message
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
