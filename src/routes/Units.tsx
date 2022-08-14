import React from "react";
import { SlButton } from "@shoelace-style/shoelace/dist/react";
import { Link } from "react-router-dom";
import UnitList from "../components/UnitList";
import MainPanelHeader from "../components/MainPanelHeader";

export type UnitsProps = {
  myAgentId: string;
};

const Units: React.FC<UnitsProps> = ({ myAgentId }) => {
  return (
    <>
      <MainPanelHeader>
        <h2>Units</h2>
        <div>
          <Link to="/units/new">
            <SlButton variant="primary">Register A Unit</SlButton>
          </Link>
        </div>
      </MainPanelHeader>
      <UnitList myAgentId={myAgentId} />
    </>
  );
};

export default Units;
