import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const PromptsSection = () => {
  const [prompts, setPrompts] = useState<string[]>([
    "You are a helpful AI assistant focused on providing accurate information."
  ]);
  const [showDialog, setShowDialog] = useState(false);
  const [newPrompt, setNewPrompt] = useState("");

  const handleAddPrompt = () => {
    if (newPrompt.trim()) {
      setPrompts([...prompts, newPrompt.trim()]);
      setNewPrompt("");
      setShowDialog(false);
    }
  };

  const handleDeletePrompt = (index: number) => {
    setPrompts(prompts.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <h3 className="font-medium text-foreground">Prompts & Instructions</h3>
          <Button size="icon" variant="ghost" onClick={() => setShowDialog(true)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="h-40">
          <div className="p-4 space-y-2">
            {prompts.map((prompt, idx) => (
              <div
                key={idx}
                className="p-3 bg-secondary rounded-md text-sm flex items-start justify-between gap-2 group"
              >
                <span className="flex-1 text-secondary-foreground">{prompt}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDeletePrompt(idx)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Prompt</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="prompt">Prompt Instruction</Label>
            <Textarea
              id="prompt"
              value={newPrompt}
              onChange={(e) => setNewPrompt(e.target.value)}
              placeholder="Enter a prompt or instruction..."
              rows={6}
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button onClick={handleAddPrompt}>Add Prompt</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PromptsSection;
