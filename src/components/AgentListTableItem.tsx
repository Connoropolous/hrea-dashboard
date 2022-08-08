import React from "react";
import { SlCheckbox } from "@shoelace-style/shoelace/dist/react";

export type AgentListTableItemProps = {
  agent: any;
  myAgentId: string;
};

const AgentListTableItem: React.FC<AgentListTableItemProps> = ({
  agent,
  myAgentId,
}) => {
  return (
    <div className="resource-list-table-item">
      {/* Checkbox */}
      <div>
        <SlCheckbox></SlCheckbox>
      </div>

      {/* Agent Name */}
      <div className="resource-list-resource-name">
        {agent.name} {agent.id === myAgentId ? "(me)" : ""}
      </div>

      {/* Agent ID */}
      <div>{agent.id.split(":")[0]}</div>
    </div>
  );
};

export default AgentListTableItem;
