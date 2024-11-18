import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Briefcase, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface TransitionInfo {
  from: { name: string; logo: string };
  to: { name: string; logo: string };
  date: string;
}

interface Experience {
  title: string;
  company: string;
  duration: string;
  logo: string;
  transitionInfo?: TransitionInfo;
  responsibilities: string[];
  skills: string[];
}

const workExperience: Experience[] = [
  {
    title: "AI Engineer",
    company: "+Orange (formerly Grupo MásMóvil)",
    duration: "Sep 2023 - Present",
    logo: "/images/mas-orange.png",
    transitionInfo: {
      from: {
        name: "Grupo MásMóvil",
        logo: "/images/mas-movil.png"
      },
      to: {
        name: "+Orange",
        logo: "/images/mas-orange.png"
      },
      date: "May 2024"
    },
    responsibilities: [
      "Architecting ML model solutions, including LLM-based models",
      "Developing MLOps pipelines for production ML deployment",
      "Leading partnerships with major cloud providers (VertexAI, Langchain)",
      "Adapting AI strategies to align with the newly formed +Orange's vision"
    ],
    skills: ["Machine Learning", "LLMs", "MLOps", "VertexAI", "Langchain", "Adaptive AI Strategy", "Google Cloud Platform", "CI/CD"]
  },
  {
    title: "Backend Developer",
    company: "Grupo MásMóvil",
    duration: "Apr 2023 - Sep 2023",
    logo: "/images/mas-movil.png",
    responsibilities: [
      "Developed vital processes critical to company operations",
      "Worked in dynamic cloud-native project environments"
    ],
    skills: ["Backend Development", "Cloud-native", "Microservices"]
  },
  {
    title: "DevOps - Data Engineer Trainee",
    company: "Grupo MásMóvil",
    duration: "Oct 2022 - Apr 2023",
    logo: "/images/mas-movil.png",
    responsibilities: [
      "Automated ETL pipelines and deployed BigQuery solutions",
      "Developed DataStudio dashboards to analyze cloud costs"
    ],
    skills: ["DevOps", "ETL", "BigQuery", "DataStudio", "Cloud Cost Analysis"]
  },
  {
    title: "Machine Learning Researcher",
    company: "Universidad Carlos III de Madrid",
    duration: "Sep 2022 - Jun 2023",
    logo: "/images/uc3m.png",
    responsibilities: [
      "Researched game theory and data management",
      "Coordinated international project collaborations"
    ],
    skills: ["Machine Learning", "Game Theory", "Data Management", "Research"]
  },
  {
    title: "Digital Business Developer",
    company: "Grupo Santa María",
    duration: "Jun 2019 - Aug 2019",
    logo: "/images/grupo-sm.png",
    responsibilities: [
      "Co-created innovative digital products",
      "Developed mobile apps with a multidisciplinary team"
    ],
    skills: ["Digital Product Development", "Mobile App Development", "Team Collaboration"]
  }
];

const CompanyTransition: React.FC<{ transitionInfo: TransitionInfo }> = ({ transitionInfo }) => {
  const { theme } = useTheme();

  return (
    <motion.div
      className={`flex flex-col md:flex-row items-center justify-center my-4 p-3 md:p-4 rounded-lg ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
      } mobile-transition-container`}
    >
      <div className="flex items-center mb-2 md:mb-0">
        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden relative mr-2">
          <Image
            src={transitionInfo.from.logo}
            alt={transitionInfo.from.name}
            fill
            className="object-cover"
            sizes="32px"
          />
        </div>
        <span className="mobile-company-name">{transitionInfo.from.name}</span>
      </div>
      <ArrowRight className="hidden md:block mx-4 text-primary" />
      <ArrowRight className="block md:hidden rotate-90 my-2 text-primary" />
      <div className="flex items-center">
        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden relative mr-2">
          <Image
            src={transitionInfo.to.logo}
            alt={transitionInfo.to.name}
            fill
            className="object-cover"
            sizes="32px"
          />
        </div>
        <span className="mobile-company-name">{transitionInfo.to.name}</span>
      </div>
      <span className="mt-2 md:ml-4 text-xs md:text-sm text-muted-foreground">({transitionInfo.date})</span>
    </motion.div>
  );
};

const WorkExperienceCard: React.FC<{ experience: Experience; index: number; defaultExpanded: boolean }> = ({ experience, index, defaultExpanded }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className={`mb-4 overflow-hidden border-l-4 ${theme === 'dark' ? 'border-primary bg-gray-800' : 'border-primary bg-white'}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 mobile-work-header">
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden relative shrink-0">
              <Image
                src={experience.logo}
                alt={experience.company}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 32px, 48px"
              />
            </div>
            <div className="min-w-0">
              <CardTitle className="mobile-work-title">{experience.title}</CardTitle>
              <CardDescription className="mobile-work-company">
                <span className="block truncate">{experience.company}</span>
                <span className="text-xs md:text-sm text-muted-foreground">{experience.duration}</span>
              </CardDescription>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="mobile-expand-button shrink-0"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CardHeader>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="mobile-work-content">
                {experience.transitionInfo && (
                  <CompanyTransition transitionInfo={experience.transitionInfo} />
                )}
                <div className="space-y-4">
                  <div>
                    <strong className="mobile-section-title">Responsibilities:</strong>
                    <ul className="mobile-list mt-1">
                      {experience.responsibilities.map((resp, idx) => (
                        <li key={idx} className="mobile-list-item">{resp}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong className="mobile-section-title">Skills:</strong>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {experience.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="mobile-work-badge">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default function WorkSection() {
  const { theme } = useTheme();

  return (
    <ScrollArea className="h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)] mobile-section-padding">
      <div className="max-w-4xl mx-auto mobile-card-spacing">
        <motion.h2 
          className={`mobile-heading flex items-center ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Briefcase className="mr-2" />
          Professional Experience
        </motion.h2>
        
        <div className="space-y-4">
          {workExperience.map((experience, index) => (
            <WorkExperienceCard 
              key={index} 
              experience={experience} 
              index={index} 
              defaultExpanded={index === 0}
            />
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
