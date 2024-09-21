import React, { useState } from 'react'
import { useTheme } from 'next-themes'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, GraduationCap, Award, FileBadge } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const educationData = [
  {
    degree: "Online Master's in Artificial Intelligence and Innovation",
    institution: "Founderz & Microsoft",
    duration: "July 2023 – Present",
    skills: ["Artificial Intelligence", "Machine Learning", "Python Programming", "Innovation Development"],
  },
  {
    degree: "Dual Bachelor's in Computer Science & Engineering and Business Administration & Management",
    institution: "Universidad Carlos III de Madrid",
    duration: "September 2017 – February 2023",
    gpa: "8.33/10",
    honors: [
      "Programming", "Data Structures and Algorithms", "Statistics II", "Game Theory",
      "Computer Networks", "Advanced Computational Theory", "Operating Systems Design", "Machine Learning"
    ],
    scholarships: [
      "Excellence Scholarship from Comunidad de Madrid (2019–2020)",
      "Excellence Scholarship from Comunidad de Madrid (2020–2021)",
      "Excellence Scholarship from Comunidad de Madrid (2021–2022)",
    ],
    activities: ["Class Representative (2019/2020)"],
    achievements: [
      "Madrid University Beach Volleyball Champion (2021/2022)",
      "Madrid University Volleyball Champion (2022/2023)"
    ],
  },
  {
    degree: "First Year in Mathematical Engineering",
    institution: "Universidad Complutense de Madrid",
    duration: "September 2015 – June 2016",
    activities: ["Mentor for new students", "Volleyball Team Player and Coach"],
  },
]

const certifications = [
  { name: "Prompt Engineering & LangChain for Developers", institution: "The Valley", date: "November 2023", category: "AI" },
  { name: "Automated Testing for LLMOps", institution: "DeepLearning.AI", date: "September 2024", category: "AI" },
  { name: "Networking in Google Cloud: Fundamentals", institution: "Google Cloud Skills Boost", date: "September 2024", category: "Cloud" },
  { name: "Introduction to AI and Machine Learning on Google Cloud", institution: "Google Cloud Skills Boost", date: "February 2024", category: "AI" },
  { name: "TensorFlow on Google Cloud", institution: "Google Cloud Skills Boost", date: "February 2024", category: "AI" },
  { name: "Automating Infrastructure on Google Cloud with Terraform", institution: "Google Cloud Skills Boost", date: "January 2024", category: "Cloud" },
  { name: "Technical Writing One", institution: "Google Developers", date: "October 2023", category: "Soft Skills" },
  { name: "ChatGPT Prompt Engineering for Developers", institution: "DeepLearning.AI", date: "May 2023", category: "AI" },
  { name: "GANs Specialization", institution: "DeepLearning.AI", date: "January 2022", category: "AI" },
  { name: "Principles of Machine Learning: Python Edition", institution: "Microsoft (via edX)", date: "June 2020", category: "AI" },
]

interface Education {
  degree: string;
  institution: string;
  duration: string;
  gpa?: string;
  skills?: string[];
  honors?: string[];
  scholarships?: string[];
  activities?: string[];
  achievements?: string[];
}

const EducationCard = ({ education }: { education: Education }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { theme } = useTheme()

  return (
    <Card className={`mb-4 overflow-hidden border-l-4 ${theme === 'dark' ? 'border-primary bg-gray-800' : 'border-primary bg-white'}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>{education.degree}</CardTitle>
          <CardDescription>{education.institution} | {education.duration}</CardDescription>
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
              {education.gpa && <p className="mb-2">GPA: {education.gpa}</p>}
              {education.skills && (
                <div className="mb-2">
                  <strong>Key Skills:</strong>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {education.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {education.honors && (
                <div className="mb-2">
                  <strong>Honors:</strong>
                  <ul className="list-disc list-inside mt-1">
                    {education.honors.map((honor, index) => (
                      <li key={index}>{honor}</li>
                    ))}
                  </ul>
                </div>
              )}
              {education.scholarships && (
                <div className="mb-2">
                  <strong>Scholarships:</strong>
                  <ul className="list-disc list-inside mt-1">
                    {education.scholarships.map((scholarship, index) => (
                      <li key={index}>{scholarship}</li>
                    ))}
                  </ul>
                </div>
              )}
              {education.activities && (
                <div className="mb-2">
                  <strong>Activities:</strong>
                  <ul className="list-disc list-inside mt-1">
                    {education.activities.map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))}
                  </ul>
                </div>
              )}
              {education.achievements && (
                <div className="mb-2">
                  <strong>Achievements:</strong>
                  <ul className="list-disc list-inside mt-1">
                    {education.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

const CertificationCard = ({ certification }: { certification: { name: string; institution: string; date: string; category: string } }) => {
  const { theme } = useTheme()
  const categoryColors = {
    AI: 'bg-blue-500',
    Cloud: 'bg-green-500',
    'Soft Skills': 'bg-yellow-500'
  }

  return (
    <Card className={`mb-2 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{certification.name}</h3>
          <p className="text-sm text-muted-foreground">{certification.institution} | {certification.date}</p>
        </div>
        <Badge className={`${categoryColors[certification.category as keyof typeof categoryColors]} text-white`}>
          {certification.category}
        </Badge>
      </CardContent>
    </Card>
  )
}

export default function StudiesSection() {
  const { theme } = useTheme()

  return (
    <ScrollArea className="h-[calc(100vh-4rem)] px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className={`text-3xl font-bold mb-6 flex items-center ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GraduationCap className="mr-2" />
          Educational Background
        </motion.h2>
        
        {educationData.map((edu, index) => (
          <EducationCard key={index} education={edu} />
        ))}

        <Card className={`mb-4 overflow-hidden border-l-4 ${theme === 'dark' ? 'border-primary bg-gray-800' : 'border-primary bg-white'}`}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileBadge className="mr-2" />
              Certifications & Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {certifications.map((cert, index) => (
                <CertificationCard key={index} certification={cert} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  )
}
