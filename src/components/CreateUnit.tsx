import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_UNIT,
} from "../graphql/queries";
import {
  SlButton,
  SlCard,
  SlInput,
} from "@shoelace-style/shoelace/dist/react";
import { useNavigate } from "react-router-dom";

export type CreateUnitProps = {
  myAgentId: string;
};

const CreateUnit: React.FC<CreateUnitProps> = ({ myAgentId }) => {
  const navigate = useNavigate();

  const [createUnit, createUnitMutationStatus] = useMutation(CREATE_UNIT);

  const [label, setLabel] = useState("");
  const [symbol, setSymbol] = useState("");

  if (createUnitMutationStatus.loading) return <div>Creating unit...</div>;
  if (createUnitMutationStatus.error) return <p>ERROR during creation</p>;

  const create = async () => {
    await createUnit({
      variables: {
        unit: {
          label,
          symbol,
        },
      },
    });
    navigate("/units");
    window.location.reload();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (label && symbol) {
      create();
    }
  };

  return (
    <SlCard className="create-form">
      <form onSubmit={handleSubmit}>
        {/* make sure its a number, using + */}
        <br />
        <SlInput
          required
          label="Label"
          // @ts-ignore
          onSlChange={(e) => setLabel(e.target.value)}
          value={label}
        />
        <br />
        <SlInput
          required
          label="Symbol"
          // @ts-ignore
          onSlChange={(e) => setSymbol(e.target.value)}
          value={symbol}
        />
        <br />
        <SlButton type="submit" variant="primary">
          Create
        </SlButton>
      </form>
    </SlCard>
  );
};

export default CreateUnit;
