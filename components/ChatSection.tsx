import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, ChevronDown } from 'lucide-react'

const initialMessages = [
  "Hello! I'm Hugo's AI assistant. How can I help you today?",
  "I can provide information about Hugo's skills, experience, education, and projects. What would you like to know?"
]

export default function ChatSection() {
  const [messages, setMessages] = useState(initialMessages.map(content => ({ role: 'assistant' as const, content })))
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { role: 'user', content: input }, { role: 'assistant', content: "I'm processing your request. Please give me a moment." }])
      setInput('')
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [
          ...prev.slice(0, -1),
          { role: 'assistant', content: `Thank you for your question about ${input}. As an AI assistant, I can provide information based on Hugo's profile. Could you please be more specific about what you'd like to know regarding his skills, experience, education, or projects?` }
        ])
      }, 1000)
    }
  }

  return (
    <>
      <ScrollArea className="flex-1 p-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`flex ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start max-w-[80%]`}>
              <Avatar className="w-8 h-8">
                <AvatarFallback>{message.role === 'user' ? 'U' : 'H'}</AvatarFallback>
                <AvatarImage src={message.role === 'user' ? "/placeholder-user.jpg" : "/placeholder.svg?height=40&width=40"} />
              </Avatar>
              <div className={`mx-2 p-3 rounded-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {message.content}
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
      <footer className="p-4 border-t">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center">
          <Input
            placeholder="Ask about Hugo's skills, experience, or projects..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 mr-2"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </footer>
    </>
  )
}
