import React from "react";
import { SlInput, SlAvatar, SlIcon } from "@shoelace-style/shoelace/dist/react";

export type HeaderProps = {
  name: string;
};

const Header: React.FC<HeaderProps> = ({ name }) => {
  return (
    <div className="header">
      <SlAvatar
        image="https://avatars.githubusercontent.com/u/46187479?s=200&v=4"
        label="Avatar of a gray tabby kitten looking down"
      />
      <div className="search">
        <SlInput placeholder="Search..." clearable>
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
