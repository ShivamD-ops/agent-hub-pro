import { useState } from "react";
import { Plus, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "./ConfigSection.css";

interface CustomTool {
  id: string;
  name: string;
  endpoint: string;
}

const CustomMCPSection = () => {
  const [tools, setTools] = useState<CustomTool[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [name, setName] = useState("");
  const [endpoint, setEndpoint] = useState("");

  const handleCreate = () => {
    if (name.trim() && endpoint.trim()) {
      setTools([...tools, { id: Date.now().toString(), name, endpoint }]);
      setName("");
      setEndpoint("");
      setShowDialog(false);
    }
  };

  return (
    <>
      <div className="config-section">
        <div className="config-section-header">
          <h3 className="config-section-title">Custom MCP Tools</h3>
          <Button size="icon" variant="ghost" onClick={() => setShowDialog(true)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="config-section-content short">
          <div className="config-section-inner">
            {tools.length === 0 ? (
              <p className="config-empty-state">
                No custom tools yet. Click + to create one.
              </p>
            ) : (
              tools.map((tool) => (
                <div key={tool.id} className="custom-tool-item">
                  <Code className="custom-tool-icon" />
                  <div className="custom-tool-info">
                    <p className="custom-tool-name">{tool.name}</p>
                    <p className="custom-tool-endpoint">{tool.endpoint}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Custom MCP Tool</DialogTitle>
          </DialogHeader>
          <div className="dialog-form">
            <div className="dialog-field">
              <Label htmlFor="tool-name" className="dialog-label">Tool Name</Label>
              <Input
                id="tool-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Custom Tool"
              />
            </div>
            <div className="dialog-field">
              <Label htmlFor="endpoint" className="dialog-label">API Endpoint</Label>
              <Input
                id="endpoint"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                placeholder="https://api.example.com/endpoint"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Create Tool</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomMCPSection;
