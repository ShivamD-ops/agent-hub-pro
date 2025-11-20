import { useState } from "react";
import { Plug } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import "./ConfigSection.css";

interface MCPTool {
  id: string;
  name: string;
  description: string;
  connected: boolean;
}

const MCPToolsSection = () => {
  const [tools, setTools] = useState<MCPTool[]>([
    { id: "1", name: "Web Search", description: "Search the web for information", connected: true },
    { id: "2", name: "Calculator", description: "Perform calculations", connected: false },
    { id: "3", name: "Weather", description: "Get weather information", connected: false },
  ]);

  const handleToggle = (id: string) => {
    setTools(tools.map(t => t.id === id ? { ...t, connected: !t.connected } : t));
  };

  return (
    <div className="config-section">
      <div className="config-section-header">
        <h3 className="config-section-title">MCP Tools</h3>
      </div>
      <ScrollArea className="config-section-content">
        <div className="config-section-inner">
          {tools.map((tool) => (
            <div key={tool.id} className="mcp-tool-item">
              <Plug className="mcp-tool-icon" />
              <div className="mcp-tool-info">
                <p className="mcp-tool-name">{tool.name}</p>
                <p className="mcp-tool-description">{tool.description}</p>
              </div>
              <Switch
                checked={tool.connected}
                onCheckedChange={() => handleToggle(tool.id)}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MCPToolsSection;
