import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AgentCard from "@/components/AgentCard";
import CreateAgentDialog from "@/components/CreateAgentDialog";
import "./Index.css";

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
    <div className="index-page">
      <header className="index-header">
        <div className="container index-header-content">
          <div className="index-header-top">
            <div>
              <h1 className="index-title">Agent Platform</h1>
              <p className="index-subtitle">Manage and configure your AI agents</p>
            </div>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4" style={{ marginRight: '0.5rem' }} />
              Create Agent
            </Button>
          </div>
          <div className="index-search-container">
            <Search className="index-search-icon" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search agents..."
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>
        </div>
      </header>

      <main className="container index-main">
        <div className="index-agents-grid">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.id} {...agent} />
          ))}
        </div>
        {filteredAgents.length === 0 && (
          <div className="index-empty-state">
            <p className="index-empty-text">No agents found matching your search.</p>
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
