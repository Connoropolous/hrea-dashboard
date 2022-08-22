import { useMutation, useQuery } from "@apollo/client";
import {
  SlButton,
  SlCard,
  SlInput,
  SlMenuItem,
  SlSelect,
} from "@shoelace-style/shoelace/dist/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MainPanelHeader from "../components/MainPanelHeader";
import {
  CREATE_ECONOMIC_EVENT,
  LIST_ECONOMIC_RESOURCES,
} from "../graphql/queries";

export type ResourceTransferProps = {
  myAgentId: string;
};

const VALUE_SEPARATOR = "__SEPARATOR__";
const VALUE_SEPARATOR_2 = "__SEPARATOR_2__";

export type ResourceListProps = {
  resources: any[];
};
const ResourceList: React.FC<ResourceListProps> = ({ resources }) => {
  return (
    <>
      {resources.map((eR: any) => {
        const unitId = eR.node.accountingQuantity.hasUnit
          ? eR.node.accountingQuantity.hasUnit.id
          : "";
        const value = `${eR.node.primaryAccountable.id}${VALUE_SEPARATOR}${eR.node.id}${VALUE_SEPARATOR_2}${unitId}`;
        return (
          <SlMenuItem
            key={value}
            value={value}
            className="resource-select-menu-item"
          >
            {eR.node.name} ({eR.node.primaryAccountable.name.slice(0, 5)}...)
            <div slot="suffix">
              {eR.node.accountingQuantity.hasNumericalValue} {eR.node.accountingQuantity.hasUnit && eR.node.accountingQuantity.hasUnit.symbol}
            </div>
          </SlMenuItem>
        );
      })}
    </>
  );
};

const ResourceTransfer: React.FC<ResourceTransferProps> = ({ myAgentId }) => {
  const navigate = useNavigate();
  const [createEE, createEEmutationStatus] = useMutation(CREATE_ECONOMIC_EVENT);
  const resources = useQuery(LIST_ECONOMIC_RESOURCES);

  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [quantity, setQuantity] = useState();

  const today = new Date();
  const month = ("0" + (today.getUTCMonth() + 1)).slice(-2);
  const day = ("0" + today.getUTCDate()).slice(-2);
  const [date, setDate] = useState(`${today.getUTCFullYear()}-${month}-${day}`);
  const hours = ("0" + today.getUTCHours()).slice(-2);
  const minutes = ("0" + today.getUTCMinutes()).slice(-2);
  const [time, setTime] = useState(`${hours}:${minutes}`);

  if (createEEmutationStatus.loading)
    return <div>Creating economic resource...</div>;
  if (createEEmutationStatus.error) return <p>ERROR</p>;

  const create = async () => {
    if (!from || !to || typeof quantity === "undefined") {
      return;
    }
    const [fromAgentId] = from.split(VALUE_SEPARATOR);
    const [toAgentId] = to.split(VALUE_SEPARATOR);
    const [fromResourceId, fromUnitId] = from
      .replace(fromAgentId + VALUE_SEPARATOR, "")
      .split(VALUE_SEPARATOR_2);
    const [toResourceId, toUnitId] = to
      .replace(toAgentId + VALUE_SEPARATOR, "")
      .split(VALUE_SEPARATOR_2);
    await createEE({
      variables: {
        event: {
          action: "transfer",
          provider: fromAgentId,
          receiver: toAgentId,
          resourceInventoriedAs: fromResourceId,
          toResourceInventoriedAs: toResourceId,
          resourceQuantity: {
            hasNumericalValue: quantity,
            // just use the fromUnitId (it will error if they're not the same)
            hasUnit: fromUnitId.length ? fromUnitId : null,
          },
          // resourceClassifiedAs: "https://something",
          // formatted as ISO
          hasPointInTime: `${date}T${time}:00.00Z`,
        },
      },
    });
    navigate("/resources");
    window.location.reload();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    create();
  };

  console.log(date);
  return (
    <>
      <MainPanelHeader>
        <h2>Transfer Resources</h2>
        <div>
          <Link to="/resources">
            <SlButton variant="primary">View Resources</SlButton>
          </Link>
        </div>
      </MainPanelHeader>

      {/* The Form */}
      <SlCard className="create-form">
        {resources.loading && <>Loading...</>}
        {!resources.loading && !resources.error && (
          <form onSubmit={handleSubmit}>
            <SlSelect
              // required
              label="From"
              onSlChange={(e) => {
                // @ts-ignore
                setFrom(e.target.value);
              }}
            >
              {resources.data.economicResources.edges && (
                <ResourceList
                  resources={resources.data.economicResources.edges}
                />
              )}
            </SlSelect>
            <br />
            <SlSelect
              // required
              label="To"
              // @ts-ignore
              onSlChange={(e) => setTo(e.target.value)}
            >
              {resources.data.economicResources.edges && (
                <ResourceList
                  resources={resources.data.economicResources.edges}
                />
              )}
            </SlSelect>
            <br />
            <SlInput
              required
              type="number"
              label="Amount"
              // @ts-ignore
              onSlChange={(e) => setQuantity(+e.target.value)}
              // @ts-ignore
              value={quantity ? quantity.toString() : ""}
            />
            <br />
            <SlInput
              required
              type="date"
              label="Date"
              onSlChange={(e) => {
                // @ts-ignore
                setDate(e.target.value);
              }}
              value={date}
            />
            <br />
            <SlInput
              required
              type="time"
              label="Time (UTC)"
              onSlChange={(e) => {
                // @ts-ignore
                setTime(e.target.value);
              }}
              value={time}
            />
            <br />
            <SlButton type="submit" variant="primary">
              Transfer
            </SlButton>
          </form>
        )}
      </SlCard>
    </>
  );
};

export default ResourceTransfer;
