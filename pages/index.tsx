import Segundo from "@/components/primero";
import React from "react";

type Props = {};

const Home = (props) => {
  return (
    <React.Fragment>
      <div className="border-sky-400 border-[4px] h-80 w-64 overflow-y-scroll p-2 m-2">
        <Segundo />
      </div>
    </React.Fragment>
  );
};

export default Home;
