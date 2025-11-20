import { Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./AgentCard.css";

interface AgentCardProps {
  id: string;
  name: string;
  description: string;
}

const AgentCard = ({ id, name, description }: AgentCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/agent/${id}`)}
      className="agent-card"
    >
      <div className="agent-card-content">
        <div className="agent-card-icon">
          <Bot />
        </div>
        <div className="agent-card-info">
          <h3 className="agent-card-name">{name}</h3>
          <p className="agent-card-description">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
