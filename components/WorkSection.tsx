import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Briefcase, ArrowRight } from 'lucide-react'

const workExperience = [
  {
    title: "AI Engineer",
    company: "+Orange (formerly Grupo MásMóvil)",
    duration: "Sep 2023 - Present",
    logo: "/images/mas-orange.png?height=50&width=50",
    transitionInfo: {
      from: {
        name: "Grupo MásMóvil",
        logo: "/images/mas-movil.png?height=30&width=30"
      },
      to: {
        name: "+Orange",
        logo: "/images/mas-orange.png?height=30&width=30"
      },
      date: "May 2024"
    },
    responsibilities: [
      "Architecting ML model solutions, including LLM-based models",
      "Developing MLOps pipelines for production ML deployment",
      "Leading partnerships with major cloud providers (VertexAI, Langchain)",
      "Adapting AI strategies to align with the newly formed +Orange's vision"
    ],
    skills: ["Machine Learning", "LLMs", "MLOps", "VertexAI", "Langchain", "Adaptive AI Strategy"]
  },
  {
    title: "Backend Developer",
    company: "Grupo MásMóvil",
    duration: "Apr 2023 - Sep 2023",
    logo: "/images/mas-movil.png?height=50&width=50",
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
    logo: "/images/mas-movil.png?height=50&width=50",
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
    logo: "/images/uc3m.png?height=50&width=50",
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
    logo: "/images/grupo-sm.png?height=50&width=50",
    responsibilities: [
      "Co-created innovative digital products",
      "Developed mobile apps with a multidisciplinary team"
    ],
    skills: ["Digital Product Development", "Mobile App Development", "Team Collaboration"]
  }
]

const CompanyTransition = ({ transitionInfo }) => (
  <motion.div 
    className="flex items-center justify-center my-4 p-4 bg-gradient-to-r from-blue-100 to-orange-100 rounded-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center">
      <img src={transitionInfo.from.logo} alt={transitionInfo.from.name} className="w-8 h-8 mr-2" />
      <span className="font-semibold">{transitionInfo.from.name}</span>
    </div>
    <ArrowRight className="mx-4 text-orange-500" />
    <div className="flex items-center">
      <img src={transitionInfo.to.logo} alt={transitionInfo.to.name} className="w-8 h-8 mr-2" />
      <span className="font-semibold">{transitionInfo.to.name}</span>
    </div>
    <span className="ml-4 text-sm text-gray-600">({transitionInfo.date})</span>
  </motion.div>
)

const WorkExperienceCard = ({ experience, index }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="mb-4 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center">
            <img src={experience.logo} alt={experience.company} className="w-12 h-12 mr-4 rounded-full" />
            <div>
              <CardTitle>{experience.title}</CardTitle>
              <CardDescription>{experience.company} | {experience.duration}</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronUp /> : <ChevronDown />}
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
              <CardContent>
                {experience.transitionInfo && (
                  <CompanyTransition transitionInfo={experience.transitionInfo} />
                )}
                <div className="mb-4">
                  <strong>Responsibilities:</strong>
                  <ul className="list-disc list-inside mt-2">
                    {experience.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong>Skills:</strong>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {experience.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}

export default function WorkSection() {
  return (
    <ScrollArea className="h-[calc(100vh-4rem)] px-4 py-6">
      <div className="max-w-3xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold mb-6 flex items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Briefcase className="mr-2" />
          Professional Experience
        </motion.h2>
        
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-orange-500" />
          {workExperience.map((experience, index) => (
            <div key={index} className="relative pl-8">
              <div className="absolute left-0 top-6 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-orange-500" />
              <div className="absolute left-0 top-4 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-orange-500" />
              <WorkExperienceCard experience={experience} index={index} />
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}
