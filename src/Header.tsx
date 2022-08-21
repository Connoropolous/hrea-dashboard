import React from "react";
import { SlInput, SlAvatar, SlIcon } from "@shoelace-style/shoelace/dist/react";

export type HeaderProps = {
  name: string;
};

const Header: React.FC<HeaderProps> = ({ name }) => {
  return (
    <div className="header">
      <img alt="" src="https://avatars.githubusercontent.com/u/46187479?s=48&v=4" />
      <div className="search">
        <SlInput placeholder="Search..." clearable disabled>
          <SlIcon name="search" slot="prefix"></SlIcon>{" "}
        </SlInput>
      </div>

      <div>
        <SlAvatar shape="circle" label="Circle avatar" />{" "}
        {name ? (name.length > 9 ? name.slice(0, 8) + "..." : name) : ""}
      </div>
    </div>
  );
};

export default Header;
