import React from "react";
import { SlButton } from "@shoelace-style/shoelace/dist/react";
import { Link } from "react-router-dom";
import EconomicEventList from "../components/EconomicEventList";
import MainPanelHeader from "../components/MainPanelHeader";

export type EventsProps = {
  myAgentId: string;
};

const Events: React.FC<EventsProps> = ({ myAgentId }) => {
  return (
    <>
      <MainPanelHeader>
        <h2>Events</h2>
        <div>
          {/* <Link to="/events/transfer">
            <SlButton variant="primary">Transfer</SlButton>
          </Link>
          {' '}
          <Link to="/events/new">
            <SlButton variant="primary">Add Resource</SlButton>
          </Link> */}
        </div>
      </MainPanelHeader>
      <EconomicEventList myAgentId={myAgentId} />
    </>
  );
};

export default Events;
