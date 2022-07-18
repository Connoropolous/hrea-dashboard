import React from "react";
import {
  SlButton,
  SlButtonGroup,
  SlCard,
  SlIcon,
  SlInput,
} from "@shoelace-style/shoelace/dist/react";

export type GeneralListProps = {
  headers: React.ReactElement;
  listItems: React.ReactElement;
};

const GeneralList: React.FC<GeneralListProps> = ({ headers, listItems }) => {
  return (
    <SlCard className="resource-list">
      {/* Header */}
      <div className="resource-list-header">
        <SlInput placeholder="Search..." clearable>
          <SlIcon name="search" slot="prefix"></SlIcon>
        </SlInput>
        <SlButtonGroup>
          <SlButton>
            <SlIcon name="filter-circle" slot="prefix"></SlIcon>
            Filter
          </SlButton>
          <SlButton>
            <SlIcon name="sort-down" slot="prefix"></SlIcon>Sort
          </SlButton>
        </SlButtonGroup>
      </div>

      <div className="resource-list-table">
        <div className="resource-list-table-header">{headers}</div>
        {/* Data */}
        <div>{listItems}</div>
      </div>
    </SlCard>
  );
};

export default GeneralList;
