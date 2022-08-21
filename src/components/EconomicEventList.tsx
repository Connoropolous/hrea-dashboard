import React from "react";
import { SlCheckbox, SlFormatDate } from "@shoelace-style/shoelace/dist/react";
import { useQuery } from "@apollo/client";
import { LIST_ECONOMIC_EVENTS } from "../graphql/queries";
import GeneralList from "./GeneralList";

export type EconomicEventListProps = {
  myAgentId: string;
};

const EconomicEventList: React.FC<EconomicEventListProps> = ({ myAgentId }) => {
  const { data, loading, error } = useQuery(LIST_ECONOMIC_EVENTS);
  if (loading) return <div>Listing economic events...</div>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  const dataTable = (
    <>
      {/* Checkboxes */}
      <div className="data-table-column">
        {/* Checkbox */}
        <div className="data-table-header">
          <SlCheckbox disabled></SlCheckbox>
        </div>
        {data.economicEvents.edges.map((event: any) => (
          <div className="data-table-cell">
            <SlCheckbox disabled />
          </div>
        ))}
      </div>

      {/* Provider */}
      <div className="data-table-column" style={{ flex: 1 }}>
        <div className="data-table-header">Provider</div>
        {data.economicEvents.edges.map((event: any) => (
          <div className="data-table-cell">
            {event.node.provider.name.slice(0, 8) +
              (event.node.provider.name.length > 9 ? "..." : "")}
          </div>
        ))}
      </div>

      {/* From Resource */}
      {/* style={{ flex: 2 }} */}
      <div className="data-table-column" style={{ flex: 1 }}>
        <div className="data-table-header">From Resource</div>
        {data.economicEvents.edges.map((event: any) => (
          <div className="data-table-cell">
            {event.node.resourceInventoriedAs ? event.node.resourceInventoriedAs.name.slice(0, 8) +
              (event.node.resourceInventoriedAs.name.length > 9 ? "..." : "") : ''}
          </div>
        ))}
      </div>

      {/* Receiver */}
      {/* style={{ flex: 2 }} */}
      <div className="data-table-column" style={{ flex: 1 }}>
        <div className="data-table-header">Receiver</div>
        {data.economicEvents.edges.map((event: any) => (
          <div className="data-table-cell">
            {event.node.receiver.name.slice(0, 8) +
              (event.node.receiver.name.length > 9 ? "..." : "")}
          </div>
        ))}
      </div>

      {/* To Resource */}
      {/* style={{ flex: 2 }} */}
      <div className="data-table-column" style={{ flex: 1 }}>
        <div className="data-table-header">To Resource</div>
        {data.economicEvents.edges.map((event: any) => (
          <div className="data-table-cell">
            {event.node.toResourceInventoriedAs ? event.node.toResourceInventoriedAs.name.slice(0, 8) +
              (event.node.toResourceInventoriedAs.name.length > 9 ? "..." : "") : ''}
          </div>
        ))}
      </div>

      {/* Action */}
      <div className="data-table-column" style={{ flex: 1 }}>
        <div className="data-table-header">Action</div>
        {data.economicEvents.edges.map((event: any) => (
          <div className="data-table-cell">{event.node.action.id}</div>
        ))}
      </div>

      {/* Resource Quantity */}
      <div className="data-table-column" style={{ flex: 1 }}>
        <div className="data-table-header">Quantity</div>
        {data.economicEvents.edges.map((event: any) => (
          <div className="data-table-cell">
            {event.node.resourceQuantity.hasNumericalValue}{" "}
            {event.node.resourceQuantity.hasUnit && (
              <>{event.node.resourceQuantity.hasUnit.symbol}</>
            )}
          </div>
        ))}
      </div>

      {/* Date */}
      <div className="data-table-column" style={{ flex: 1 }}>
        <div className="data-table-header">Time</div>
        {data.economicEvents.edges.map((event: any) => (
          <div className="data-table-cell">
            <SlFormatDate
              date={event.node.hasPointInTime}
              month="long"
              day="numeric"
              year="numeric"
              hour="numeric"
              minute="numeric"
            />
          </div>
        ))}
      </div>
    </>
  );
  // {data.economicEvents.edges.length === 0 && (
  // <div style={{ textAlign: "center", marginTop: "1rem" }}>
  // There are no events yet. Use 'Add Event' to add one.
  // </div>
  // )}
  return <GeneralList dataTable={dataTable} />;
};

export default EconomicEventList;
