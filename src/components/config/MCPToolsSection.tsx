import { useState } from "react";
import { Plug } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";

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
    <div className="bg-card rounded-lg border border-border shadow-sm">
      <div className="px-4 py-3 border-b border-border">
        <h3 className="font-medium text-foreground">MCP Tools</h3>
      </div>
      <ScrollArea className="h-40">
        <div className="p-4 space-y-3">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="flex items-center gap-3 p-3 bg-secondary rounded-md"
            >
              <Plug className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-secondary-foreground">{tool.name}</p>
                <p className="text-xs text-muted-foreground truncate">{tool.description}</p>
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
