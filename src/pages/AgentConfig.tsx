import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import PromptsSection from "@/components/config/PromptsSection";
import FilesSection from "@/components/config/FilesSection";
import MCPToolsSection from "@/components/config/MCPToolsSection";
import CustomMCPSection from "@/components/config/CustomMCPSection";
import "./AgentConfig.css";

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
    <div className="agent-config-page">
      <header className="agent-config-header">
        <div className="container agent-config-header-content">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="agent-config-title">Agent Configuration</h1>
            <p className="agent-config-subtitle">Configure and test your agent</p>
          </div>
        </div>
      </header>

      <div className="container agent-config-main">
        <div className="agent-config-layout">
          {/* Left side - Chat & Output (70%) */}
          <div className="agent-config-left">
            {/* Chat Box */}
            <div className="chat-box">
              <div className="chat-box-header">
                <h2 className="chat-box-title">Chat with Agent</h2>
              </div>
              <ScrollArea className="chat-box-messages">
                <div className="chat-messages-container">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`chat-message ${msg.role}`}
                    >
                      <div className={`chat-message-bubble ${msg.role}`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="chat-box-input-container">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your message..."
                />
                <Button onClick={handleSend} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Sample Output */}
            <div className="sample-output">
              <h3 className="sample-output-title">Sample Output</h3>
              <pre className="sample-output-content">{sampleOutput}</pre>
            </div>
          </div>

          {/* Right side - Configuration (30%) */}
          <div className="agent-config-right">
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
