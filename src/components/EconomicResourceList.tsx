import React from "react";
import { SlCheckbox } from "@shoelace-style/shoelace/dist/react";
import QuantityAdjust from "./QuantityAdjust";
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

  const dataTable = (
    <>
      {/* Checkboxes */}
      <div className="data-table-column">
        {/* Checkbox */}
        <div className="data-table-header">
          <SlCheckbox></SlCheckbox>
        </div>
        {data.economicResources.edges.map((resource: any) => (
          <div className="data-table-cell">
            <SlCheckbox />
          </div>
        ))}
      </div>

      {/* Images */}
      <div className="data-table-column">
        {/* Image */}
        <div className="data-table-header"></div>
        {data.economicResources.edges.map((resource: any) => (
          <div className="data-table-cell">
            <div
              style={{
                width: "40px",
                height: "40px",
                background: `url(${resource.node.image})`,
                backgroundSize: "contain",
              }}
            />
          </div>
        ))}
      </div>

      {/* Names */}
      <div className="data-table-column" style={{ flex: 2 }}>
        {/* Name */}
        <div className="data-table-header">Resource</div>
        {data.economicResources.edges.map((resource: any) => (
          <div className="data-table-cell data-table-bold">{resource.node.name}</div>
        ))}
      </div>

      {/* Agents */}
      <div className="data-table-column" style={{ flex: 1 }}>
        {/* Agent */}
        <div className="data-table-header">Agent</div>
        {data.economicResources.edges.map((resource: any) => (
          <div className="data-table-cell">
            {resource.node.primaryAccountable.name.slice(0, 8) +
              (resource.node.primaryAccountable.name.length > 9 ? "..." : "")}
          </div>
        ))}
      </div>

      {/* Measures */}
      <div className="data-table-column" style={{ flex: 2 }}>
        {/* Measure */}
        <div className="data-table-header">Quantity</div>
        {data.economicResources.edges.map((resource: any) => (
          <div className="data-table-cell">
            <QuantityAdjust resource={resource.node} myAgentId={myAgentId} />
          </div>
        ))}
      </div>
    </>
  );
  // {data.economicResources.edges.length === 0 && (
  // <div style={{ textAlign: "center", marginTop: "1rem" }}>
  // There are no resources yet. Use 'Add Resource' to add one.
  // </div>
  // )}
  return <GeneralList dataTable={dataTable} />;
};

export default EconomicResourceList;
