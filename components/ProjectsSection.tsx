import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const projectsData = [
  {
    title: "Mandelbrot Set Visualizer",
    description: "An interactive tool for exploring the Mandelbrot set, demonstrating complex mathematical concepts through visualization.",
    image: "/images/mandelbrot.png"
  },
  {
    title: "Game of Life",
    description: "A simulation of Conway's Game of Life, showcasing cellular automata and emergent behavior in a grid-based environment.",
    image: "/images/game-of-life.png"
  },
  {
    title: "User Interfaces",
    description: "A collection of user interface designs and implementations, highlighting skills in frontend development and UX/UI design.",
    image: "/images/user-interfaces.png"
  }
]

export default function ProjectsSection() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)

  return (
    <div className="flex-1 p-4">
      <Card>
        <CardContent className="p-6">
          <img
            src={projectsData[currentProjectIndex].image}
            alt={projectsData[currentProjectIndex].title}
            className="w-full h-48 object-cover mb-4 rounded-md shadow-lg"
            loading="lazy" // Optional: Lazy load images for performance
          />
          <h3 className="text-xl font-bold mb-2">{projectsData[currentProjectIndex].title}</h3>
          <p>{projectsData[currentProjectIndex].description}</p>
        </CardContent>
      </Card>
      <div className="flex justify-between mt-4">
        <Button
          variant="outline"
          onClick={() => setCurrentProjectIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length)}
        >
          <ChevronLeft className="h-4 w-4 mr-2" /> Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => setCurrentProjectIndex((prev) => (prev + 1) % projectsData.length)}
        >
          Next <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
