import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ASSOCIATE_MY_AGENT, CREATE_PERSON } from "../graphql/queries";
import { SlButton, SlCard, SlInput } from "@shoelace-style/shoelace/dist/react";

export type CreateAgentProps = {
  isMyself?: boolean;
  onCreated: (id: string) => void;
};

const CreateAgent: React.FC<CreateAgentProps> = ({ isMyself, onCreated }) => {
  const [createPerson, createPersonMutationStatus] = useMutation(CREATE_PERSON);
  const [associateMyAgent, associateMyAgentMutationStatus] =
    useMutation(ASSOCIATE_MY_AGENT);

  const [name, setName] = useState("");

  if (
    createPersonMutationStatus.loading ||
    associateMyAgentMutationStatus.loading
  )
    return <div>Creating agent...</div>;
  if (createPersonMutationStatus.error || associateMyAgentMutationStatus.error)
    return <p>ERROR</p>;

  const create = async () => {
    let response = await createPerson({
      variables: {
        person: {
          name,
        },
      },
    });
    const id = response.data.createPerson.agent.id;
    // if isMyself
    // then also 'associateMyAgent'
    if (isMyself) {
      await associateMyAgent({
        variables: {
          id,
        },
      });
    }
    onCreated(id);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (name) {
      create();
    }
  };

  return (
    <SlCard className="create-form">
      <form onSubmit={handleSubmit}>
        <br />
        <SlInput
          required
          label="Name"
          // @ts-ignore
          onSlChange={(e) => setName(e.target.value)}
          value={name}
        />
        <br />
        <SlButton type="submit" variant="primary">
          Register
        </SlButton>
      </form>
    </SlCard>
  );
};

export default CreateAgent;
