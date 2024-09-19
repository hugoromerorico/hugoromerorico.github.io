import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Medal } from 'lucide-react'

const AboutSection = () => {
  const [activeSection, setActiveSection] = useState<'ai' | 'volleyball'>('ai')

  const toggleSection = (section: 'ai' | 'volleyball') => {
    setActiveSection(section)
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl h-[600px] flex rounded-xl overflow-hidden shadow-2xl">
        <motion.div
          className="flex-grow"
          animate={{ flex: activeSection === 'ai' ? 3 : 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <Card 
            className="w-full h-full overflow-hidden cursor-pointer"
            onClick={() => toggleSection('ai')}
          >
            <CardContent className="relative h-full p-0">
              <img
                src="/images/hugo-photo.png"
                alt="Hugo Romero - AI Engineer"
                className="h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2 flex items-center">
                  <Brain className="mr-2 h-6 w-6" />
                  AI Enthusiast & Engineer
                </h3>
                <motion.p 
                  className="mb-4"
                  animate={{ opacity: activeSection === 'ai' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Passionate about pushing the boundaries of artificial intelligence and machine learning.
                  Specializing in LLMs, MLOps, and innovative AI solutions.
                </motion.p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="flex-grow"
          animate={{ flex: activeSection === 'volleyball' ? 3 : 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <Card 
            className="w-full h-full overflow-hidden cursor-pointer"
            onClick={() => toggleSection('volleyball')}
          >
            <CardContent className="relative h-full p-0">
              <img
                src="/images/hugo-volley.jpeg"
                alt="Hugo Romero - Volleyball Player"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2 flex items-center">
                  <Medal className="mr-2 h-6 w-6" />
                  Volleyball & Beach volleyball player
                </h3>
                <motion.p 
                  className="mb-4"
                  animate={{ opacity: activeSection === 'volleyball' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  High-level volleyball and beach volleyball player. Madrid University champion in both disciplines.
                  Balancing the world of tech with athletic excellence.
                </motion.p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutSection
