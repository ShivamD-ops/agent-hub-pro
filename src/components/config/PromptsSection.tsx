import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import "./ConfigSection.css";

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
      <div className="config-section">
        <div className="config-section-header">
          <h3 className="config-section-title">Prompts & Instructions</h3>
          <Button size="icon" variant="ghost" onClick={() => setShowDialog(true)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="config-section-content">
          <div className="config-section-inner">
            {prompts.map((prompt, idx) => (
              <div key={idx} className="prompt-item">
                <span className="prompt-item-text">{prompt}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="prompt-item-delete"
                  onClick={() => handleDeletePrompt(idx)}
                  style={{ height: '1.5rem', width: '1.5rem' }}
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
          <div className="dialog-form">
            <div className="dialog-field">
              <Label htmlFor="prompt" className="dialog-label">Prompt Instruction</Label>
              <Textarea
                id="prompt"
                value={newPrompt}
                onChange={(e) => setNewPrompt(e.target.value)}
                placeholder="Enter a prompt or instruction..."
                rows={6}
              />
            </div>
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
