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
        <Link to="/resources" className="no-link-underline">
          <SlMenuItem value="Inventory">
            <SlIcon slot="prefix" name="minecart-loaded" />
            Resources
          </SlMenuItem>
        </Link>
        <Link to="/events" className="no-link-underline">
          <SlMenuItem value="Events">
            Events
            <SlIcon slot="prefix" name="calendar-event" />
          </SlMenuItem>
        </Link>
        <Link to="/agents" className="no-link-underline">
          <SlMenuItem value="Agents">
            Agents
            <SlIcon slot="prefix" name="people" />
          </SlMenuItem>
        </Link>
        <Link to="/units" className="no-link-underline">
          <SlMenuItem value="Units">
            Units
            <SlIcon slot="prefix" name="thermometer-half" />
          </SlMenuItem>
        </Link>
      </SlMenu>
    </div>
  );
};

export default LeftScreenNavMenu;
