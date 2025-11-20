import { Bot } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface AgentCardProps {
  id: string;
  name: string;
  description: string;
}

const AgentCard = ({ id, name, description }: AgentCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/agent/${id}`)}
      className="p-6 cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] border-border bg-card"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-accent">
          <Bot className="h-6 w-6 text-accent-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground mb-1 truncate">{name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default AgentCard;
