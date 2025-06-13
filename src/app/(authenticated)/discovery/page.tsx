'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { fieldBotDiscovery, type FieldBotDiscoveryInput, type FieldBotDiscoveryOutput } from '@/ai/flows/field-bot-discovery';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Send, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast"

interface Message {
  sender: 'user' | 'bot';
  text: string;
  questionForNextTurn?: string; // Store bot's next question if any
}

export default function DiscoveryPage() {
  const [motelName, setMotelName] = useState('La Luna Donde Mamá');
  const [staffRole, setStaffRole] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleStartConversation = (e: FormEvent) => {
    e.preventDefault();
    if (!staffRole.trim()) {
      toast({ title: "Field-Bot", description: "Please enter the staff role to begin.", variant: "destructive" });
      return;
    }
    setMessages([]);
    setIsFinished(false);
    setConversationStarted(true);
    // Optionally, you could have the bot ask an initial question here
    // For now, user asks the first question after starting.
    toast({ title: "Field-Bot", description: `Discovery session started for ${staffRole} at ${motelName}. Ask your first question.` });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!currentQuestion.trim() || isLoading || isFinished) return;

    const userMessage: Message = { sender: 'user', text: currentQuestion };
    setMessages(prev => [...prev, userMessage]);
    setCurrentQuestion('');
    setIsLoading(true);

    const previousResponses: { question: string; answer: string }[] = messages
      .filter(msg => msg.sender === 'bot' && msg.questionForNextTurn)
      .map((msg, index, arr) => {
        const userResponse = messages.find((m, i) => m.sender === 'user' && i > arr.indexOf(msg));
        return { question: msg.questionForNextTurn!, answer: userResponse?.text || "N/A" };
      });
    
    // Special handling for the very first user question if there are no previous bot questions.
    // The current user message becomes the first "answer" to an implicit "initial prompt" by the user.
     if (messages.length === 1 && messages[0].sender === 'user') {
        // This is the first question from the user. The AI will treat this as the 'question' parameter.
    }


    try {
      const input: FieldBotDiscoveryInput = {
        motelName,
        staffRole,
        question: userMessage.text, // This is the current user utterance
        previousResponses,
      };

      const result: FieldBotDiscoveryOutput = await fieldBotDiscovery(input);
      
      const botMessage: Message = { sender: 'bot', text: result.answer, questionForNextTurn: result.nextQuestion };
      setMessages(prev => [...prev, botMessage]);

      if (result.isFinished) {
        setIsFinished(true);
        toast({ title: "Field-Bot", description: "Discovery session complete. Thank you!" });
      } else if (result.nextQuestion) {
        // If bot has a next question, we can pre-fill or just let user respond.
        // For now, the bot's message contains the question.
      }
    } catch (error) {
      console.error('Error calling Field-Bot:', error);
      const errorMessage: Message = { sender: 'bot', text: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
      toast({ title: "Error", description: "Could not connect to Field-Bot.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline text-foreground">Conversational Discovery</h1>
        <p className="text-muted-foreground">Field-Bot interviews staff to identify automation opportunities.</p>
      </div>

      <Card className="shadow-lg w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center gap-2">
            <Bot className="text-primary" /> Field-Bot Discovery
          </CardTitle>
          <CardDescription>Chat with the Field-Bot for {motelName}.</CardDescription>
        </CardHeader>
        {!conversationStarted ? (
           <form onSubmit={handleStartConversation}>
            <CardContent className="space-y-4">
                <div>
                <Label htmlFor="motelName" className="text-foreground/80">Motel Name</Label>
                <Input id="motelName" value={motelName} onChange={(e) => setMotelName(e.target.value)} placeholder="Enter motel name" disabled />
                </div>
                <div>
                <Label htmlFor="staffRole" className="text-foreground/80">Staff Role</Label>
                <Input id="staffRole" value={staffRole} onChange={(e) => setStaffRole(e.target.value)} placeholder="e.g., Receptionist, Manager" />
                </div>
            </CardContent>
            <CardFooter>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Start Conversation</Button>
            </CardFooter>
          </form>
        ) : (
          <>
            <CardContent>
              <ScrollArea className="h-[400px] w-full p-4 border rounded-md bg-muted/20" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                      {msg.sender === 'bot' && <Bot className="h-6 w-6 text-primary flex-shrink-0" />}
                      <div className={`max-w-[75%] p-3 rounded-lg shadow ${
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-muted text-foreground rounded-bl-none'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                      </div>
                      {msg.sender === 'user' && <User className="h-6 w-6 text-accent flex-shrink-0" />}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-end gap-2">
                      <Bot className="h-6 w-6 text-primary flex-shrink-0" />
                      <div className="max-w-[75%] p-3 rounded-lg shadow bg-muted text-foreground rounded-bl-none">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
                <Textarea
                  value={currentQuestion}
                  onChange={(e) => setCurrentQuestion(e.target.value)}
                  placeholder={isFinished ? "Conversation ended." : "Your response or next question..."}
                  disabled={isLoading || isFinished}
                  className="flex-1 resize-none bg-input/50 focus:bg-input"
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <Button type="submit" size="icon" disabled={isLoading || isFinished || !currentQuestion.trim()} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}
