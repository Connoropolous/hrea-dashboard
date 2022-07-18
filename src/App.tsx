import React, { useEffect, useState } from "react";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
import { SchemaLink } from "@apollo/client/link/schema";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import bindSchema, { autoConnect } from "@connoropolous/vf-graphql-holochain";

import "./App.css";
import Header from "./Header";
import LeftScreenNavMenu from "./LeftScreenNavMenu";
import MyAgentId from "./MyAgentId";
import Resources from "./routes/Resources";
import NewResource from "./routes/NewResource";
import ResourceTransfer from "./routes/ResourceTransfer";
import Agents from "./routes/Agents";
import RegisterOtherAgent from "./routes/RegisterOtherAgent";

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.70/dist/"
);

interface Props {}

const App: React.FC<Props> = () => {
  const [myAgentId, setMyAgentId] = useState<string>("");
  const [schema, setSchema] = useState();
  const [link, setLink] = useState();
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();

  const connect = async () => {
    let { dnaConfig, conductorUri } = await autoConnect();
    const schema = await bindSchema({ dnaConfig, conductorUri });
    const link = new SchemaLink({ schema });
    const cache = new InMemoryCache();

    const client = new ApolloClient({
      cache: cache,
      link: link,
    });

    // @ts-ignore
    setSchema(schema);
    // @ts-ignore
    setLink(link);
    // @ts-ignore
    setClient(client);
  };

  useEffect(() => {
    connect();
  }, []);

  if (!client) {
    return <div>Making websocket connection...</div>;
  }

  return (
    <BrowserRouter>
      <div className="container">
        <Header name={myAgentId} />
        <div className="below-header">
          <LeftScreenNavMenu />

          <div className="main-panel">
            <ApolloProvider client={client}>
              {!myAgentId && <MyAgentId setMyAgentId={setMyAgentId} />}
              <Routes>
                <Route
                  path="/resources"
                  element={<Resources myAgentId={myAgentId} />}
                />
                <Route
                  path="/resources/transfer"
                  element={<ResourceTransfer myAgentId={myAgentId} />}
                />
                <Route
                  path="/resources/new"
                  element={<NewResource myAgentId={myAgentId} />}
                />
                <Route
                  path="/agents"
                  element={<Agents myAgentId={myAgentId} />}
                />
                <Route
                  path="/agents/register_other"
                  element={<RegisterOtherAgent />}
                />
              </Routes>
            </ApolloProvider>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
