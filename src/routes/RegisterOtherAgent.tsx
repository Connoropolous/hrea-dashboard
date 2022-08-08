import React from "react";
import { SlButton } from "@shoelace-style/shoelace/dist/react";
import { Link, useNavigate } from "react-router-dom";
import MainPanelHeader from "../components/MainPanelHeader";
import CreateAgent from "../components/CreateAgent";

export type NewAgentProps = {};

const NewAgent: React.FC<NewAgentProps> = ({}) => {
  const navigate = useNavigate();
  const onCreated = (agent: { id: string, name: string }) => {
    navigate("/agents");
    window.location.reload();
  };
  return (
    <>
      <MainPanelHeader>
        <h2>Register Another Agent</h2>
        <Link to="/agents">
          <SlButton variant="primary">Back to Agents</SlButton>
        </Link>
      </MainPanelHeader>
      <CreateAgent onCreated={onCreated} />
    </>
  );
};

export default NewAgent;
