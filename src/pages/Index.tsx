import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AgentCard from "@/components/AgentCard";
import CreateAgentDialog from "@/components/CreateAgentDialog";

interface Agent {
  id: string;
  name: string;
  description: string;
}

const Index = () => {
  const [agents, setAgents] = useState<Agent[]>([
    { id: "1", name: "Customer Support Agent", description: "Handles customer inquiries and support tickets with empathy and efficiency." },
    { id: "2", name: "Data Analysis Agent", description: "Analyzes datasets and generates insights with statistical accuracy." },
    { id: "3", name: "Content Writer Agent", description: "Creates engaging content for blogs, social media, and marketing materials." },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAgentCreated = (agent: Agent) => {
    setAgents([...agents, agent]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Agent Platform</h1>
              <p className="text-muted-foreground mt-1">Manage and configure your AI agents</p>
            </div>
            <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Agent
            </Button>
          </div>
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search agents..."
              className="pl-10"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.id} {...agent} />
          ))}
        </div>
        {filteredAgents.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No agents found matching your search.</p>
          </div>
        )}
      </main>

      <CreateAgentDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onAgentCreated={handleAgentCreated}
      />
    </div>
  );
};

export default Index;
