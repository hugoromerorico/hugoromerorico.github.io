'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Brain, GraduationCap, Briefcase, Rocket, Info, Sun, Moon, Linkedin, Github } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import ChatSection from './ChatSection'
import StudiesSection from './StudiesSection'
import WorkSection from './WorkSection'
import ProjectsSection from './ProjectsSection'
import AboutMeSection from './AboutSection'

type Theme = 'chat' | 'studies' | 'work' | 'projects' | 'about'

const themeData: Record<Theme, { title: string }> = {
  chat: { title: "Chat" },
  studies: { title: "Studies" },
  work: { title: "Work" },
  projects: { title: "Projects" },
  about: { title: "About Me" },
}

export default function PortfolioChat() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('chat')
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const renderContent = () => {
    switch (currentTheme) {
      case 'studies':
        return <StudiesSection />
      case 'work':
        return <WorkSection />
      case 'projects':
        return <ProjectsSection />
      case 'about':
        return <AboutMeSection />
      default:
        return <ChatSection />
    }
  }

  if (!mounted) return null

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <header className={`md:hidden flex items-center justify-between p-4 ${theme === 'dark' ? 'bg-chatgpt-sidebar text-white' : 'bg-gray-100 text-black'}`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg relative">
            <Image
              src="/images/hugo-photo.png"
              alt="Hugo Romero"
              fill
              style={{ 
                objectFit: 'cover',
                transform: 'scale(0.9)',
                transformOrigin: 'bottom left'
              }}
              sizes="40px"
              priority
            />
          </div>
          <div>
            <h2 className="text-sm font-semibold">Hugo Romero</h2>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>AI Engineer</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={`${theme === 'dark' ? 'text-white hover:bg-chatgpt-hover' : 'text-black hover:bg-gray-200'}`}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
      </header>

      <nav className={`md:hidden flex justify-around p-2 ${theme === 'dark' ? 'bg-chatgpt-sidebar' : 'bg-gray-100'}`}>
        {Object.entries(themeData).map(([key, { title }]) => (
          <Button
            key={key}
            variant={currentTheme === key ? "secondary" : "ghost"}
            size="icon"
            className={`${theme === 'dark' ? 'text-white hover:bg-chatgpt-hover' : 'text-black hover:bg-gray-200'}`}
            onClick={() => setCurrentTheme(key as Theme)}
          >
            {key === 'chat' && <Brain className="h-5 w-5" />}
            {key === 'studies' && <GraduationCap className="h-5 w-5" />}
            {key === 'work' && <Briefcase className="h-5 w-5" />}
            {key === 'projects' && <Rocket className="h-5 w-5" />}
            {key === 'about' && <Info className="h-5 w-5" />}
            <span className="sr-only">{title}</span>
          </Button>
        ))}
      </nav>

      <div className={`w-64 ${theme === 'dark' ? 'bg-chatgpt-sidebar' : 'bg-gray-100'} p-4 hidden md:block relative`}>
        <div className="mb-6 relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-lg mb-2 relative">
            <Image
              src="/images/hugo-photo.png"
              alt="Hugo Romero"
              fill
              style={{ 
                objectFit: 'cover', 
                transform: 'scale(0.9)',
                transformOrigin: 'bottom left'
              }}
              sizes="(max-width: 768px) 0px, 96px"
              className="w-full h-full"
              priority
            />
          </div>
          <h2 className="text-lg font-semibold">Hugo Romero</h2>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>AI Engineer</p>
        </div>
        <nav className="space-y-2">
          {Object.entries(themeData).map(([key, { title }]) => (
            <Button
              key={key}
              variant={currentTheme === key ? "secondary" : "ghost"}
              className={`w-full justify-start ${theme === 'dark' ? 'text-white hover:bg-chatgpt-hover' : 'text-black hover:bg-gray-200'}`}
              onClick={() => setCurrentTheme(key as Theme)}
            >
              {key === 'chat' && <Brain className="mr-2 h-4 w-4" />}
              {key === 'studies' && <GraduationCap className="mr-2 h-4 w-4" />}
              {key === 'work' && <Briefcase className="mr-2 h-4 w-4" />}
              {key === 'projects' && <Rocket className="mr-2 h-4 w-4" />}
              {key === 'about' && <Info className="mr-2 h-4 w-4" />}
              {title}
            </Button>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 flex space-x-2">
          <motion.a
            href="https://www.linkedin.com/in/hugo-romero-rico/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Linkedin className={`h-6 w-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
          </motion.a>
          <motion.a
            href="https://github.com/hugo-romero-mm"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Github className={`h-6 w-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
          </motion.a>
          <motion.a
            href="https://github.com/hromeroprog"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Github className={`h-6 w-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
          </motion.a>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-4 right-4 ${theme === 'dark' ? 'text-white hover:bg-chatgpt-hover' : 'text-black hover:bg-gray-200'}`}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
      <div className="flex-1 flex flex-col">
        <header className={`hidden md:flex items-center justify-between p-4 border-b ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
          <h1 className="text-xl font-semibold">{themeData[currentTheme].title}</h1>
          <span className="text-sm text-gray-500 italic">This portfolio is still under development :)</span>
        </header>
        <div className={`flex-1 overflow-hidden ${theme === 'dark' ? 'bg-dots-dark' : 'bg-dots-light'}`}>
          {renderContent()}
        </div>
      </div>

      <div className={`md:hidden flex justify-center space-x-4 p-4 ${theme === 'dark' ? 'bg-chatgpt-sidebar' : 'bg-gray-100'}`}>
        <motion.a
          href="https://www.linkedin.com/in/hugo-romero-rico/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Linkedin className={`h-6 w-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
        </motion.a>
        <motion.a
          href="https://github.com/hugo-romero-mm"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Github className={`h-6 w-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
        </motion.a>
        <motion.a
          href="https://github.com/hromeroprog"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Github className={`h-6 w-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
        </motion.a>
      </div>
    </div>
  )
}
