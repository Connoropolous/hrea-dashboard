import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { WHO_AM_I } from "./graphql/queries";
import RegisterMyself from "./components/RegisterMyself";
import { useNavigate } from "react-router-dom";

export type MyAgentIdProps = {
  setMyAgentId: React.Dispatch<React.SetStateAction<string>>;
};

const MyAgentId: React.FC<MyAgentIdProps> = ({ setMyAgentId }) => {
  const myAgentRequest = useQuery(WHO_AM_I);
  const navigate = useNavigate();

  const onCreated = (id: string) => {
    setMyAgentId(id);
    navigate("/resources");
  };

  useEffect(() => {
    if (
      !myAgentRequest.loading &&
      !myAgentRequest.error &&
      myAgentRequest.data
    ) {
      const myAgentId = myAgentRequest.data.myAgent.id;
      setMyAgentId(myAgentId);
    }
  }, [
    myAgentRequest.data,
    myAgentRequest.error,
    myAgentRequest.loading,
    setMyAgentId,
  ]);

  if (myAgentRequest.loading) return <div>Checking my identity...</div>;
  if (myAgentRequest.error) return <RegisterMyself onCreated={onCreated} />;

  return <></>;
};

export default MyAgentId;
