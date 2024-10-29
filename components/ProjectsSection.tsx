import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, ArrowLeft, Info } from 'lucide-react'
import DoublePendulumSimulation from './DoublePendulumSimulation'

interface Project {
  title: string;
  description: string;
  image: string;
  embedSrc?: string;
  info?: React.ReactNode;
}

const projectsData: Project[] = [
  {
    title: "Double Pendulum Simulation",
    description: "An interactive simulation of a double pendulum system, demonstrating chaos theory and complex motion.",
    image: "/images/double-pendulum.png",
    embedSrc: undefined,
    info: (
      <>
        <p>
          A double pendulum is a pendulum with another pendulum attached to its end. It&apos;s a simple physical system that exhibits rich dynamic behavior with a strong sensitivity to initial conditions.
        </p>
        <p className="mt-4">
          The motion of a double pendulum is governed by a set of coupled ordinary differential equations and is chaotic.
        </p>
        <p className="mt-4">
          This simulation uses the following parameters:
          <ul className="list-disc list-inside mt-2">
            <li>Length of each pendulum: 1 unit</li>
            <li>Mass of each pendulum: 1 unit</li>
            <li>Gravity: 9.81 m/s²</li>
          </ul>
        </p>
        <p className="mt-4">
          You can interact with the simulation by clicking on the pendulum masses and dragging to apply force. The pendulum will react to your input, demonstrating the chaotic nature of the system.
        </p>
      </>
    )
  },
  {
    title: "Mandelbrot Set Visualizer",
    description: "An interactive tool for exploring the Mandelbrot set, demonstrating complex mathematical concepts through visualization.",
    image: "/images/mandelbrot.png",
    embedSrc: "/projects/mandelbrot/mandelbrot.html",
    info: (
      <>
        <p>
          The Mandelbrot set is the most studied fractal set. It is defined in the complex plane by fixing any complex number c. From c, a sequence is constructed by recursion:
        </p>
        <p className="my-4">
          Z<sub>0</sub> = 0 ∈ ℂ <br />
          Z<sub>n+1</sub> = Z<sub>n</sub><sup>2</sup> + c
        </p>
        <p>
          The Mandelbrot set comprises those complex numbers c for which the sequence does not diverge.
        </p>
        <p className="mt-4">
          In this project, an interactive representation of the Mandelbrot set is displayed. To explore the set, simply click, and the marked area will be magnified.
        </p>
        <p className="mt-4">
          Tip: Explore the edges to uncover intricate patterns!
        </p>
        <p className="mt-4">
          This is an old project I coded during my studies using vanilla JavaScript. I created it because I love the magic behind fractals and wanted to explore their mathematical beauty through programming.
        </p>
      </>
    )
  },
  {
    title: "Game of Life",
    description: "A simulation of Conway's Game of Life, showcasing cellular automata and emergent behavior in a grid-based environment.",
    image: "/images/game-of-life.png",
    embedSrc: "/projects/game-of-life/index.html"
  },
  {
    title: "User Interfaces",
    description: "A collection of user interface designs and implementations, highlighting skills in frontend development and UX/UI design.",
    image: "/images/user-interfaces.png",
    embedSrc: "/projects/ui-showcase/index.html"
  }
]

export default function ProjectsSection() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [showProject, setShowProject] = useState(false)
  const { theme } = useTheme()

  const currentProject = projectsData[currentProjectIndex]

  const handleNextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projectsData.length)
  }

  const handlePreviousProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length)
  }

  const handleShowProject = () => {
    setShowProject(true)
  }

  const handleBackToCarousel = () => {
    setShowProject(false)
  }

  const InfoButton = ({ className = "" }) => (
    currentProject.info && (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className={className}>
            <Info className="h-4 w-4" />
            <span className="sr-only">Project Info</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentProject.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">{currentProject.info}</div>
        </DialogContent>
      </Dialog>
    )
  )

  return (
    <ScrollArea className="h-[calc(100vh-4rem)] px-4 py-6">
      <div className="max-w-4xl mx-auto">
        {!showProject ? (
          <Card className={`overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <CardContent className="p-6">
              <img
                src={currentProject.image}
                alt={currentProject.title}
                className="w-full h-64 object-cover mb-4 rounded-md"
              />
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold">{currentProject.title}</h3>
                <InfoButton />
              </div>
              <p className="mb-4">{currentProject.description}</p>
              <Button onClick={handleShowProject}>View Project</Button>
            </CardContent>
          </Card>
        ) : (
          <Card className={`overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <CardContent className="p-6 relative">
              <div className="flex justify-between items-center mb-4">
                <Button onClick={handleBackToCarousel}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
                </Button>
                <InfoButton className="absolute top-4 right-4" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{currentProject.title}</h3>
              <div className="w-full h-[calc(100vh-16rem)] overflow-hidden">
                {currentProject.title === "Double Pendulum Simulation" ? (
                  <DoublePendulumSimulation />
                ) : (
                  <iframe
                    src={currentProject.embedSrc}
                    title={currentProject.title}
                    className="w-full h-full border-0"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        )}
        {!showProject && (
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={handlePreviousProject}>
              <ChevronLeft className="h-4 w-4 mr-2" /> Previous
            </Button>
            <Button variant="outline" onClick={handleNextProject}>
              Next <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
