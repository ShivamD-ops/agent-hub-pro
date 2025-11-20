import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CreateAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAgentCreated: (agent: { id: string; name: string; description: string }) => void;
}

const CreateAgentDialog = ({ open, onOpenChange, onAgentCreated }: CreateAgentDialogProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const handleCreate = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter an agent name",
        variant: "destructive",
      });
      return;
    }

    const newAgent = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim() || "No description provided",
    };

    onAgentCreated(newAgent);
    toast({
      title: "Agent created",
      description: `${name} has been successfully created`,
    });

    setName("");
    setDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Agent</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Agent Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter agent name..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this agent does..."
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>Create Agent</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAgentDialog;
