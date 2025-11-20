import { useState } from "react";
import { Plus, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <h3 className="font-medium text-foreground">Custom MCP Tools</h3>
          <Button size="icon" variant="ghost" onClick={() => setShowDialog(true)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="h-32">
          <div className="p-4 space-y-2">
            {tools.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">
                No custom tools yet. Click + to create one.
              </p>
            ) : (
              tools.map((tool) => (
                <div
                  key={tool.id}
                  className="p-3 bg-secondary rounded-md flex items-start gap-3"
                >
                  <Code className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-secondary-foreground">{tool.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{tool.endpoint}</p>
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
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="tool-name">Tool Name</Label>
              <Input
                id="tool-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Custom Tool"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endpoint">API Endpoint</Label>
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
