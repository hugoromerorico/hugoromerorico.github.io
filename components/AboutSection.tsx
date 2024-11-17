import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Medal, Book, Github, Lightbulb, BookOpen } from 'lucide-react'
import Image from 'next/image'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

type AspectType = 'ai' | 'volleyball' | 'github' | 'lectures' | 'books'

interface Aspect {
  title: string
  icon: React.ReactNode
  image: string
  content: React.ReactNode
}

interface GitHubStats {
  totalContributions: number;
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
    image: "/images/books-background.jpg",
    content: (
      <>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Currently Reading</h4>
            <a 
              href="https://www.goodreads.com/user/show/your-profile" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-400 hover:underline"
            >
              View on Goodreads
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <div className="aspect-[2/3] relative mb-2">
                <Image
                  src="/placeholder.svg"
                  alt="Book cover"
                  fill
                  className="rounded-md object-cover"
                />
              </div>
              <h5 className="font-medium">Deep Learning</h5>
              <p className="text-sm text-gray-300">by Ian Goodfellow</p>
              <div className="mt-2 h-1 bg-green-500 rounded" style={{ width: '75%' }}></div>
              <p className="text-xs mt-1 text-gray-400">75% complete</p>
            </div>
          </div>
        </div>
      </>
    ),
  },
}

const AboutSection = () => {
  const [activeAspect, setActiveAspect] = useState<AspectType>('ai')
  const [githubStats, setGithubStats] = useState<GitHubStats>()

  useEffect(() => {
    fetchGitHubStats().then(setGithubStats);
  }, []);

  const containerVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    const aspects = Object.keys(aspects) as AspectType[];
    const currentIndex = aspects.indexOf(activeAspect);
    const newIndex = (currentIndex + newDirection + aspects.length) % aspects.length;
    setActiveAspect(aspects[newIndex]);
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex items-center justify-center p-4">
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
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activeAspect}
            className="flex-grow relative"
            custom={direction}
            variants={containerVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            <Card className="w-full h-full overflow-hidden">
              <CardContent className="relative h-full p-0">
                <div className="relative w-full h-[70%] mx-auto">
                  <Image
                    src={aspects[activeAspect].image}
                    alt={aspects[activeAspect].title}
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="(max-width: 768px) 100vw, 75vw"
                    priority
                    className="mx-auto"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                <div className="absolute inset-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    {aspects[activeAspect].icon}
                    <span className="ml-2">{aspects[activeAspect].title}</span>
                  </h3>
                  <ScrollArea className="h-[calc(100%-4rem)]">
                    {typeof aspects[activeAspect].content === 'function'
                      ? aspects[activeAspect].content({ githubStats })
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