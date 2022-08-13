import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_ECONOMIC_RESOURCES,
  LIST_AGENTS,
  LIST_UNITS,
} from "../graphql/queries";
import {
  SlButton,
  SlCard,
  SlInput,
  SlMenuItem,
  SlSelect,
} from "@shoelace-style/shoelace/dist/react";
import { useNavigate } from "react-router-dom";

export type CreateEconomicResourceProps = {
  myAgentId: string;
};

const CreateEconomicResource: React.FC<CreateEconomicResourceProps> = ({
  myAgentId,
}) => {
  const navigate = useNavigate();

  // data needed
  const {
    data: unitData,
    loading: unitLoading,
    error: unitError,
  } = useQuery(LIST_UNITS);
  const {
    data: agentData,
    loading: agentLoading,
    error: agentError,
  } = useQuery(LIST_AGENTS);

  const [createER, createERmutationStatus] = useMutation(
    CREATE_ECONOMIC_RESOURCES
  );

  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState();
  const [forAgent, setForAgent] = useState(myAgentId);
  const [resourceName, setResourceName] = useState("");

  useEffect(() => {
    setForAgent(myAgentId);
  }, [myAgentId]);

  if (unitLoading || agentLoading) return <div>Loading...</div>;
  if (unitError) return <p>ERROR loading units</p>;
  if (agentError) return <p>ERROR loading agents</p>;

  if (createERmutationStatus.loading)
    return <div>Creating economic resource...</div>;
  if (createERmutationStatus.error) return <p>ERROR during creation</p>;

  const create = async () => {
    await createER({
      variables: {
        event: {
          action: "raise",
          provider: forAgent,
          receiver: forAgent,
          resourceQuantity: { hasNumericalValue: quantity },
          resourceClassifiedAs: "https://something",
          hasPointInTime: new Date(),
        },
        newInventoriedResource: {
          name: resourceName,
          image: image,
        },
      },
    });
    navigate("/resources");
    window.location.reload();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (resourceName && image && typeof quantity !== "undefined") {
      create();
    }
  };

  console.log('unitData', unitData)

  return (
    <SlCard className="create-form">
      <form onSubmit={handleSubmit}>
        {/* make sure its a number, using + */}
        <br />
        <SlInput
          required
          label="Resource Name"
          // @ts-ignore
          onSlChange={(e) => setResourceName(e.target.value)}
          value={resourceName}
        />
        <br />
        <div className="resource-balance-and-units">
          <SlInput
            required
            type="number"
            label="Initial Balance"
            // @ts-ignore
            onSlChange={(e) => setQuantity(+e.target.value)}
            value={quantity.toString()}
          />
          <SlSelect
            // required
            label="Units"
            onSlChange={(e) => {
              // @ts-ignore
              setUnit(e.target.value);
            }}
            value={unit}
          >
            {unitData.units.edges.map((unit: any) => {
              const value = unit.node.id;
              return (
                <SlMenuItem key={value} value={value}>
                  {unit.node.symbol}
                </SlMenuItem>
              );
            })}
          </SlSelect>
        </div>
        <br />
        <SlSelect
          // required
          label="Agent"
          onSlChange={(e) => {
            // @ts-ignore
            setForAgent(e.target.value);
          }}
          value={forAgent}
        >
          {agentData.agents.edges.map((agent: any) => {
            const value = agent.node.id;
            return (
              <SlMenuItem key={value} value={value}>
                {agent.node.name} {agent.node.id === myAgentId ? "(me)" : ""}
              </SlMenuItem>
            );
          })}
        </SlSelect>
        <br />
        <SlInput
          required
          label="Image"
          // @ts-ignore
          onSlChange={(e) => setImage(e.target.value)}
          value={image}
        />
        <br />
        <SlButton type="submit" variant="primary">
          Create
        </SlButton>
      </form>
    </SlCard>
  );
};

export default CreateEconomicResource;
