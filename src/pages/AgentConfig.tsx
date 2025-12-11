import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, FileText, FolderOpen, Wrench, Plus, Trash2, Rocket, PanelLeftClose, PanelLeft, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import PromptsSection from "@/components/config/PromptsSection";
import FilesSection from "@/components/config/FilesSection";
import MCPToolsSection from "@/components/config/MCPToolsSection";
import CustomMCPSection from "@/components/config/CustomMCPSection";
import { toast } from "sonner";
import "./AgentConfig.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

type SettingsTab = "prompts" | "files" | "mcp" | "custom" | "all";

const AgentConfig = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm ready to help. What would you like to know?" }
  ]);
  const [input, setInput] = useState("");
  const [sampleOutput, setSampleOutput] = useState("Sample output will appear here after processing...");
  const [activeTab, setActiveTab] = useState<SettingsTab>("prompts");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "This is a simulated response. The agent is processing your request..." 
      }]);
      setSampleOutput(`Processed: "${input}"\nTimestamp: ${new Date().toLocaleTimeString()}`);
    }, 500);
  };

  const handlePublish = () => {
    toast.success("Agent published successfully!");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this agent?")) {
      toast.success("Agent deleted");
      navigate("/");
    }
  };

  const tabs = [
    { id: "all" as SettingsTab, icon: LayoutGrid, label: "All Settings" },
    { id: "prompts" as SettingsTab, icon: FileText, label: "Prompts" },
    { id: "files" as SettingsTab, icon: FolderOpen, label: "Files" },
    { id: "mcp" as SettingsTab, icon: Wrench, label: "MCP Tools" },
    { id: "custom" as SettingsTab, icon: Plus, label: "Custom MCP" },
  ];

  const renderSidebarContent = () => {
    if (activeTab === "all") return null;
    switch (activeTab) {
      case "prompts":
        return <PromptsSection />;
      case "files":
        return <FilesSection />;
      case "mcp":
        return <MCPToolsSection />;
      case "custom":
        return <CustomMCPSection />;
    }
  };


  return (
    <div className="agent-config-page">
      <header className="agent-config-header">
        <div className="container agent-config-header-content">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="header-title-section">
            <h1 className="agent-config-title">Agent Configuration</h1>
            <p className="agent-config-subtitle">Configure and test your agent</p>
          </div>
          <div className="header-actions">
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
            <Button onClick={handlePublish}>
              <Rocket className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>
      </header>

      <div className="agent-config-main">
        <div className="agent-config-layout">
          {/* Left Sidebar - Settings */}
          <div className={`agent-config-sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
            <div className="sidebar-header">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="sidebar-toggle"
              >
                {sidebarCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
              </Button>
            </div>
            <div className="sidebar-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`sidebar-tab ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                  title={tab.label}
                >
                  <tab.icon className="sidebar-tab-icon" />
                  {!sidebarCollapsed && <span className="sidebar-tab-label">{tab.label}</span>}
                </button>
              ))}
            </div>
            {!sidebarCollapsed && activeTab !== "all" && (
              <ScrollArea className="sidebar-content">
                {renderSidebarContent()}
              </ScrollArea>
            )}
          </div>

          {/* Main Content */}
          <div className="agent-config-content">
            {activeTab === "all" ? (
              <ScrollArea className="all-settings-container">
                <div className="all-settings-grid">
                  <PromptsSection />
                  <FilesSection />
                  <MCPToolsSection />
                  <CustomMCPSection />
                </div>
              </ScrollArea>
            ) : (
              <>
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

                <div className="sample-output">
                  <h3 className="sample-output-title">Sample Output</h3>
                  <pre className="sample-output-content">{sampleOutput}</pre>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentConfig;
