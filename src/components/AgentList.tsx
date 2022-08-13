import React from "react";
import { SlCheckbox } from "@shoelace-style/shoelace/dist/react";
import { useQuery } from "@apollo/client";
import { LIST_AGENTS } from "../graphql/queries";
import GeneralList from "./GeneralList";

export type EconomicResourceListProps = {
  myAgentId: string;
};

const EconomicResourceList: React.FC<EconomicResourceListProps> = ({
  myAgentId,
}) => {
  const { data, loading, error } = useQuery(LIST_AGENTS);
  if (loading) return <div>Listing economic resources...</div>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  const dataTable = (
    <>
      {/* Checkboxes */}
      <div className="data-table-column">
        {/* Checkbox */}
        <div className="data-table-header">
          <SlCheckbox></SlCheckbox>
        </div>
        {data.agents.edges.map((agent: any) => (
          <div className="data-table-cell">
            <SlCheckbox />
          </div>
        ))}
      </div>

      {/* Names */}
      <div className="data-table-column" style={{ flex: 1 }}>
        {/* Name */}
        <div className="data-table-header">Name</div>
        {data.agents.edges.map((agent: any) => (
          <div className="data-table-cell data-table-bold">
            {agent.node.name} {agent.node.id === myAgentId ? "(me)" : ""}
          </div>
        ))}
      </div>

      {/* ID */}
      <div className="data-table-column">
        {/* Name */}
        <div className="data-table-header">ID</div>
        {data.agents.edges.map((agent: any) => (
          <div className="data-table-cell">{agent.node.id.split(":")[0]}</div>
        ))}
      </div>
    </>
  );
  return <GeneralList dataTable={dataTable} />;
};

export default EconomicResourceList;
