import React from "react";
import { SlButton } from "@shoelace-style/shoelace/dist/react";
import { Link } from "react-router-dom";
import AgentList from "../components/AgentList";
import MainPanelHeader from "../components/MainPanelHeader";

export type ResourcesProps = {
  myAgentId: string;
};

const Resources: React.FC<ResourcesProps> = ({ myAgentId }) => {
  return (
    <>
      <MainPanelHeader>
        <h2>Agents</h2>
        <div>
          <Link to="/agents/register_other">
            <SlButton variant="primary">Register An Agent</SlButton>
          </Link>
        </div>
      </MainPanelHeader>
      <AgentList myAgentId={myAgentId} />
    </>
  );
};

export default Resources;
