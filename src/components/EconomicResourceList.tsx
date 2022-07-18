import React from "react";
import { SlCheckbox } from "@shoelace-style/shoelace/dist/react";
import ResourceListTableItem from "./ResourceListTableItem";
import { useQuery } from "@apollo/client";
import { LIST_ECONOMIC_RESOURCES } from "../graphql/queries";
import GeneralList from "./GeneralList";

export type EconomicResourceListProps = {
  myAgentId: string;
};

const EconomicResourceList: React.FC<EconomicResourceListProps> = ({
  myAgentId,
}) => {
  const { data, loading, error } = useQuery(LIST_ECONOMIC_RESOURCES);
  if (loading) return <div>Listing economic resources...</div>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  const headers = (
    <>
      {/* Checkbox */}
      <div>
        <SlCheckbox></SlCheckbox>
      </div>
      {/* Image */}
      <div></div>
      {/* Name */}
      <div>Resource</div>
      {/* Type */}
      {/* <div>Type</div> */}

      {/* Agent */}
      <div>Agent</div>

      {/* Measure */}
      <div>Measure</div>
    </>
  );
  const listItems = data.economicResources.edges.map((resource: any) => (
    <ResourceListTableItem
      key={resource.node.id}
      resource={resource.node}
      myAgentId={myAgentId}
    />
  ));
  return <GeneralList headers={headers} listItems={listItems} />;
};

export default EconomicResourceList;
