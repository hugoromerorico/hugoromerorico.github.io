import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from 'lucide-react';
import getResponse from '@/utils/getResponse'; // Import the getResponse function

// Define a type that supports both 'user' and 'assistant' roles
type Message = { role: 'assistant' | 'user'; content: string };

const initialMessages: Message[] = [
  { role: 'assistant', content: "Hello! I'm Hugo's AI assistant. How can I help you today?" },
  { role: 'assistant', content: "I can provide information about Hugo's skills, experience, education, and projects. What would you like to know?" }
];

export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim()) {
      // Add the user's message
      setMessages(prev => [...prev, { role: 'user', content: input }]);

      // Call getResponse to get the AI's response based on the user's input
      const botResponse = getResponse(input);

      // Add the bot's response
      setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);

      // Clear the input field
      setInput('');
    }
  };

  return (
    <>
      <ScrollArea className="flex-1 p-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`flex ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start max-w-[80%]`}>
              <Avatar className="w-8 h-8">
                <AvatarFallback>{message.role === 'user' ? 'U' : 'H'}</AvatarFallback>
                <AvatarImage src={message.role === 'user' ? "/images/brain-blackbg.png" : "/images/brain-blackbg.png?height=40&width=40"} />
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
  );
}
