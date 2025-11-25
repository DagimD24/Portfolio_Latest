import { useState, useEffect } from 'react';

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    bio: string;
    image: string;
    resume: string;
    social: {
      github: string;
      linkedin: string;
      telegram: string;
      portfolio: string;
    };
  };
  about: {
    description: string;
    highlights: string[];
  };
  skills: {
    frontend: Array<{ name: string; level: number }>;
    backend: Array<{ name: string; level: number }>;
    tools: Array<{ name: string; level: number }>;
    languages?: Array<{ name: string; level: number }>;
  };
  projects: Array<{
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    github: string;
    demo: string;
    featured: boolean;
  }>;
  experience: Array<{
    id: number;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    achievements: string[];
  }>;
  education: Array<{
    id: number;
    institution: string;
    degree: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa: string;
    achievements: string[];
  }>;
  contact: {
    title: string;
    description: string;
    availability: string;
  };
}

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/portfolio-data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load portfolio data');
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
