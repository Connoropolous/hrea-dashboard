import React from "react";
import { SlCheckbox } from "@shoelace-style/shoelace/dist/react";
import AgentListTableItem from "./AgentListTableItem";
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

  const headers = (
    <>
      {/* Checkbox */}
      <div>
        <SlCheckbox></SlCheckbox>
      </div>
      {/* Name */}
      <div>Name</div>
    </>
  );
  const listItems = data.agents.edges.map((agent: any) => (
    <AgentListTableItem
      key={agent.node.id}
      agent={agent.node}
      myAgentId={myAgentId}
    />
  ));
  return <GeneralList headers={headers} listItems={listItems} />;
};

export default EconomicResourceList;
