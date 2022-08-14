import React from "react";
import { SlButton } from "@shoelace-style/shoelace/dist/react";
import { Link } from "react-router-dom";
import CreateUnit from "../components/CreateUnit";
import MainPanelHeader from "../components/MainPanelHeader";

export type NewUnitProps = {
  myAgentId: string;
};

const NewUnit: React.FC<NewUnitProps> = ({ myAgentId }) => {
  return (
    <>
      <MainPanelHeader>
        <h2>New Unit</h2>
        <Link to="/units">
          <SlButton variant="primary">Back to Units</SlButton>
        </Link>
      </MainPanelHeader>
      <CreateUnit myAgentId={myAgentId} />
    </>
  );
};

export default NewUnit;
