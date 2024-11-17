import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Medal, Github, Lightbulb, BookOpen } from 'lucide-react'
import Image from 'next/image'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

type AspectType = 'ai' | 'volleyball' | 'github' | 'lectures' | 'books'

interface Aspect {
  title: string
  icon: React.ReactNode
  image?: string
  imageStyle?: React.CSSProperties
  content: React.ReactNode
  bgColor?: string
}

interface GitHubStats {
  totalContributions: number;
}

interface Book {
  title: string;
  author: string;
  status: 'reading' | 'read';
  year?: number;
}

const fetchGitHubStats = async (): Promise<GitHubStats> => {
  const response = await fetch('https://github-contributions-api.jogruber.de/v4/hugo-romero-mm');
  const data = await response.json();
  return {
    totalContributions: data.total.count
  };
};

const aspects: Record<AspectType, Aspect> = {
  ai: {
    title: "AI Enthusiast & Engineer",
    icon: <Brain className="h-6 w-6" />,
    image: "/images/hugo-photo.png",
    imageStyle: {
      objectFit: 'contain',
      maxHeight: '80%',
      objectPosition: 'bottom right',
    },
    content: (
      <>
        <p className="mb-4">
          Passionate about pushing the boundaries of artificial intelligence and machine learning.
          Specializing in LLMs, MLOps, and productivizing innovative AI solutions.
        </p>
        <h4 className="text-lg font-semibold mb-2">Key Projects:</h4>
        <ul className="list-disc list-inside mb-4">
          <li>Developed an AI-powered chatbot for customer service</li>
          <li>Implemented a computer vision system for quality control in manufacturing</li>
          <li>Created a recommendation engine for a major e-commerce platform</li>
        </ul>
      </>
    ),
  },
  volleyball: {
    title: "Volleyball & Beach Volleyball Player",
    icon: <Medal className="h-6 w-6" />,
    image: "/images/hugo-volley.jpeg",
    imageStyle: {
      objectFit: 'cover',
      maxWidth: '50%',
      objectPosition: 'right',
      maskImage: 'linear-gradient(to left, black, transparent)',
    },
    content: (
      <>
        <p className="mb-4">
          High-level volleyball and beach volleyball player. Madrid University champion in both disciplines.
          Balancing the world of tech with athletic excellence.
        </p>
        <h4 className="text-lg font-semibold mb-2">Achievements:</h4>
        <ul className="list-disc list-inside mb-4">
          <li>Madrid University Volleyball Champion</li>
          <li>Madrid University Beach Volleyball Champion</li>
          <li>Represented university in national tournaments</li>
        </ul>
      </>
    ),
  },
  github: {
    title: "GitHub Contributions",
    icon: <Github className="h-6 w-6" />,
    image: "/images/code-background.jpg",
    content: ({ githubStats }: { githubStats?: GitHubStats }) => (
      <>
        <p className="mb-4">
          Active contributor to open-source projects and passionate about collaborative coding.
          {githubStats && (
            <span className="block mt-2 text-green-400">
              Total Contributions: {githubStats.totalContributions}
            </span>
          )}
        </p>
        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
          <img 
            src={`https://ghchart.rshah.org/hugo-romero-mm`} 
            alt="Hugo Romero's GitHub Contributions" 
            className="w-full"
          />
        </div>
        <p className="mt-4 text-sm text-gray-300">
          * GitHub contributions chart updates daily
        </p>
      </>
    ),
  },
  lectures: {
    title: "Lecture Recommendations",
    icon: <Lightbulb className="h-6 w-6" />,
    image: "/images/lecture-background.jpg",
    content: (
      <>
        <p className="mb-4">
          Sharing knowledge is a passion of mine. Here are some lectures I highly recommend for those interested in AI and technology.
        </p>
        <ul className="space-y-2">
          <li>
            <a href="https://www.youtube.com/watch?v=aircAruvnKk" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              But what is a neural network? | Deep learning, chapter 1
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/watch?v=IHZwWFHWa-w" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              Gradient descent, how neural networks learn | Deep learning, chapter 2
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/watch?v=Ilg3gGewQ5U" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              What is backpropagation really doing? | Deep learning, chapter 3
            </a>
          </li>
        </ul>
      </>
    ),
  },
  books: {
    title: "Book Tracker",
    icon: <BookOpen className="h-6 w-6" />,
    bgColor: "bg-gradient-to-br from-purple-600 to-blue-600",
    content: ({ books }: { books: Book[] }) => (
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold mb-2">Currently Reading</h4>
          <ul className="space-y-2">
            {books.filter(book => book.status === 'reading').map((book, index) => (
              <li key={index} className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                <h5 className="font-medium">{book.title}</h5>
                <p className="text-sm text-gray-300">{book.author}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">Read Books</h4>
          {[...new Set(books.filter(book => book.status === 'read').map(book => book.year))].sort((a, b) => b! - a!).map(year => (
            <div key={year} className="mb-4">
              <h5 className="text-md font-medium mb-2">{year}</h5>
              <ul className="space-y-2">
                {books.filter(book => book.status === 'read' && book.year === year).map((book, index) => (
                  <li key={index} className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                    <h6 className="font-medium">{book.title}</h6>
                    <p className="text-sm text-gray-300">{book.author}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    ),
  },
}

const AboutSection = () => {
  const [activeAspect, setActiveAspect] = useState<AspectType>('ai')
  const [githubStats, setGithubStats] = useState<GitHubStats>()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchGitHubStats().then(setGithubStats);
  }, []);

  const books: Book[] = [
    { title: "Deep Learning", author: "Ian Goodfellow", status: "reading" },
    { title: "The Master Algorithm", author: "Pedro Domingos", status: "read", year: 2023 },
    { title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell", status: "read", year: 2023 },
    { title: "Machine Learning: A Probabilistic Perspective", author: "Kevin Murphy", status: "read", year: 2022 },
  ]

  const handleWheel = (e: React.WheelEvent) => {
    const aspectKeys = Object.keys(aspects) as AspectType[];
    const currentIndex = aspectKeys.indexOf(activeAspect);
    const newIndex = e.deltaY > 0 
      ? (currentIndex + 1) % aspectKeys.length
      : (currentIndex - 1 + aspectKeys.length) % aspectKeys.length;
    setActiveAspect(aspectKeys[newIndex]);
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex items-center justify-center p-4" ref={containerRef} onWheel={handleWheel}>
      <div className="w-full max-w-6xl h-[600px] flex flex-col md:flex-row rounded-xl overflow-hidden shadow-2xl bg-gray-900">
        <div className="w-full md:w-1/4 bg-gray-800 p-4">
          <h2 className="text-2xl font-bold text-white mb-4">Explore My World</h2>
          <div className="space-y-2">
            {(Object.keys(aspects) as AspectType[]).map((aspect) => (
              <Button
                key={aspect}
                variant={activeAspect === aspect ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setActiveAspect(aspect)}
              >
                {aspects[aspect].icon}
                <span className="ml-2">{aspects[aspect].title}</span>
              </Button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeAspect}
            className="flex-grow relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={`w-full h-full overflow-hidden ${aspects[activeAspect].bgColor || ''}`}>
              <CardContent className="relative h-full p-0 flex items-end justify-end">
                {aspects[activeAspect].image && (
                  <div className="absolute inset-0 flex items-end justify-end">
                    <Image
                      src={aspects[activeAspect].image}
                      alt={aspects[activeAspect].title}
                      fill
                      style={aspects[activeAspect].imageStyle || { objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 75vw"
                      priority
                    />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                <div className="absolute inset-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    {aspects[activeAspect].icon}
                    <span className="ml-2">{aspects[activeAspect].title}</span>
                  </h3>
                  <ScrollArea className="h-[calc(100%-4rem)]">
                    {typeof aspects[activeAspect].content === 'function'
                      ? aspects[activeAspect].content({ githubStats, books })
                      : aspects[activeAspect].content}
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AboutSection