'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Brain, GraduationCap, Briefcase, Rocket, Info, Sun, Moon } from 'lucide-react'
import ChatSection from './ChatSection'
import StudiesSection from './StudiesSection'
import WorkSection from './WorkSection'
import ProjectsSection from './ProjectsSection'
import AboutMeSection from './AboutSection'

type Theme = 'chat' | 'studies' | 'work' | 'projects' | 'about'

const themeData: Record<Theme, { title: string }> = {
  chat: { title: "Chat with Hugo's AI Assistant" },
  studies: { title: "Educational Background" },
  work: { title: "Professional Experience" },
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
    <div className="flex h-screen bg-background text-foreground">
      <div className="w-64 bg-muted p-4 hidden md:block relative">
        <div className="mb-4">
          <Avatar className="w-14 h-16 mb-2">
            <AvatarImage src="/images/hugo-photo.png" alt="Hugo Romero" />
            <AvatarFallback>HR</AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-semibold">Hugo Romero</h2>
          <p className="text-sm text-muted-foreground">AI Engineer</p>
        </div>
        <nav className="space-y-2">
          <Button variant={currentTheme === 'chat' ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setCurrentTheme('chat')}>
            <Brain className="mr-2 h-4 w-4" />
            Chat
          </Button>
          <Button variant={currentTheme === 'studies' ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setCurrentTheme('studies')}>
            <GraduationCap className="mr-2 h-4 w-4" />
            Studies
          </Button>
          <Button variant={currentTheme === 'work' ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setCurrentTheme('work')}>
            <Briefcase className="mr-2 h-4 w-4" />
            Work
          </Button>
          <Button variant={currentTheme === 'projects' ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setCurrentTheme('projects')}>
            <Rocket className="mr-2 h-4 w-4" />
            Projects
          </Button>
          <Button variant={currentTheme === 'about' ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setCurrentTheme('about')}>
            <Info className="mr-2 h-4 w-4" />
            About Me
          </Button>
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-4 left-4"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-semibold">{themeData[currentTheme].title}</h1>
        </header>
        {renderContent()}
      </div>
    </div>
  )
}
