import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Brain } from 'lucide-react';
import getResponse from '@/utils/getResponse';

type Message = { role: 'assistant' | 'user'; content: string };

const initialMessages: Message[] = [
  { role: 'assistant', content: "Hello! I'm Hugo's AI assistant. How can I help you today?" },
  { role: 'assistant', content: "I can provide information about Hugo's skills, experience, education, and projects. What would you like to know?" }
];

export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { role: 'user', content: input }]);
      const botResponse = getResponse(input);
      setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-2 flex-shrink-0">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
            )}
            <div className={`max-w-[80%] ${message.role === 'user' ? 'bg-primary text-primary-foreground rounded-lg p-3' : 'text-secondary-foreground rounded-lg p-3'}`}>
              {message.role === 'assistant' ? (
                <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  p: (props) => <p className="mb-2" {...props} />,
                  ul: (props) => <ul className="list-disc list-inside mb-2" {...props} />,
                  ol: (props) => <ol className="list-decimal list-inside mb-2" {...props} />,
                  li: (props) => <li className="mb-1" {...props} />,
                  a: (props) => <a className="text-blue-500 hover:underline" {...props} />,
                  code: ({ inline, ...props }) => 
                    inline ? (
                      <code className="bg-gray-200 dark:bg-gray-700 rounded px-1" {...props} />
                    ) : (
                      <pre className="bg-gray-200 dark:bg-gray-700 rounded p-2 overflow-x-auto">
                        <code {...props} />
                      </pre>
                    ),
                }}
              >
                {message.content}
              </ReactMarkdown>
              
              ) : (
                message.content
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <footer className={`p-4 border-t ${theme === 'dark' ? 'bg-chatgpt-dark border-gray-600' : 'bg-white border-gray-200'}`}>
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center">
          <Input
            placeholder="Ask about Hugo's skills, experience, or projects..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`flex-1 mr-2 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}
          />
          <Button type="submit" variant="ghost" size="icon" className={theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-black hover:bg-gray-200'}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </footer>
    </div>
  );
}
