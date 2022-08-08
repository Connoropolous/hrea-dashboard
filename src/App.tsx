import React, { useEffect, useState } from 'react'
import '@shoelace-style/shoelace/dist/themes/light.css'
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client'

import graphqlClientHolochain from '@vf-ui/graphql-client-holochain'

import './App.css'
import Header from './Header'
import LeftScreenNavMenu from './LeftScreenNavMenu'
import MyAgent from './MyAgent'
import Resources from './routes/Resources'
import NewResource from './routes/NewResource'
import ResourceTransfer from './routes/ResourceTransfer'
import Agents from './routes/Agents'
import RegisterOtherAgent from './routes/RegisterOtherAgent'

setBasePath(
  'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.70/dist/'
)

interface Props {}

const App: React.FC<Props> = () => {
  const [myAgent, setMyAgent] = useState<{ id: string, name: string }>()
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>()

  const connect = async () => {
    try {
      const client = await graphqlClientHolochain()
      setClient(client)
    } catch (e) {
      console.error('error during graphqlClientHolochain', e)
    }
  }

  useEffect(() => {
    connect()
  }, [])

  if (!client) {
    return <div>Making websocket connection...</div>
  }

  const myAgentId = myAgent ? myAgent.id : ''
  const myAgentName = myAgent ? myAgent.name : ''

  return (
    <BrowserRouter>
      <div className='container'>
        <Header name={myAgentName} />
        <div className='below-header'>
          <LeftScreenNavMenu />

          <div className='main-panel'>
            <ApolloProvider client={client}>
              {!myAgent && <MyAgent setMyAgent={setMyAgent} />}
              <Routes>
                <Route
                  path='/resources'
                  element={<Resources myAgentId={myAgentId} />}
                />
                <Route
                  path='/resources/transfer'
                  element={<ResourceTransfer myAgentId={myAgentId} />}
                />
                <Route
                  path='/resources/new'
                  element={<NewResource myAgentId={myAgentId} />}
                />
                <Route
                  path='/agents'
                  element={<Agents myAgentId={myAgentId} />}
                />
                <Route
                  path='/agents/register_other'
                  element={<RegisterOtherAgent />}
                />
              </Routes>
            </ApolloProvider>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
