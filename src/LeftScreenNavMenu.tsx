import {
  SlIcon,
  SlMenu,
  SlMenuItem,
} from "@shoelace-style/shoelace/dist/react";
import React from "react";
import { Link } from "react-router-dom";

export type LeftScreenNavMenuProps = {};

const LeftScreenNavMenu: React.FC<LeftScreenNavMenuProps> = ({}) => {
  return (
    <div className="left-screen-nav-menu">
      <SlMenu>
        <Link to="/resources">
          <SlMenuItem value="Inventory">
            <SlIcon slot="prefix" name="minecart-loaded" />
            Resources
          </SlMenuItem>
        </Link>
        <Link to="/agents">
          <SlMenuItem value="Agents">
            Agents
            <SlIcon slot="prefix" name="people" />
          </SlMenuItem>
        </Link>
      </SlMenu>
    </div>
  );
};

export default LeftScreenNavMenu;
