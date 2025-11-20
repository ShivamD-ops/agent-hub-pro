import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import PromptsSection from "@/components/config/PromptsSection";
import FilesSection from "@/components/config/FilesSection";
import MCPToolsSection from "@/components/config/MCPToolsSection";
import CustomMCPSection from "@/components/config/CustomMCPSection";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AgentConfig = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm ready to help. What would you like to know?" }
  ]);
  const [input, setInput] = useState("");
  const [sampleOutput, setSampleOutput] = useState("Sample output will appear here after processing...");

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    
    // Simulate response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "This is a simulated response. The agent is processing your request..." 
      }]);
      setSampleOutput(`Processed: "${input}"\nTimestamp: ${new Date().toLocaleTimeString()}`);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Agent Configuration</h1>
            <p className="text-sm text-muted-foreground">Configure and test your agent</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <div className="flex gap-6 h-[calc(100vh-180px)]">
          {/* Left side - Chat & Output (70%) */}
          <div className="flex-[7] flex flex-col gap-4">
            {/* Chat Box */}
            <div className="flex-1 bg-card rounded-lg border border-border shadow-sm flex flex-col">
              <div className="px-4 py-3 border-b border-border">
                <h2 className="font-medium text-foreground">Chat with Agent</h2>
              </div>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button onClick={handleSend} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Sample Output */}
            <div className="h-32 bg-card rounded-lg border border-border shadow-sm p-4">
              <h3 className="text-sm font-medium text-foreground mb-2">Sample Output</h3>
              <pre className="text-xs text-muted-foreground font-mono whitespace-pre-wrap">
                {sampleOutput}
              </pre>
            </div>
          </div>

          {/* Right side - Configuration (30%) */}
          <div className="flex-[3] space-y-4">
            <PromptsSection />
            <FilesSection />
            <MCPToolsSection />
            <CustomMCPSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentConfig;
